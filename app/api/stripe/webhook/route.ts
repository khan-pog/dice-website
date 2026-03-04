import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { convexClient, convexFns } from "@/lib/convex"
import { normalizeCheckoutToOrderPayload } from "@/lib/stripe-order"
import { sendOrderConfirmationEmail } from "@/lib/email"

// #region agent log
fetch('http://127.0.0.1:7720/ingest/f96776db-0993-49ff-a7d7-744901e4e243',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e3d8b1'},body:JSON.stringify({sessionId:'e3d8b1',runId:'pre-fix',hypothesisId:'H2',location:'app/api/stripe/webhook/route.ts:8',message:'webhook route module loaded',data:{loaded:true},timestamp:Date.now()})}).catch(()=>{});
// #endregion

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET")
  }
  return secret
}

export async function POST(request: Request) {
  // #region agent log
  fetch('http://127.0.0.1:7720/ingest/f96776db-0993-49ff-a7d7-744901e4e243',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e3d8b1'},body:JSON.stringify({sessionId:'e3d8b1',runId:'pre-fix',hypothesisId:'H2',location:'app/api/stripe/webhook/route.ts:21',message:'webhook POST entered',data:{hasSignature:Boolean(request.headers.get("stripe-signature"))},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
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
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(rawBody, signature, getWebhookSecret())
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook signature"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const stripe = getStripe()

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
