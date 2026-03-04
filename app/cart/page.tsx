"use client"

import Link from "next/link"
import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { D20RollWidget } from "@/components/d20-roll-widget"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null)

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [checkoutError, setCheckoutError] = useState("")
  const [discountCents, setDiscountCents] = useState(0)

  const shippingFree = totalPrice >= 7500
  const shippingCost = shippingFree ? 0 : 595
  const grandTotal = Math.max(0, totalPrice + shippingCost - discountCents)

  async function handleProceedToCheckout() {
    setCheckoutError("")
    setIsRedirecting(true)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load. Please refresh and try again.")
      }

      const lineItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }))

      const sessionId = await startCheckoutSession(
        lineItems,
        window.location.origin,
        discountCents > 0 ? discountCents : undefined,
      )
      const result = await stripe.redirectToCheckout({ sessionId })

      if (result.error?.message) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to start checkout."
      setCheckoutError(message)
      setIsRedirecting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Your Cart {totalItems > 0 && <span className="text-muted-foreground text-xl">({totalItems} {totalItems === 1 ? "item" : "items"})</span>}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven{"'"}t added any dice to your collection yet.
              </p>
              <Link href="/#collection">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Collection
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart items */}
              <div className="flex-1 flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-bold text-foreground truncate">{item.product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{item.product.includes}</p>
                      <p className="text-primary font-bold mt-2">
                        {formatPrice(item.product.priceInCents)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
                  <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={`font-medium ${shippingFree ? "text-primary" : "text-foreground"}`}>
                        {shippingFree ? "FREE" : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {!shippingFree && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $75.00
                      </p>
                    )}
                    {discountCents > 0 && (
                      <div className="flex justify-between text-yellow-400">
                        <span className="font-medium flex items-center gap-1">
                          <span>🎲</span> Fortune Roll
                        </span>
                        <span className="font-bold">−{formatPrice(discountCents)}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="font-bold text-foreground text-lg">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* D20 Fortune Roll widget */}
                  <D20RollWidget onDiscount={(cents) => setDiscountCents(cents)} />

                  <Button
                    onClick={handleProceedToCheckout}
                    disabled={isRedirecting}
                    className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    {isRedirecting ? "Redirecting..." : "Proceed to Checkout"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Taxes calculated at checkout
                  </p>
                  {checkoutError ? (
                    <p className="text-xs text-destructive text-center mt-2">{checkoutError}</p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
