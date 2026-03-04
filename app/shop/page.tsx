"use client"

import { Navbar } from "@/components/navbar"
import { ProductSection } from "@/components/product-section"
import { Footer } from "@/components/footer"

export default function ShopPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <ProductSection />
      </div>
      <Footer />
    </main>
  )
}
