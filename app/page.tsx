"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { RollingBanner } from "@/components/rolling-banner"
import { ProductSection } from "@/components/product-section"
import { CraftSection } from "@/components/craft-section"
import { ReviewsSection } from "@/components/reviews-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ScrollDice } from "@/components/scroll-dice"

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollDice />
      <HeroSection />
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-xl border bg-card p-6 text-center">
          <svg
            viewBox="0 0 220 220"
            className="mx-auto h-44 w-44"
            role="img"
            aria-label="Penis illustration"
          >
            <title>Penis illustration</title>
            <circle cx="70" cy="170" r="38" fill="#d08a7f" />
            <circle cx="150" cy="170" r="38" fill="#d08a7f" />
            <rect x="84" y="55" width="52" height="120" rx="26" fill="#d08a7f" />
            <ellipse cx="110" cy="45" rx="24" ry="12" fill="#d08a7f" />
          </svg>
        </div>
      </section>
      <RollingBanner />
      <ProductSection />
      <CraftSection />
      <RollingBanner />
      <ReviewsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
