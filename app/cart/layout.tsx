import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Cart | Arcane Dice Co.",
  description: "Review your dice selections before checkout.",
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
