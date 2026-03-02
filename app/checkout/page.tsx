"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle2, XCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/lib/cart-context"

function SuccessView() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="text-center py-24">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">Order Confirmed!</h2>
      <p className="text-muted-foreground mb-2 max-w-md mx-auto leading-relaxed">
        Thank you for your purchase. Your payment was successful and your order is being processed.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        You will receive a confirmation email with tracking details shortly.
      </p>
      <Link href="/">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}

function CancelledView() {
  return (
    <div className="text-center py-24">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <XCircle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">Checkout Cancelled</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        Your payment was not completed. No charges were made. Your cart items are still saved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/cart">
          <Button variant="outline">Return to Cart</Button>
        </Link>
        <Link href="/#collection">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}

function EmptyCartView() {
  return (
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
  )
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const { items } = useCart()

  let content
  if (status === "success") {
    content = <SuccessView />
  } else if (status === "cancelled") {
    content = <CancelledView />
  } else if (items.length === 0) {
    content = <EmptyCartView />
  } else {
    content = (
      <div className="bg-card rounded-xl border border-border p-6">
        <CheckoutForm />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-3xl">
          {status !== "success" && status !== "cancelled" && (
            <>
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Checkout</h1>
            </>
          )}
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
