"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { DiceFace } from "./dice-face"

const reviews = [
  {
    name: "Marcus T.",
    role: "Dungeon Master, 12 years",
    quote: "The weight, the balance, the sound they make on the table — nothing else comes close.",
    rating: 5,
    diceValue: 6,
  },
  {
    name: "Elena R.",
    role: "Board Game Collector",
    quote: "I bought the Obsidian Night set as a gift and ended up keeping it. They are stunning.",
    rating: 5,
    diceValue: 4,
  },
  {
    name: "Kiran P.",
    role: "Twitch RPG Streamer",
    quote: "My viewers always ask about my dice. Arcane Dice Co. is the only brand I recommend.",
    rating: 5,
    diceValue: 5,
  },
]

export function ReviewsSection() {
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
    <section id="reviews" className="py-24 px-6 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
            Trusted by Adventurers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className={`relative bg-card border border-border rounded-xl p-8 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="absolute -top-4 right-6 opacity-30">
                <DiceFace value={review.diceValue} size={56} />
              </div>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              <blockquote className="text-foreground leading-relaxed mb-6">
                {`"${review.quote}"`}
              </blockquote>

              <div>
                <p className="font-bold text-foreground text-sm">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
