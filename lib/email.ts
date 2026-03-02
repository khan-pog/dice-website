import "server-only"

import { Resend } from "resend"

function getResendClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error("Missing RESEND_API_KEY")
  }
  return new Resend(key)
}

function getFromAddress() {
  const from = process.env.ORDER_NOTIFICATIONS_FROM_EMAIL
  if (!from) {
    throw new Error("Missing ORDER_NOTIFICATIONS_FROM_EMAIL")
  }
  return from
}

interface OrderLineItem {
  productName: string
  quantity: number
  unitAmount: number
  currency: string
}

interface Address {
  line1?: string
  line2?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

function addressToHtml(address: Address) {
  const parts = [
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(", "),
    address.postalCode,
    address.country,
  ].filter(Boolean)

  return parts.join("<br/>")
}

export async function sendOrderConfirmationEmail(input: {
  to: string
  orderNumber: string
  lineItems: OrderLineItem[]
  totalAmount: number
  currency: string
}) {
  const resend = getResendClient()
  const from = getFromAddress()

  const rows = input.lineItems
    .map(
      (item) =>
        `<li>${item.quantity} x ${item.productName} - ${formatMoney(
          item.unitAmount * item.quantity,
          item.currency
        )}</li>`
    )
    .join("")

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Order confirmed: ${input.orderNumber}`,
    html: `
      <h2>Thanks for your order!</h2>
      <p>Your order <strong>${input.orderNumber}</strong> has been received.</p>
      <ul>${rows}</ul>
      <p><strong>Total:</strong> ${formatMoney(input.totalAmount, input.currency)}</p>
      <p>We'll send shipping updates as soon as your order is fulfilled.</p>
    `,
  })
}

export async function sendShipmentEmail(input: {
  to: string
  orderNumber: string
  trackingNumber?: string
  carrier?: string
  shippingAddress?: Address
}) {
  const resend = getResendClient()
  const from = getFromAddress()
  const tracking = input.trackingNumber
    ? `<p><strong>Tracking:</strong> ${input.trackingNumber}</p>`
    : "<p>Tracking information will be shared soon.</p>"
  const carrier = input.carrier ? `<p><strong>Carrier:</strong> ${input.carrier}</p>` : ""
  const address = input.shippingAddress
    ? `<p><strong>Shipping to:</strong><br/>${addressToHtml(input.shippingAddress)}</p>`
    : ""

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Your order has shipped: ${input.orderNumber}`,
    html: `
      <h2>Your Arcane Dice order is on the way</h2>
      <p>Order <strong>${input.orderNumber}</strong> is now fulfilled.</p>
      ${carrier}
      ${tracking}
      ${address}
      <p>Thank you for shopping with Arcane Dice Co.</p>
    `,
  })
}
