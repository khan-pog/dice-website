"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { SearchBar } from "@/components/search-bar"

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Arcane Dice Co." className="h-8 w-8 rounded" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Arcane Dice Co.
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <SearchBar />

          <Link href="/cart" className="relative" aria-label="Shopping cart">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/#collection">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Shop Now
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" className="relative" aria-label="Shopping cart">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col gap-1 px-6 py-4">
            <div className="pb-2" onClick={() => setIsOpen(false)}>
              <SearchBar />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#collection" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
