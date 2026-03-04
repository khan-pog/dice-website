"use server"

import { getStripe } from "@/lib/stripe"
import { resolveProductForCheckout } from "@/lib/products"

interface CartLineItem {
  productId: string
  quantity: number
}

export async function startCheckoutSession(
  lineItems: CartLineItem[],
  origin: string,
  discountCents?: number,
) {
  // #region agent log
  fetch('http://127.0.0.1:7720/ingest/f96776db-0993-49ff-a7d7-744901e4e243',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e3d8b1'},body:JSON.stringify({sessionId:'e3d8b1',runId:'pre-fix',hypothesisId:'H6',location:'app/actions/stripe.ts:15',message:'startCheckoutSession entered',data:{lineItemsCount:lineItems.length,hasDiscount:Boolean(discountCents)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  if (!lineItems.length) {
    throw new Error("Cart is empty")
  }

  if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
    throw new Error("Invalid checkout origin")
  }

  const stripeLineItems = lineItems.map((item) => {
    const product = resolveProductForCheckout(item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.shortDescription,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    }
  })

  const stripe = getStripe()

  // Build session params
  type SessionParams = Parameters<typeof stripe.checkout.sessions.create>[0]
  const sessionParams: SessionParams = {
    line_items: stripeLineItems,
    mode: "payment",
    allow_promotion_codes: discountCents ? false : true,
    metadata: {
      cart: JSON.stringify(lineItems),
      source: "arcane-dice-web",
    },
    success_url: `${origin}/checkout?status=success`,
    cancel_url: `${origin}/checkout?status=cancelled`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "JP"],
    },
  }

  // Apply D20 fortune-roll discount via a one-time Stripe coupon
  if (discountCents && discountCents > 0) {
    const coupon = await stripe.coupons.create({
      amount_off: discountCents,
      currency: "usd",
      duration: "once",
      name: `D20 Fortune Roll (rolled ${discountCents / 50})`,
    })
    sessionParams.discounts = [{ coupon: coupon.id }]
  }

  const session = await stripe.checkout.sessions.create(sessionParams)

  if (!session.id) {
    throw new Error("Unable to create checkout session")
  }

  return session.id
}
