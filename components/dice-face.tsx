"use client"

interface DiceFaceProps {
  value: number
  size?: number
  className?: string
}

export function DiceFace({ value, size = 80, className = "" }: DiceFaceProps) {
  const dotPositions: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
  }

  const dots = dotPositions[value] || dotPositions[1]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-label={`Dice showing ${value}`}
    >
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="16"
        ry="16"
        fill="currentColor"
        className="text-card"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ stroke: "oklch(0.35 0.01 285)" }}
      />
      {dots.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="9"
          fill="currentColor"
          className="text-primary"
        />
      ))}
    </svg>
  )
}
