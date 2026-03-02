import { describe, expect, it } from "vitest"
import type Stripe from "stripe"
import { normalizeCheckoutToOrderPayload } from "./stripe-order"

describe("normalizeCheckoutToOrderPayload", () => {
  it("maps session and line items into order payload", () => {
    const session = {
      id: "cs_test_123",
      payment_intent: "pi_test_123",
      currency: "usd",
      amount_subtotal: 9998,
      amount_total: 9998,
      total_details: { amount_discount: 0, amount_shipping: 0 },
      metadata: {
        cart: JSON.stringify([
          { productId: "eye-of-sauron-resin-dice", quantity: 1 },
          { productId: "shadowthorn-gothic-dice", quantity: 1 },
        ]),
      },
      customer_details: {
        email: "buyer@example.com",
        name: "Buyer One",
        address: {
          line1: "123 Main St",
          line2: null,
          city: "Sydney",
          state: "NSW",
          postal_code: "2000",
          country: "AU",
        },
      },
    } as unknown as Stripe.Checkout.Session

    const lineItems = {
      data: [
        {
          description: "Eye of Sauron Resin Dice Set",
          quantity: 1,
          currency: "usd",
          price: { unit_amount: 4999 },
        },
        {
          description: "Shadowthorn Gothic Dice Set",
          quantity: 1,
          currency: "usd",
          price: { unit_amount: 4999 },
        },
      ],
    } as unknown as Stripe.ApiList<Stripe.LineItem>

    const payload = normalizeCheckoutToOrderPayload({
      session,
      lineItems,
      stripeEventId: "evt_123",
    })

    expect(payload.stripeSessionId).toBe("cs_test_123")
    expect(payload.customerEmail).toBe("buyer@example.com")
    expect(payload.lineItems[0].productId).toBe("eye-of-sauron-resin-dice")
    expect(payload.totalAmount).toBe(9998)
    expect(payload.shippingAddress.country).toBe("AU")
  })
})
