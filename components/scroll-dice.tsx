"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { DiceFace } from "./dice-face"

export function ScrollDice() {
  const [diceValues, setDiceValues] = useState([3, 5, 2, 6, 1, 4])
  const [isRolling, setIsRolling] = useState(false)
  const lastScrollY = useRef(0)
  const rollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const rollDice = useCallback(() => {
    setIsRolling(true)
    setDiceValues(prev => prev.map(() => Math.floor(Math.random() * 6) + 1))

    if (rollTimeout.current) clearTimeout(rollTimeout.current)
    rollTimeout.current = setTimeout(() => setIsRolling(false), 600)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY.current)

      if (delta > 60) {
        rollDice()
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [rollDice])

  return (
    <div className="fixed top-1/2 right-6 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {diceValues.map((value, i) => (
        <div
          key={i}
          className={`transition-all duration-300 ${isRolling ? "animate-dice-bounce" : ""}`}
          style={{
            animationDelay: `${i * 80}ms`,
            opacity: isRolling ? undefined : 0.6,
          }}
        >
          <DiceFace value={value} size={44} />
        </div>
      ))}
    </div>
  )
}
