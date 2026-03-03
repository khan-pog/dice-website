"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { DiceFace } from "./dice-face"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [heroValues, setHeroValues] = useState([6, 3, 5])
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ])
      setHasAnimated(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/products/shadowthorn-3.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
            Handcrafted Precision
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
            Every Roll
            <br />
            <span className="text-primary">Matters</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Premium polyhedral dice, precision-balanced and hand-finished. Each set is a work of art designed for the discerning player.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/#collection">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Explore Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary px-8">
                Our Story
              </Button>
            </Link>
          </div>

          <p className="mt-10 text-xs text-muted-foreground tracking-widest uppercase flex items-center gap-2 justify-center lg:justify-start">
            <ArrowDown className="h-3 w-3 animate-bounce" />
            Scroll to discover — watch the dice roll
          </p>
        </div>

        {/* Product showcase images */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
            {/* Main image */}
            <div className="absolute inset-4 rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
              <img
                src="/images/products/shadowthorn-1.jpg"
                alt="Shadowthorn Gothic Dice"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Secondary image */}
            <div className="absolute -bottom-4 -right-4 w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border-2 border-border shadow-xl">
              <img
                src="/images/products/eye-of-sauron-2.jpg"
                alt="Eye of Sauron Dice"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating dice */}
            {heroValues.map((val, i) => {
              const positions = [
                { top: "-8%", left: "-8%", delay: "0s" },
                { top: "20%", left: "-14%", delay: "1s" },
                { top: "-5%", left: "75%", delay: "2s" },
              ]
              return (
                <div
                  key={i}
                  className={`absolute animate-float ${hasAnimated ? "animate-dice-roll" : "opacity-0"}`}
                  style={{
                    top: positions[i].top,
                    left: positions[i].left,
                    animationDelay: positions[i].delay,
                  }}
                >
                  <DiceFace
                    value={val}
                    size={i === 0 ? 56 : i === 1 ? 44 : 50}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
