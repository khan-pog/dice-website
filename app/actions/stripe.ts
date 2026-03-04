"use server"

import { getStripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

interface CartLineItem {
  productId: string
  quantity: number
}

export async function startCheckoutSession(
  lineItems: CartLineItem[],
  origin: string,
  discountPercent = 0
) {
  if (!lineItems.length) {
    throw new Error("Cart is empty")
  }

  if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
    throw new Error("Invalid checkout origin")
  }

  const safeDiscountPercent = Number.isFinite(discountPercent)
    ? Math.min(20, Math.max(0, Math.floor(discountPercent)))
    : 0

  const stripeLineItems = lineItems.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
    }

    const discountedUnitAmount = Math.max(
      1,
      Math.round(product.priceInCents * (100 - safeDiscountPercent) / 100)
    )

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.shortDescription,
        },
        unit_amount: discountedUnitAmount,
      },
      quantity: item.quantity,
    }
  })

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    allow_promotion_codes: true,
    metadata: {
      cart: JSON.stringify(lineItems),
      d20DiscountPercent: String(safeDiscountPercent),
      source: "arcane-dice-web",
    },
    success_url: `${origin}/checkout?status=success`,
    cancel_url: `${origin}/checkout?status=cancelled`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "JP"],
    },
  })

  if (!session.id) {
    throw new Error("Unable to create checkout session")
  }

  return session.id
}
