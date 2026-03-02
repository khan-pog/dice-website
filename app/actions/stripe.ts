"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

interface CartLineItem {
  productId: string
  quantity: number
}

export async function startCheckoutSession(lineItems: CartLineItem[]) {
  if (!lineItems.length) {
    throw new Error("Cart is empty")
  }

  const stripeLineItems = lineItems.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId)
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
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: stripeLineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "JP"],
    },
  })

  return session.client_secret
}
