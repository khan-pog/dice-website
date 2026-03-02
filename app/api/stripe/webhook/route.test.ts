import { beforeEach, describe, expect, it, vi } from "vitest"

const constructEventMock = vi.fn()
const listLineItemsMock = vi.fn()
const mutationMock = vi.fn()
const sendOrderConfirmationEmailMock = vi.fn()

vi.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: {
      constructEvent: constructEventMock,
    },
    checkout: {
      sessions: {
        listLineItems: listLineItemsMock,
      },
    },
  },
}))

vi.mock("@/lib/convex", () => ({
  convexFns: {
    reserveEventProcessing: { _name: "reserve" },
    createOrderFromCheckoutEvent: { _name: "createOrder" },
    completeEventProcessing: { _name: "complete" },
  },
  convexClient: () => ({
    mutation: mutationMock,
  }),
}))

vi.mock("@/lib/email", () => ({
  sendOrderConfirmationEmail: sendOrderConfirmationEmailMock,
}))

describe("stripe webhook route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_123"
  })

  it("persists new completed checkout and sends confirmation email", async () => {
    const { POST } = await import("./route")

    constructEventMock.mockReturnValue({
      id: "evt_1",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_123",
          payment_intent: "pi_123",
          currency: "usd",
          amount_subtotal: 4999,
          amount_total: 4999,
          total_details: { amount_discount: 0, amount_shipping: 0 },
          metadata: {
            cart: JSON.stringify([{ productId: "shadowthorn-gothic-dice", quantity: 1 }]),
          },
          customer_details: {
            email: "buyer@example.com",
            name: "Buyer",
            address: { country: "US" },
          },
        },
      },
    })

    listLineItemsMock.mockResolvedValue({
      data: [{ description: "Shadowthorn Gothic Dice Set", quantity: 1, price: { unit_amount: 4999 }, currency: "usd" }],
    })

    mutationMock
      .mockResolvedValueOnce({ alreadyProcessed: false })
      .mockResolvedValueOnce({ orderId: "order_1", orderNumber: "ARC-20260302-1111" })
      .mockResolvedValueOnce(null)

    const req = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: { "stripe-signature": "sig" },
      body: "{}",
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.received).toBe(true)
    expect(mutationMock).toHaveBeenCalledTimes(3)
    expect(sendOrderConfirmationEmailMock).toHaveBeenCalledTimes(1)
  })

  it("short-circuits duplicate webhook events", async () => {
    const { POST } = await import("./route")

    constructEventMock.mockReturnValue({
      id: "evt_dup",
      type: "checkout.session.completed",
      data: {
        object: { id: "cs_dup" },
      },
    })

    mutationMock.mockResolvedValueOnce({ alreadyProcessed: true })

    const req = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: { "stripe-signature": "sig" },
      body: "{}",
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.duplicate).toBe(true)
    expect(listLineItemsMock).not.toHaveBeenCalled()
    expect(sendOrderConfirmationEmailMock).not.toHaveBeenCalled()
  })
})
