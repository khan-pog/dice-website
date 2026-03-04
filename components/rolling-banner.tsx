"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { DiceFace } from "./dice-face"

export function RollingBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const [diceRow, setDiceRow] = useState([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6])
  const [rolling, setRolling] = useState(false)
  const lastRollTime = useRef(0)

  const rollAll = useCallback(() => {
    setRolling(true)
    setDiceRow(prev => prev.map(() => Math.floor(Math.random() * 6) + 1))
    setTimeout(() => setRolling(false), 600)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) rollAll()
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rollAll])

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      const now = Date.now()
      if (inView && now - lastRollTime.current > 2000) {
        lastRollTime.current = now
        rollAll()
      }
    }

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [rollAll])

  return (
    <div
      ref={ref}
      className="py-12 bg-secondary/50 border-y border-border overflow-hidden"
    >
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {diceRow.map((val, i) => (
          <div
            key={i}
            className={`transition-all duration-300 ${rolling ? "animate-dice-bounce" : ""}`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <DiceFace value={val} size={40} className="opacity-40" />
          </div>
        ))}
      </div>
    </div>
  )
}
