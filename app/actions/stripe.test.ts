import { beforeEach, describe, expect, it, vi } from "vitest"

const createSessionMock = vi.fn()

vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: createSessionMock,
      },
    },
  },
}))

describe("startCheckoutSession", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("throws when cart is empty", async () => {
    const { startCheckoutSession } = await import("./stripe")
    await expect(startCheckoutSession([])).rejects.toThrow("Cart is empty")
  })

  it("throws when product id is invalid", async () => {
    const { startCheckoutSession } = await import("./stripe")

    await expect(
      startCheckoutSession([{ productId: "not-a-real-product", quantity: 1 }])
    ).rejects.toThrow('Product with id "not-a-real-product" not found')
  })

  it("creates embedded checkout session and returns client secret", async () => {
    createSessionMock.mockResolvedValue({ client_secret: "cs_test_123" })
    const { startCheckoutSession } = await import("./stripe")

    const result = await startCheckoutSession([
      { productId: "shadowthorn-gothic-dice", quantity: 2 },
      { productId: "eye-of-sauron-resin-dice", quantity: 1 },
    ])

    expect(result).toBe("cs_test_123")
    expect(createSessionMock).toHaveBeenCalledTimes(1)

    expect(createSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        ui_mode: "embedded",
        redirect_on_completion: "never",
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "JP"],
        },
        line_items: [
          expect.objectContaining({
            quantity: 2,
            price_data: expect.objectContaining({
              currency: "usd",
              unit_amount: 4999,
              product_data: expect.objectContaining({
                name: "Shadowthorn Gothic Dice Set",
              }),
            }),
          }),
          expect.objectContaining({
            quantity: 1,
            price_data: expect.objectContaining({
              currency: "usd",
              unit_amount: 4999,
              product_data: expect.objectContaining({
                name: "Eye of Sauron Resin Dice Set",
              }),
            }),
          }),
        ],
      })
    )
  })
})
