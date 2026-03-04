"use client"

import { useEffect } from "react"
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
  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7648/ingest/d1a6dcb4-be14-4c1b-8ea0-c69b7b07ec7c", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "615bf6" },
      body: JSON.stringify({
        sessionId: "615bf6",
        runId: "store-debug-pre-fix",
        hypothesisId: "H2",
        location: "app/page.tsx:Home",
        message: "Home page mounted",
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
  }, [])

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
