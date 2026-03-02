import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout | Arcane Dice Co.",
  description: "Complete your purchase securely with Stripe.",
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
