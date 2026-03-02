"use client"

import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { items } = useCart()

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Checkout</h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-xl font-bold text-foreground mb-2">Nothing to checkout</h2>
              <p className="text-muted-foreground mb-8">
                Add some dice to your cart first.
              </p>
              <Link href="/#collection">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Collection
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-6">
              <CheckoutForm />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
