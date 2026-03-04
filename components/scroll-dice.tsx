"use client"

import { useEffect, useRef, useState } from "react"
import { DiceFace } from "./dice-face"

export function ScrollDice() {
  const [diceValues, setDiceValues] = useState([3, 5, 2, 6, 1, 4])
  const [isRolling, setIsRolling] = useState(false)
  const lastRollTime = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastRollTime.current > 2000) {
        lastRollTime.current = now
        setIsRolling(true)
        setDiceValues(prev => prev.map(() => Math.floor(Math.random() * 6) + 1))
        setTimeout(() => setIsRolling(false), 600)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
