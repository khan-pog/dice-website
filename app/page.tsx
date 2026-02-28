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
