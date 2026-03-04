"use client"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import { formatPrice } from "@/lib/products"

interface D20RollWidgetProps {
  onDiscount: (cents: number) => void
}

type Phase = "idle" | "rolling" | "landing" | "result"
type Tier = "bad" | "good" | "nat20"

const MESSAGES: Record<Tier, string[]> = {
  bad: [
    "The dice betray you...",
    "Fortune frowns upon thee.",
    "Even the bard looks away.",
    "The tavern grows quiet.",
    "A rough roll, adventurer.",
  ],
  good: [
    "Fortune smiles upon you!",
    "The dice favour the brave!",
    "Luck is your companion!",
    "A worthy roll, adventurer!",
    "The crowd cheers!",
  ],
  nat20: [
    "NATURAL 20! LEGENDARY!",
    "CRITICAL SUCCESS!",
    "THE DICE GODS APPROVE!",
    "MAXIMUM ARCANE POWER!",
    "THE TAVERN ERUPTS!",
  ],
}

interface Particle {
  id: number
  xOffset: number
  yOffset: number
  color: string
  delay: number
  size: number
  duration: number
}

// ─── D20 SVG ────────────────────────────────────────────────────────────────
// Pentagon silhouette with inner-triangle facet lines + a highlight overlay
// to give 3D depth even when face-on.

