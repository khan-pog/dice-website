import { NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { convexClient, convexFns } from "@/lib/convex"
import { normalizeCheckoutToOrderPayload } from "@/lib/stripe-order"
import { sendOrderConfirmationEmail } from "@/lib/email"

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET")
  }
  return secret
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  const rawBody = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, getWebhookSecret())
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook signature"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const convex = convexClient()

  const reservation = await convex.mutation(convexFns.reserveEventProcessing, {
    eventId: event.id,
    eventType: event.type,
  })

  if (reservation.alreadyProcessed) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  const [lineItems, expandedSession] = await Promise.all([
    stripe.checkout.sessions.listLineItems(session.id, { limit: 100 }),
    stripe.checkout.sessions.retrieve(session.id, {
      expand: ["discounts.promotion_code"],
    }),
  ])
  const payload = normalizeCheckoutToOrderPayload({
    session: expandedSession,
    lineItems,
    stripeEventId: event.id,
  })

  const createdOrder = await convex.mutation(
    convexFns.createOrderFromCheckoutEvent,
    payload
  )

  await convex.mutation(convexFns.completeEventProcessing, {
    eventId: event.id,
    orderId: createdOrder.orderId,
  })

  try {
    await sendOrderConfirmationEmail({
      to: payload.customerEmail,
      orderNumber: createdOrder.orderNumber,
      lineItems: payload.lineItems,
      totalAmount: payload.totalAmount,
      currency: payload.currency,
    })
  } catch (error) {
    console.error("Order email send failed", error)
  }

  return NextResponse.json({ received: true, orderNumber: createdOrder.orderNumber })
}
