import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Arcane Dice Co. team. We love hearing from fellow tabletop adventurers.",
  openGraph: {
    title: "Contact Us | Arcane Dice Co.",
    description: "Get in touch with the Arcane Dice Co. team. We love hearing from fellow tabletop adventurers.",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Arcane Dice Co.",
    description: "Get in touch with the Arcane Dice Co. team. We love hearing from fellow tabletop adventurers.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