function D20Svg({
  value,
  faceColor,
  edgeColor,
  numColor,
  highlightOpacity = 1,
  className,
}: {
  value: number
  faceColor: string
  edgeColor: string
  numColor: string
  highlightOpacity?: number
  className?: string
}) {
  const fontSize = value >= 10 ? "22" : "26"
  return (
    <svg viewBox="0 0 100 100" className={className} aria-label={`D20 showing ${value}`}>
      <defs>
        <radialGradient id="d20-highlight" cx="38%" cy="30%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="d20-shadow" cx="62%" cy="72%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Body */}
      <polygon
        points="50,6 92,36 76,86 24,86 8,36"
        fill={faceColor}
        stroke={edgeColor}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Inner triangle facet */}
      <polygon
        points="50,22 73,68 27,68"
        fill="none"
        stroke={edgeColor}
        strokeWidth="1.5"
        strokeOpacity="0.6"
        strokeLinejoin="round"
      />

      {/* Edge lines: outer vertices → inner triangle vertices */}
      <line x1="50" y1="6"  x2="50" y2="22" stroke={edgeColor} strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="92" y1="36" x2="73" y2="68" stroke={edgeColor} strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="76" y1="86" x2="73" y2="68" stroke={edgeColor} strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="24" y1="86" x2="27" y2="68" stroke={edgeColor} strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="8"  y1="36" x2="27" y2="68" stroke={edgeColor} strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Top-left highlight — makes the face look lit */}
      <polygon
        points="50,6 92,36 76,86 24,86 8,36"
        fill="url(#d20-highlight)"
        opacity={highlightOpacity}
      />

      {/* Bottom-right shading for depth */}
      <polygon
        points="50,6 92,36 76,86 24,86 8,36"
        fill="url(#d20-shadow)"
        opacity={highlightOpacity}
      />

      {/* Number */}
      <text
        x="50"
        y="52"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight="bold"
        fill={numColor}
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        {value}
      </text>
    </svg>
  )
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function D20Modal({
  onResult,
  onClose,
}: {
  onResult: (cents: number) => void
  onClose: () => void
}) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [displayNum, setDisplayNum] = useState(20)
  const [result, setResult] = useState<number | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const pidRef = useRef(0)

  const tier: Tier | null =
    result !== null ? (result === 20 ? "nat20" : result >= 11 ? "good" : "bad") : null

  const [msgs] = useState(() => {
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
    return { bad: pick(MESSAGES.bad), good: pick(MESSAGES.good), nat20: pick(MESSAGES.nat20) }
  })

  function spawnParticles(t: Tier) {
    const colors =
      t === "nat20"
        ? ["#FFD700", "#FF8C00", "#FF6347", "#FF1493", "#00CED1", "#7B68EE", "#ADFF2F", "#FF69B4"]
        : ["#22c55e", "#86efac", "#4ade80", "#bbf7d0", "#6ee7b7", "#a3e635"]
    const count = t === "nat20" ? 36 : 14
    const newParticles: Particle[] = Array.from({ length: count }, () => ({
      id: pidRef.current++,
      xOffset: (Math.random() - 0.5) * 240,
      yOffset: (Math.random() - 0.5) * 80,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.55,
      size: t === "nat20" ? 6 + Math.random() * 9 : 4 + Math.random() * 6,
      duration: 1.8 + Math.random() * 1.0,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 3500)
  }

  function roll() {
    if (phase !== "idle") return
    setPhase("rolling")

    let tick = 0
    const totalTicks = 34

    function scheduleNext() {
      if (tick >= totalTicks) {
        const finalRoll = Math.floor(Math.random() * 20) + 1
        setDisplayNum(finalRoll)
        setPhase("landing")

        setTimeout(() => {
          setResult(finalRoll)
          setPhase("result")
          onResult(finalRoll === 20 ? 1000 : finalRoll * 25)
          const t: Tier = finalRoll === 20 ? "nat20" : finalRoll >= 11 ? "good" : "bad"
          if (t !== "bad") spawnParticles(t)
        }, 700)
        return
      }

      setDisplayNum(Math.floor(Math.random() * 20) + 1)
      tick++

      // Variable speed: fast → gradual slow-down → dramatic pause
      const delay =
        tick < 12 ? 60  :
        tick < 20 ? 90  :
        tick < 27 ? 150 :
        tick < 32 ? 240 :
        340

      setTimeout(scheduleNext, delay)
    }

    scheduleNext()
  }

  // ── Colors ──
  const faceColor =
    tier === "bad"   ? "#2d0808" :
    tier === "good"  ? "#082d14" :
    tier === "nat20" ? "#2d1c00" :
    phase === "rolling" || phase === "landing" ? "#12102a" :
    "#1a1830"

  const edgeColor =
    tier === "bad"   ? "#dc2626" :
    tier === "good"  ? "#16a34a" :
    tier === "nat20" ? "#d97706" :
    phase === "rolling" || phase === "landing" ? "#818cf8" :
    "rgba(139,92,246,0.7)"

  const numColor =
    tier === "bad"   ? "#f87171" :
    tier === "good"  ? "#4ade80" :
    tier === "nat20" ? "#fbbf24" :
    phase === "rolling" || phase === "landing" ? "#c4b5fd" :
    "#a78bfa"

  // Animation class for the 3D wrapper
  const wrapperAnimClass =
    phase === "rolling"                    ? "d20-3d-rolling"  :
    phase === "landing"                    ? "d20-3d-landing"  :
    phase === "result" && tier === "bad"   ? "d20-3d-shake"    :
    phase === "result" && tier === "good"  ? "d20-3d-good"     :
    phase === "result" && tier === "nat20" ? "d20-3d-nat20"    :
    "d20-3d-idle"

  const backdropClass =
    phase === "result" && tier === "nat20" ? "d20-backdrop-nat20" :
    phase === "result" && tier === "bad"   ? "d20-backdrop-bad"   :
    ""

  const textColor =
    tier === "bad"   ? "text-red-400" :
    tier === "good"  ? "text-green-400" :
    tier === "nat20" ? "text-yellow-400" :
    "text-foreground"

  const claimBg =
    tier === "bad"   ? "bg-red-700 hover:bg-red-600" :
    tier === "good"  ? "bg-green-600 hover:bg-green-500" :
    tier === "nat20" ? "bg-yellow-500 hover:bg-yellow-400 text-black" :
    "bg-primary hover:bg-primary/90"

  return (
    <>
      <style>{`
        /* ── Backdrop ── */
        @keyframes d20-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes d20-backdrop-nat20-anim {
          0%,100% { background: rgba(0,0,0,0.88); }
          15%  { background: rgba(255,215,0,0.22); }
          35%  { background: rgba(255,80,0,0.14); }
          55%  { background: rgba(200,0,255,0.10); }
          75%  { background: rgba(255,215,0,0.18); }
        }
        @keyframes d20-backdrop-bad-anim {
          0%,100% { background: rgba(0,0,0,0.88); }
          30%  { background: rgba(160,0,0,0.20); }
        }
        .d20-backdrop-nat20 { animation: d20-backdrop-nat20-anim 1.6s ease-in-out 1; }
        .d20-backdrop-bad   { animation: d20-backdrop-bad-anim   0.55s ease-in-out 1; }

        /* ── Card entry ── */
        @keyframes d20-card-in {
          from { transform: scale(0.7) translateY(-20px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);     opacity: 1; }
        }

        /* ── 3D perspective wrapper: idle float ── */
        @keyframes d20-idle-float {
          0%,100% { transform: perspective(700px) rotateX(6deg)  rotateY(0deg)  translateY(0px); }
          33%     { transform: perspective(700px) rotateX(2deg)  rotateY(8deg)  translateY(-4px); }
          66%     { transform: perspective(700px) rotateX(4deg)  rotateY(-6deg) translateY(-2px); }
        }
        .d20-3d-idle {
          animation: d20-idle-float 3.5s ease-in-out infinite;
          filter: drop-shadow(0 0 14px rgba(139,92,246,0.45));
        }

        /* ── 3D rolling: smooth physical tumble ── */
        @keyframes d20-3d-roll-anim {
          0%   { transform: perspective(700px) rotateX(0deg)    rotateY(0deg); }
          20%  { transform: perspective(700px) rotateX(-90deg)  rotateY(18deg); }
          40%  { transform: perspective(700px) rotateX(-180deg) rotateY(-12deg); }
          60%  { transform: perspective(700px) rotateX(-270deg) rotateY(22deg); }
          80%  { transform: perspective(700px) rotateX(-330deg) rotateY(-8deg); }
          100% { transform: perspective(700px) rotateX(-360deg) rotateY(0deg); }
        }
        /* Shading overlay pulses in sync with 3D rotation */
        @keyframes d20-shade-roll {
          0%,100% { opacity: 0.0; }
          20%     { opacity: 0.55; }
          40%     { opacity: 0.08; }
          60%     { opacity: 0.55; }
          80%     { opacity: 0.12; }
        }
        /* Ground shadow stretches as die tips */
        @keyframes d20-ground-shadow {
          0%,100% { transform: scaleX(1.0) scaleY(1);   opacity: 0.35; }
          20%     { transform: scaleX(0.65) scaleY(1);  opacity: 0.2;  }
          40%     { transform: scaleX(1.2)  scaleY(1);  opacity: 0.4;  }
          60%     { transform: scaleX(0.65) scaleY(1);  opacity: 0.2;  }
          80%     { transform: scaleX(1.1)  scaleY(1);  opacity: 0.35; }
        }
        .d20-3d-rolling .d20-die-wrap { animation: d20-3d-roll-anim 0.85s linear infinite; }
        .d20-3d-rolling .d20-shade    { animation: d20-shade-roll   0.85s linear infinite; }
        .d20-3d-rolling .d20-shadow   { animation: d20-ground-shadow 0.85s linear infinite; }

        /* ── Landing: settle from tilted 3D to flat face-on ── */
        @keyframes d20-3d-land-anim {
          0%   { transform: perspective(700px) rotateX(-30deg) rotateY(15deg); }
          30%  { transform: perspective(700px) rotateX(12deg)  rotateY(-8deg); }
          55%  { transform: perspective(700px) rotateX(-6deg)  rotateY(4deg); }
          72%  { transform: perspective(700px) rotateX(3deg)   rotateY(-2deg); }
          85%  { transform: perspective(700px) rotateX(-1deg)  rotateY(1deg); }
          100% { transform: perspective(700px) rotateX(0deg)   rotateY(0deg); }
        }
        .d20-3d-landing .d20-die-wrap { animation: d20-3d-land-anim 0.7s cubic-bezier(0.22,1,0.36,1) 1 forwards; }

        /* ── Bad: shake ── */
        @keyframes d20-3d-shake-anim {
          0%,100% { transform: perspective(700px) rotateX(0deg)  translateX(0); }
          12%     { transform: perspective(700px) rotateX(-8deg) translateX(-12px) rotateZ(-4deg); }
          25%     { transform: perspective(700px) rotateX(8deg)  translateX(12px)  rotateZ(4deg); }
          37%     { transform: perspective(700px) rotateX(-6deg) translateX(-9px)  rotateZ(-3deg); }
          50%     { transform: perspective(700px) rotateX(6deg)  translateX(9px)   rotateZ(3deg); }
          65%     { transform: perspective(700px) rotateX(-3deg) translateX(-5px)  rotateZ(-2deg); }
          80%     { transform: perspective(700px) rotateX(3deg)  translateX(5px)   rotateZ(2deg); }
        }
        @keyframes d20-3d-bad-glow {
          0%,100% { filter: drop-shadow(0 0 10px rgba(220,38,38,0.5)); }
          50%     { filter: drop-shadow(0 0 24px rgba(220,38,38,0.95)); }
        }
        .d20-3d-shake .d20-die-wrap {
          animation:
            d20-3d-shake-anim 0.65s ease-in-out 1,
            d20-3d-bad-glow   1.6s ease-in-out infinite 0.65s;
        }

        /* ── Good glow ── */
        @keyframes d20-3d-good-anim {
          0%,100% {
            transform: perspective(700px) rotateX(4deg) rotateY(-3deg);
            filter: drop-shadow(0 0 12px rgba(34,197,94,0.6));
          }
          50% {
            transform: perspective(700px) rotateX(-3deg) rotateY(4deg);
            filter: drop-shadow(0 0 28px rgba(34,197,94,1));
          }
        }
        .d20-3d-good .d20-die-wrap { animation: d20-3d-good-anim 1.8s ease-in-out infinite; }

        /* ── Nat 20 rainbow glow ── */
        @keyframes d20-3d-nat20-anim {
          0%   { transform: perspective(700px) rotateX(5deg)  rotateY(-4deg);  filter: drop-shadow(0 0 16px #FFD700) drop-shadow(0 0 32px #FF8C00); }
          17%  { transform: perspective(700px) rotateX(-5deg) rotateY(5deg);   filter: drop-shadow(0 0 28px #FF6347) drop-shadow(0 0 52px #FFD700); }
          33%  { transform: perspective(700px) rotateX(4deg)  rotateY(-5deg);  filter: drop-shadow(0 0 22px #FF1493) drop-shadow(0 0 40px #FFEC00); }
          50%  { transform: perspective(700px) rotateX(-4deg) rotateY(4deg);   filter: drop-shadow(0 0 34px #7B68EE) drop-shadow(0 0 56px #FFD700); }
          66%  { transform: perspective(700px) rotateX(5deg)  rotateY(-3deg);  filter: drop-shadow(0 0 26px #00CED1) drop-shadow(0 0 48px #FF6347); }
          83%  { transform: perspective(700px) rotateX(-3deg) rotateY(5deg);   filter: drop-shadow(0 0 30px #FFD700) drop-shadow(0 0 52px #FF8C00); }
          100% { transform: perspective(700px) rotateX(5deg)  rotateY(-4deg);  filter: drop-shadow(0 0 16px #FFD700) drop-shadow(0 0 32px #FF8C00); }
        }
        .d20-3d-nat20 .d20-die-wrap { animation: d20-3d-nat20-anim 0.8s ease-in-out infinite; }

        /* ── Particles ── */
        .d20-burst-particle { animation: particle-burst var(--dur) ease-out forwards; }
        @keyframes particle-burst {
          0%   { transform: translate(0, 0)                      scale(1);   opacity: 1; }
          60%  { transform: translate(var(--px), var(--py))      scale(0.7); opacity: 0.8; }
          100% { transform: translate(var(--pxf), var(--pyf))    scale(0);   opacity: 0; }
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClass}`}
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(6px)",
          animation: "d20-backdrop-in 0.25s ease-out",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && phase === "result") onClose()
        }}
      >
        {/* ── Modal card ── */}
        <div
          className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a0a14] shadow-2xl overflow-hidden"
          style={{ animation: "d20-card-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="pt-8 px-6 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-1">
              ✦ Fortune Roll ✦
            </p>
            <p className="text-sm text-white/50 min-h-[20px]">
              {phase === "idle"
                ? "One roll per order. No take-backs."
                : phase === "rolling"
                  ? "The dice tumble through fate..."
                  : phase === "landing"
                    ? "Settling..."
                    : tier === "nat20"
                      ? "The legends speak of this day!"
                      : tier === "good"
                        ? "Your fortune has been revealed!"
                        : "The dice have spoken..."}
            </p>
          </div>

          {/* ── Die area ── */}
          <div className="relative flex flex-col items-center py-8">
            {/* Particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                className="d20-burst-particle absolute rounded-full pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  animationDelay: `${p.delay}s`,
                  ["--px" as string]: `${p.xOffset * 0.5}px`,
                  ["--py" as string]: `${p.yOffset * 0.5 - 35}px`,
                  ["--pxf" as string]: `${p.xOffset}px`,
                  ["--pyf" as string]: `${p.yOffset - 100}px`,
                  ["--dur" as string]: `${p.duration}s`,
                } as React.CSSProperties}
              />
            ))}

            {/* 3D perspective wrapper — the wrapperAnimClass controls which
                child animations run via CSS class selectors */}
            <div className={`relative ${wrapperAnimClass}`} style={{ width: 200, height: 200 }}>

              {/* The rolling die — rotations applied here */}
              <button
                onClick={roll}
                disabled={phase !== "idle"}
                aria-label="Click to roll the d20"
                className={`d20-die-wrap absolute inset-0 transition-colors duration-300 ${
                  phase === "idle" ? "cursor-pointer" : "cursor-default"
                }`}
                style={{ transformOrigin: "center center" }}
              >
                <D20Svg
                  value={displayNum}
                  faceColor={faceColor}
                  edgeColor={edgeColor}
                  numColor={numColor}
                  className="w-full h-full"
                />

                {/* Shading overlay — darkens face as it rotates away from camera */}
                <div
                  className="d20-shade absolute inset-0 rounded-none pointer-events-none"
                  style={{
                    background: "rgba(0,0,0,0.7)",
                    clipPath: "polygon(50% 6%, 92% 36%, 76% 86%, 24% 86%, 8% 36%)",
                    opacity: 0,
                  }}
                />
              </button>
            </div>

            {/* Ground shadow ellipse */}
            <div
              className="d20-shadow mt-2 rounded-full pointer-events-none"
              style={{
                width: 120,
                height: 12,
                background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                opacity: 0.35,
              }}
            />
          </div>

          {/* ── Result / CTA area ── */}
          <div className="px-6 pb-8 text-center min-h-[110px] flex flex-col items-center justify-center gap-3">
            {phase === "idle" && (
              <>
                <p className="text-white font-bold text-lg">Click to Roll Your Fate</p>
                <p className="text-white/50 text-sm">
                  Each pip = 25¢ off ·{" "}
                  <span className="text-yellow-400 font-semibold">Nat 20 = $10 off!</span>
                </p>
              </>
            )}

            {(phase === "rolling" || phase === "landing") && (
              <p className="text-purple-300 font-semibold text-base animate-pulse">
                {phase === "rolling" ? "Rolling..." : "Landing..."}
              </p>
            )}

            {phase === "result" && result !== null && tier && (
              <>
                <div>
                  <p className={`font-bold text-base ${textColor} ${tier === "nat20" ? "animate-pulse" : ""}`}>
                    {msgs[tier]}
                  </p>
                  <p className={`font-extrabold text-5xl mt-1 ${textColor}`}>{result}</p>
                  <p className={`font-semibold text-lg mt-1 ${textColor}`}>
                    {formatPrice(result === 20 ? 1000 : result * 25)} off your order
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className={`mt-1 w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${claimBg} text-white`}
                >
                  {tier === "nat20"
                    ? "⚔️ Claim $10.00 — LEGENDARY!"
                    : `Claim ${formatPrice(result === 20 ? 1000 : result * 25)} Discount`}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Trigger button ───────────────────────────────────────────────────────────

export function D20RollWidget({ onDiscount }: D20RollWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rolled, setRolled] = useState<number | null>(null)

  function handleResult(cents: number) {
    setRolled(cents)
    onDiscount(cents)
  }

  const rolledRoll = rolled !== null ? (rolled === 1000 ? 20 : Math.round(rolled / 25)) : null
  const rolledTier: Tier | null =
    rolled === null ? null :
    rolled === 1000 ? "nat20" :
    rolled >= 275   ? "good"  :
    "bad"

  const triggerBorder =
    rolledTier === "bad"   ? "border-red-800/60 bg-red-950/30" :
    rolledTier === "good"  ? "border-green-800/60 bg-green-950/30" :
    rolledTier === "nat20" ? "border-yellow-600/60 bg-yellow-950/30" :
    "border-purple-800/40 bg-purple-950/20 hover:bg-purple-950/30 hover:border-purple-600/60"

  const resultTextColor =
    rolledTier === "bad"   ? "text-red-400" :
    rolledTier === "good"  ? "text-green-400" :
    rolledTier === "nat20" ? "text-yellow-400" :
    "text-white"

  return (
    <>
      <style>{`
        @keyframes d20-btn-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
          50%     { box-shadow: 0 0 0 4px rgba(139,92,246,0.18); }
        }
        .d20-btn-unrolled { animation: d20-btn-pulse 2.8s ease-in-out infinite; }
      `}</style>

      <button
        onClick={() => !rolled && setIsOpen(true)}
        disabled={!!rolled}
        className={`mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 ${triggerBorder} ${
          !rolled ? "d20-btn-unrolled cursor-pointer" : "cursor-default"
        }`}
      >
        {/* Mini die */}
        <div className="w-9 h-9 flex-shrink-0">
          <D20Svg
            value={rolledRoll ?? 20}
            faceColor={
              rolledTier === "bad"   ? "#2d0808" :
              rolledTier === "good"  ? "#082d14" :
              rolledTier === "nat20" ? "#2d1c00" :
              "#1a1830"
            }
            edgeColor={
              rolledTier === "bad"   ? "#dc2626" :
              rolledTier === "good"  ? "#16a34a" :
              rolledTier === "nat20" ? "#d97706" :
              "rgba(139,92,246,0.8)"
            }
            numColor={
              rolledTier === "bad"   ? "#f87171" :
              rolledTier === "good"  ? "#4ade80" :
              rolledTier === "nat20" ? "#fbbf24" :
              "#a78bfa"
            }
            className="w-full h-full"
          />
        </div>

        {/* Label */}
        <div className="flex-1 text-left min-w-0">
          {rolled === null ? (
            <>
              <p className="text-sm font-semibold text-white leading-tight">Roll for a Discount</p>
              <p className="text-xs text-white/40 leading-tight mt-0.5">
                Win up to <span className="text-yellow-400">$10 off</span> — Nat 20 wins big!
              </p>
            </>
          ) : (
            <>
              <p className={`text-sm font-semibold leading-tight ${resultTextColor}`}>
                Fortune Roll: −{formatPrice(rolled)}
              </p>
              <p className="text-xs text-white/40 leading-tight mt-0.5">
                Rolled a {rolledRoll} — applied to your total
              </p>
            </>
          )}
        </div>

        {!rolled && <span className="text-purple-400/60 text-xs font-medium flex-shrink-0">Click →</span>}
        {rolled  && <span className={`text-xs font-bold flex-shrink-0 ${resultTextColor}`}>✓</span>}
      </button>

      {isOpen && (
        <D20Modal
          onResult={handleResult}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
