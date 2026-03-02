"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DiceFace } from "./dice-face"
import { PRODUCTS, formatPrice } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"

function ProductCard({
  product,
  index,
}: {
  product: Product
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [diceValue, setDiceValue] = useState(index + 1)
  const [rolling, setRolling] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setRolling(true)
          setDiceValue(Math.floor(Math.random() * 6) + 1)
          setTimeout(() => setRolling(false), 600)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleRoll = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setRolling(true)
    setDiceValue(Math.floor(Math.random() * 6) + 1)
    setTimeout(() => setRolling(false), 600)
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors" />

          {product.tag && (
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              {product.tag}
            </span>
          )}

          <button
            onClick={handleRoll}
            className="absolute top-4 right-4 cursor-pointer"
            aria-label="Roll dice"
          >
            <div className={rolling ? "animate-dice-bounce" : "hover:scale-110 transition-transform"}>
              <DiceFace value={diceValue} size={48} />
            </div>
          </button>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/product/${product.id}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
            <span className="text-lg font-bold text-primary">{formatPrice(product.priceInCents)}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </Link>
        <Button
          className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors gap-2"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export function ProductSection() {
  return (
    <section id="collection" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-3">
            The Collection
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
            Forged for Every Quest
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each set is precision-crafted, hand-polished, and balanced to ensure every roll is fair and every game is unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
