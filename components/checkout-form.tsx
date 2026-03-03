"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null)

export function CheckoutForm() {
  const { items } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleCheckout() {
    setErrorMessage("")
    setIsRedirecting(true)

    const stripe = await stripePromise
    if (!stripe) {
      setErrorMessage("Stripe failed to load. Please refresh and try again.")
      setIsRedirecting(false)
      return
    }

    const lineItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }))
    const sessionId = await startCheckoutSession(lineItems, window.location.origin)

    const result = await stripe.redirectToCheckout({ sessionId })
    if (result.error?.message) {
      setErrorMessage(result.error.message)
      setIsRedirecting(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div id="checkout" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        You will be redirected to Stripe's secure checkout page to complete payment.
      </p>
      <Button
        onClick={handleCheckout}
        disabled={isRedirecting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isRedirecting ? "Redirecting to Stripe..." : "Pay with Stripe"}
      </Button>
      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}
    </div>
  )
}
