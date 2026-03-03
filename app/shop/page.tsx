"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-section"
import { PRODUCTS } from "@/lib/products"

type Filter = "all" | "resin" | "metal"
type Sort = "default" | "price-asc" | "price-desc" | "name"

function isMetalProduct(material: string) {
  const m = material.toLowerCase()
  return m.includes("metal") || m.includes("gunmetal") || m.includes("copper") || m.includes("silver-tone") || m.includes("chrome") || m.includes("brass")
}

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Resin", value: "resin" },
  { label: "Metal", value: "metal" },
]

const sorts: { label: string; value: Sort }[] = [
  { label: "Featured", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name" },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all")
  const [activeSort, setActiveSort] = useState<Sort>("default")

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    if (activeFilter === "resin") {
      list = list.filter((p) => !isMetalProduct(p.material))
    } else if (activeFilter === "metal") {
      list = list.filter((p) => isMetalProduct(p.material))
    }

    if (activeSort === "price-asc") {
      list.sort((a, b) => a.priceInCents - b.priceInCents)
    } else if (activeSort === "price-desc") {
      list.sort((a, b) => b.priceInCents - a.priceInCents)
    } else if (activeSort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }

    return list
  }, [activeFilter, activeSort])

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center pt-12 mb-12">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-3">
              The Collection
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
              Forged for Every Quest
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Each set is precision-crafted, hand-polished, and balanced to ensure every roll is fair and every game is unforgettable.
            </p>
          </div>

          {/* Filter + Sort bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1 border border-border">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort select */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as Sort)}
                className="text-sm bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg font-medium text-foreground mb-2">No products found</p>
              <p className="text-muted-foreground">Try a different filter.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
