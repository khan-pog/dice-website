import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Arcane Dice Co.",
  description: "Get in touch with the Arcane Dice Co. team. We respond within 24 hours.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
