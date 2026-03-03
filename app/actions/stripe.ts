"use server"

import { stripe } from "@/lib/stripe"
import { resolveProductForCheckout } from "@/lib/products"

interface CartLineItem {
  productId: string
  quantity: number
}

export async function startCheckoutSession(lineItems: CartLineItem[], origin: string) {
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

  const session = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    allow_promotion_codes: true,
    metadata: {
      cart: JSON.stringify(lineItems),
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
