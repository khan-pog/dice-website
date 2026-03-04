"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, ArrowRight, Dices } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const WEIGHTED_D20_RESULTS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
]

function rollWeightedD20() {
  const index = Math.floor(Math.random() * WEIGHTED_D20_RESULTS.length)
  return WEIGHTED_D20_RESULTS[index]
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [checkoutError, setCheckoutError] = useState("")
  const [discountRoll, setDiscountRoll] = useState<number | null>(null)
  const [displayRoll, setDisplayRoll] = useState<number | null>(null)
  const [rollModalOpen, setRollModalOpen] = useState(false)
  const [rollPhase, setRollPhase] = useState<"idle" | "rolling" | "landing" | "result">("idle")
  const rollTimeoutsRef = useRef<number[]>([])

  const shippingFree = totalPrice >= 7500
  const shippingCost = shippingFree ? 0 : 595
  const discountPercent = discountRoll ?? 0
  const discountAmount = Math.round((totalPrice * discountPercent) / 100)
  const discountedSubtotal = totalPrice - discountAmount
  const orderTotal = discountedSubtotal + shippingCost

  useEffect(() => {
    return () => {
      for (const timeoutId of rollTimeoutsRef.current) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  function openRollModal() {
    if (discountRoll !== null) return
    setDisplayRoll(20)
    setRollPhase("idle")
    setRollModalOpen(true)
  }

  function startDiceRoll() {
    if (discountRoll !== null || rollPhase !== "idle") return
    setRollPhase("rolling")

    let tick = 0
    const totalTicks = 32

    const scheduleNext = () => {
      if (tick >= totalTicks) {
        const finalRoll = rollWeightedD20()
        setDisplayRoll(finalRoll)
        setRollPhase("landing")

        const landingTimeout = window.setTimeout(() => {
          setRollPhase("result")
          setDiscountRoll(finalRoll)
        }, 650)
        rollTimeoutsRef.current.push(landingTimeout)
        return
      }

      setDisplayRoll(rollWeightedD20())
      tick += 1

      const delay =
        tick < 12 ? 55 :
        tick < 20 ? 90 :
        tick < 27 ? 145 :
        260

      const timeoutId = window.setTimeout(scheduleNext, delay)
      rollTimeoutsRef.current.push(timeoutId)
    }

    scheduleNext()
  }

  async function handleProceedToCheckout() {
    setCheckoutError("")
    setIsRedirecting(true)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load. Please refresh and try again.")
      }

      const lineItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }))

      const sessionId = await startCheckoutSession(
        lineItems,
        window.location.origin,
        discountPercent
      )
      const result = await stripe.redirectToCheckout({ sessionId })

      if (result.error?.message) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to start checkout."
      setCheckoutError(message)
      setIsRedirecting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Your Cart {totalItems > 0 && <span className="text-muted-foreground text-xl">({totalItems} {totalItems === 1 ? "item" : "items"})</span>}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven{"'"}t added any dice to your collection yet.
              </p>
              <Link href="/#collection">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Collection
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart items */}
              <div className="flex-1 flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-bold text-foreground truncate">{item.product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{item.product.includes}</p>
                      <p className="text-primary font-bold mt-2">
                        {formatPrice(item.product.priceInCents)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
                  <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

                  <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-4 mb-4 shadow-md">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold tracking-wide text-foreground/90">
                        Limited offer: Roll a d20 for 1-20% off
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        onClick={openRollModal}
                        disabled={discountRoll !== null}
                        className={`h-8 gap-1 ${
                          discountRoll === null
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse"
                            : "bg-primary/90 text-primary-foreground"
                        }`}
                      >
                        <Dices className="h-3.5 w-3.5" />
                        {discountRoll === null ? "Open Roll" : "Locked In"}
                      </Button>
                    </div>
                    {discountRoll !== null ? (
                      <p className="text-xs text-primary font-semibold mt-2">
                        Rolled {discountRoll} - discount applied.
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        discountPercent > 0 ? "max-h-12 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">d20 Discount ({discountPercent}%)</span>
                        <span className="font-bold text-primary animate-pulse">-{formatPrice(discountAmount)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={`font-medium ${shippingFree ? "text-primary" : "text-foreground"}`}>
                        {shippingFree ? "FREE" : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {!shippingFree && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $75.00
                      </p>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className={`font-bold text-lg transition-colors ${discountPercent > 0 ? "text-primary" : "text-foreground"}`}>
                        {formatPrice(orderTotal)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleProceedToCheckout}
                    disabled={isRedirecting}
                    className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    {isRedirecting ? "Redirecting..." : "Proceed to Checkout"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Taxes calculated at checkout
                  </p>
                  {checkoutError ? (
                    <p className="text-xs text-destructive text-center mt-2">{checkoutError}</p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={rollModalOpen} onOpenChange={setRollModalOpen}>
        <DialogContent showCloseButton={rollPhase === "result"} className="max-w-md border-white/10 bg-[#0a0a14] text-white">
          <DialogTitle className="text-center text-sm uppercase tracking-[0.22em] text-purple-300">
            Fortune Roll
          </DialogTitle>
          <DialogDescription className="text-center text-white/60">
            Roll a physical d20. Your result is your discount percent.
          </DialogDescription>

          <style>{`
            @keyframes cart-d20-idle {
              0%,100% { transform: perspective(860px) rotateX(6deg) rotateY(-4deg) rotateZ(0deg) translateY(0px); }
              35% { transform: perspective(860px) rotateX(2deg) rotateY(8deg) rotateZ(1deg) translateY(-3px); }
              70% { transform: perspective(860px) rotateX(4deg) rotateY(-7deg) rotateZ(-1deg) translateY(-1px); }
            }
            @keyframes cart-d20-roll {
              0% { transform: perspective(860px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) scale(1); }
              25% { transform: perspective(860px) rotateX(-290deg) rotateY(210deg) rotateZ(65deg) translateY(-10px) scale(1.03); }
              50% { transform: perspective(860px) rotateX(-610deg) rotateY(470deg) rotateZ(120deg) translateY(-2px) scale(0.98); }
              75% { transform: perspective(860px) rotateX(-930deg) rotateY(690deg) rotateZ(170deg) translateY(-8px) scale(1.02); }
              100% { transform: perspective(860px) rotateX(-1240deg) rotateY(920deg) rotateZ(220deg) translateY(0px) scale(1); }
            }
            @keyframes cart-d20-land {
              0% { transform: perspective(860px) rotateX(-22deg) rotateY(16deg) rotateZ(12deg) translateY(-14px) scale(1.08); }
              42% { transform: perspective(860px) rotateX(10deg) rotateY(-8deg) rotateZ(-5deg) translateY(3px) scale(0.97); }
              70% { transform: perspective(860px) rotateX(-4deg) rotateY(4deg) rotateZ(2deg) translateY(-1px) scale(1.01); }
              100% { transform: perspective(860px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) scale(1); }
            }
            @keyframes cart-d20-shadow {
              0%,100% { transform: scaleX(1) scaleY(1); opacity: 0.34; }
              30% { transform: scaleX(0.68) scaleY(0.9); opacity: 0.18; }
              60% { transform: scaleX(1.18) scaleY(1.05); opacity: 0.4; }
            }
            @keyframes cart-d20-specular {
              0%,100% { opacity: 0.35; transform: translateY(0px); }
              50% { opacity: 0.72; transform: translateY(-2px); }
            }
          `}</style>

          <div className="py-3">
            <div className="relative mx-auto h-52 w-52">
              <button
                type="button"
                onClick={startDiceRoll}
                disabled={rollPhase !== "idle"}
                className={`absolute inset-0 ${rollPhase === "idle" ? "cursor-pointer" : "cursor-default"}`}
                style={{
                  animation:
                    rollPhase === "rolling"
                      ? "cart-d20-roll 0.82s cubic-bezier(0.38,0.02,0.63,0.99) infinite"
                      : rollPhase === "landing"
                        ? "cart-d20-land 0.78s cubic-bezier(0.22,1,0.36,1) 1 forwards"
                        : "cart-d20-idle 3.2s ease-in-out infinite",
                }}
                aria-label="Roll the d20 for discount"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="cart-d20-body" x1="16%" y1="10%" x2="82%" y2="92%">
                      <stop offset="0%" stopColor="#36265f" />
                      <stop offset="45%" stopColor="#1d1538" />
                      <stop offset="100%" stopColor="#0f0b21" />
                    </linearGradient>
                    <radialGradient id="cart-d20-highlight" cx="36%" cy="28%" r="52%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.52)" />
                      <stop offset="60%" stopColor="rgba(196,181,253,0.10)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <radialGradient id="cart-d20-shadow-face" cx="65%" cy="76%" r="55%">
                      <stop offset="0%" stopColor="rgba(0,0,0,0.38)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                  </defs>
                  <polygon
                    points="50,6 92,36 76,86 24,86 8,36"
                    fill="url(#cart-d20-body)"
                    stroke="#8b5cf6"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="50,22 73,68 27,68"
                    fill="none"
                    stroke="#a78bfa"
                    strokeOpacity="0.7"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <line x1="50" y1="6" x2="50" y2="22" stroke="#a78bfa" strokeOpacity="0.65" strokeWidth="1.3" />
                  <line x1="92" y1="36" x2="73" y2="68" stroke="#a78bfa" strokeOpacity="0.65" strokeWidth="1.3" />
                  <line x1="76" y1="86" x2="73" y2="68" stroke="#a78bfa" strokeOpacity="0.65" strokeWidth="1.3" />
                  <line x1="24" y1="86" x2="27" y2="68" stroke="#a78bfa" strokeOpacity="0.65" strokeWidth="1.3" />
                  <line x1="8" y1="36" x2="27" y2="68" stroke="#a78bfa" strokeOpacity="0.65" strokeWidth="1.3" />
                  <polygon
                    points="50,6 92,36 76,86 24,86 8,36"
                    fill="url(#cart-d20-highlight)"
                    style={{
                      animation: rollPhase === "idle" ? "cart-d20-specular 2.8s ease-in-out infinite" : undefined,
                    }}
                  />
                  <polygon
                    points="50,6 92,36 76,86 24,86 8,36"
                    fill="url(#cart-d20-shadow-face)"
                  />
                  <text
                    x="50"
                    y="52"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={(displayRoll ?? 20) >= 10 ? "22" : "26"}
                    fontWeight="800"
                    fill="#f2e9ff"
                    stroke="rgba(55,30,90,0.55)"
                    strokeWidth="0.7"
                    fontFamily="Georgia, 'Times New Roman', serif"
                  >
                    {displayRoll ?? 20}
                  </text>
                </svg>
              </button>
            </div>
            <div
              className="mx-auto mt-2 h-3 w-28 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 45%, transparent 72%)",
                animation: rollPhase === "rolling" ? "cart-d20-shadow 0.7s linear infinite" : undefined,
              }}
            />
          </div>

          <div className="text-center space-y-3 pb-1">
            {rollPhase === "idle" ? (
              <p className="text-sm text-white/70">Tap the die to roll your fate.</p>
            ) : rollPhase === "rolling" ? (
              <p className="text-sm text-purple-300 animate-pulse">Rolling...</p>
            ) : rollPhase === "landing" ? (
              <p className="text-sm text-purple-200 animate-pulse">Landing...</p>
            ) : (
              <>
                <p className="text-2xl font-extrabold text-primary">{displayRoll}% OFF</p>
                <p className="text-sm text-white/70">Your discount is now locked in.</p>
                <Button
                  type="button"
                  onClick={() => setRollModalOpen(false)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Claim Discount
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
