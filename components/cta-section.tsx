"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiceFace } from "./dice-face"

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [diceValues, setDiceValues] = useState([1, 3, 5, 2, 6])
  const [rolling, setRolling] = useState(false)

  const rollAll = useCallback(() => {
    setRolling(true)
    setDiceValues(prev => prev.map(() => Math.floor(Math.random() * 6) + 1))
    setTimeout(() => setRolling(false), 600)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          rollAll()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rollAll])

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-5 pointer-events-none">
        {diceValues.map((val, i) => (
          <div
            key={i}
            className={rolling ? "animate-dice-roll" : ""}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <DiceFace value={val} size={120} />
          </div>
        ))}
      </div>

      <div
        className={`relative mx-auto max-w-2xl text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-3">
          Ready to Roll?
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-6">
          Your Next Critical Hit Starts Here
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
          Join thousands of players who trust Arcane Dice Co. for their most important rolls. Free shipping on orders over $75.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#collection">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
              onClick={rollAll}
            >
              Shop the Collection
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary px-10"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
