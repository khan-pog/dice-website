import { beforeEach, describe, expect, it, vi } from "vitest"

const sendMock = vi.fn()

vi.mock("server-only", () => ({}))

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

describe("email helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RESEND_API_KEY = "re_test_key"
    process.env.ORDER_NOTIFICATIONS_FROM_EMAIL = "Arcane Dice <orders@example.com>"
  })

  it("sends order confirmation email", async () => {
    const { sendOrderConfirmationEmail } = await import("./email")

    await sendOrderConfirmationEmail({
      to: "buyer@example.com",
      orderNumber: "ARC-20260302-1001",
      lineItems: [
        {
          productName: "Shadowthorn Gothic Dice Set",
          quantity: 1,
          unitAmount: 4999,
          currency: "usd",
        },
      ],
      totalAmount: 4999,
      currency: "usd",
    })

    expect(sendMock).toHaveBeenCalledTimes(1)
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "buyer@example.com",
        subject: expect.stringContaining("Order confirmed"),
      })
    )
  })
})
