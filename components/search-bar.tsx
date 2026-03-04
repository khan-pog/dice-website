"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { PRODUCTS, formatPrice } from "@/lib/products"

interface SearchResult {
  id: string
  name: string
  image: string
  priceInCents: number
  href: string
}

function getResults(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const results: SearchResult[] = []

  for (const product of PRODUCTS) {
    const matchesProduct =
      product.name.toLowerCase().includes(q) ||
      product.shortDescription.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)

    if (matchesProduct) {
      results.push({
        id: product.id,
        name: product.name,
        image: product.images[0],
        priceInCents: product.priceInCents,
        href: `/product/${product.id}`,
      })
    }

    if (product.variants) {
      for (const variant of product.variants) {
        if (variant.name.toLowerCase().includes(q)) {
          results.push({
            id: variant.id,
            name: `${product.name} — ${variant.name}`,
            image: variant.images[0],
            priceInCents: variant.priceInCents ?? product.priceInCents,
            href: `/product/${variant.id}`,
          })
        }
      }
    }
  }

  return results.slice(0, 6)
}

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const results = useMemo(() => (open ? getResults(query) : []), [open, query])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  function close() {
    setOpen(false)
    setQuery("")
  }

  function handleSelect(href: string) {
    router.push(href)
    close()
  }

  return (
    <div ref={containerRef} className="relative">
      <div className={`flex items-center transition-all duration-300 ${open ? "w-56" : "w-8"}`}>
        {open ? (
          <div className="flex items-center w-full border border-border rounded-lg bg-background px-3 py-1.5 gap-2">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
            />
            <button onClick={close} aria-label="Close search">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open search"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result.href)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors text-left"
            >
              <img
                src={result.image}
                alt={result.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{result.name}</p>
                <p className="text-xs text-primary font-semibold mt-0.5">
                  {formatPrice(result.priceInCents)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl px-4 py-6 text-center z-50">
          <p className="text-sm text-muted-foreground">No products found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  )
}
