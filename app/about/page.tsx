import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Eye, Gem, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the story behind Arcane Dice Co. and our commitment to crafting premium handmade dice for tabletop gaming.",
  openGraph: {
    title: "About Us | Arcane Dice Co.",
    description: "Learn about the story behind Arcane Dice Co. and our commitment to crafting premium handmade dice for tabletop gaming.",
    images: [{ url: "/images/products/shadowthorn-3.jpg", alt: "Arcane Dice Co. handcrafted dice" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Arcane Dice Co.",
    description: "Learn about the story behind Arcane Dice Co. and our commitment to crafting premium handmade dice for tabletop gaming.",
    images: ["/images/products/shadowthorn-3.jpg"],
  },
}

const values = [
  {
    icon: Gem,
    title: "Premium Materials",
    description: "We source only the finest resins, metals, and gemstones. Every material is tested for durability and beauty before it enters our workshop.",
  },
  {
    icon: Shield,
    title: "Precision Balance",
    description: "Each die is individually tested for balance using salt water float tests. We guarantee fair, random rolls on every single piece.",
  },
  {
    icon: Eye,
    title: "Artisan Detail",
    description: "From hand-sculpted patterns to encased miniatures, our designs push the boundaries of what a die can be. No two sets are exactly alike.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We are tabletop players ourselves. Everything we create is designed by gamers, for gamers, with love for the craft and the community.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/products/shadowthorn-3.jpg"
              alt="Arcane Dice Co. premium handcrafted dice"
              className="h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-[1.1]">
              Crafted by Adventurers,
              <br />
              <span className="text-primary">For Adventurers</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Arcane Dice Co. was born at a kitchen table during a late-night D&D session. We wanted dice that felt as legendary as the quests we embarked on -- so we decided to make them ourselves.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/images/products/eye-of-sauron-1.jpg"
                  alt="Our handcrafted dice"
                  className="rounded-xl border border-border"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                  From Hobby to Workshop
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  What started as a passion project in 2020 has grown into a dedicated workshop of artisans and enthusiasts. We hand-pour, hand-polish, and hand-inspect every single die that leaves our studio.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our collections are inspired by the worlds we love -- dark fantasy, cosmic horror, ancient mythology, and the boundless imagination of tabletop gaming.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every set we ship carries with it hours of care and a deep respect for the game. When you roll an Arcane die, you are rolling something truly special.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-16 bg-card/50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-3">
                What We Stand For
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title} className="p-6 bg-card rounded-xl border border-border">
                  <value.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
              Ready to See the Collection?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Browse our handcrafted dice sets and find the perfect companion for your next adventure.
            </p>
            <Link href="/#collection">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10">
                Shop Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
