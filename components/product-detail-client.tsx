"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Minus, Plus, ArrowLeft, Check, Package, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/product-gallery"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import type { Product } from "@/lib/products"

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* Product info */}
            <div className="flex flex-col">
              {product.tag && (
                <span className="inline-flex self-start bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-4">
                  {product.tag}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-primary mt-4">
                {formatPrice(product.priceInCents)}
              </p>

              <p className="text-muted-foreground leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Features */}
              <ul className="mt-6 flex flex-col gap-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Includes */}
              <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
                <p className="text-sm font-medium text-foreground mb-1">Set Includes:</p>
                <p className="text-sm text-muted-foreground">{product.includes}</p>
              </div>

              {/* Material */}
              <p className="text-sm text-muted-foreground mt-4">
                <span className="font-medium text-foreground">Material:</span> {product.material}
              </p>

              {/* Quantity + Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 text-foreground font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart - {formatPrice(product.priceInCents * quantity)}
                    </>
                  )}
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: "Free shipping over $75" },
                  { icon: Shield, label: "30-day return policy" },
                  { icon: Package, label: "Secure packaging" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
