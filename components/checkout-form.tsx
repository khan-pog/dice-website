"use client"

import { useCallback } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { useCart } from "@/lib/cart-context"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export function CheckoutForm() {
  const { items, clearCart } = useCart()

  const fetchClientSecret = useCallback(() => {
    const lineItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }))
    return startCheckoutSession(lineItems)
  }, [items])

  if (items.length === 0) return null

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret: fetchClientSecret,
          onComplete: () => {
            clearCart()
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
