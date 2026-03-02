import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ | Arcane Dice Co.",
  description: "Frequently asked questions about shipping, returns, and our handcrafted dice.",
}

const shippingFaqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping within the US takes 7-14 business days. International orders typically arrive within 14-21 business days. We process and ship orders within 1-3 business days of receiving payment.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! We offer free standard shipping on all US orders over $75. International shipping rates vary by location and are calculated at checkout.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship to the United States, Canada, United Kingdom, Australia, Germany, France, and Japan. We are working on expanding to more countries.",
  },
  {
    q: "Can I track my order?",
    a: "Absolutely. Once your order ships, you will receive a confirmation email with a tracking number and link to monitor your package every step of the way.",
  },
]

const returnsFaqs = [
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery for unused, unopened items in their original packaging. Simply contact us at support@arcanedice.co to initiate a return.",
  },
  {
    q: "What if my dice arrive damaged?",
    a: "We take great care packaging every order, but accidents happen. If your dice arrive damaged, contact us within 7 days with photos of the damage and we will send a replacement at no cost.",
  },
  {
    q: "Can I exchange a dice set for a different one?",
    a: "Yes! We offer exchanges for unused items within 30 days. Return the original set and we will ship you the new one. If there is a price difference, we will charge or refund accordingly.",
  },
]

const productFaqs = [
  {
    q: "Are your dice balanced?",
    a: "Yes. Every die we sell undergoes individual balance testing using salt water float tests. We guarantee that each die rolls fairly and randomly.",
  },
  {
    q: "What materials do you use?",
    a: "We work with a variety of premium materials including high-density resins, crystal-clear epoxy, metals, and semi-precious stones. Each product page lists the specific materials used.",
  },
  {
    q: "What comes in a standard set?",
    a: "Our standard 7-piece polyhedral set includes: D4, D6, D8, D10, D10 (percentile), D12, and D20. Everything you need for D&D, Pathfinder, and most tabletop RPGs.",
  },
  {
    q: "Do you offer custom dice orders?",
    a: "We are exploring custom order options. For now, please reach out via our Contact page with your request and we will see what we can do.",
  },
]

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
              Help Center
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Find answers to common questions about our products, shipping, and return policies.
            </p>
          </div>

          {/* Shipping */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Shipping</h2>
            <Accordion type="single" collapsible className="w-full">
              {shippingFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`shipping-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Returns */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Returns & Exchanges</h2>
            <Accordion type="single" collapsible className="w-full">
              {returnsFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`returns-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Products */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-4">Products</h2>
            <Accordion type="single" collapsible className="w-full">
              {productFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`product-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Still have questions */}
          <div className="text-center p-8 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-bold text-foreground mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              We are happy to help. Reach out to our team and we will get back to you within 24 hours.
            </p>
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
