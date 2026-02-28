"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Gem, Scale, Sparkles } from "lucide-react"

const features = [
  {
    icon: Gem,
    title: "Premium Materials",
    description:
      "Sourced from the finest resins, metals, and gemstone composites from around the world.",
  },
  {
    icon: Scale,
    title: "Precision Balanced",
    description:
      "Each die is water-tested and micro-calibrated to ensure perfectly random rolls every time.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description:
      "Scratch-resistant coatings and reinforced edges mean your dice survive thousands of campaigns.",
  },
  {
    icon: Sparkles,
    title: "Hand Finished",
    description:
      "Expert artisans hand-polish and inspect every single die before it leaves our workshop.",
  },
]

export function CraftSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="craft" className="py-24 px-6" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image side */}
          <div className="flex-1 w-full">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/dice-amethyst.jpg"
                alt="Handcrafted dice with rune engravings"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
          </div>

          {/* Features grid */}
          <div className="flex-1">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-3">
              The Craft
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-10">
              Every Detail Matters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">{feat.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
