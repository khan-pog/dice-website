import "server-only"

import { Resend } from "resend"

function getResendClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("Missing RESEND_API_KEY")
  return new Resend(key)
}

function getFromAddress() {
  const from = process.env.ORDER_NOTIFICATIONS_FROM_EMAIL
  if (!from) throw new Error("Missing ORDER_NOTIFICATIONS_FROM_EMAIL")
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

function addressToLines(address: Address): string {
  return [
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(", "),
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join("<br>")
}

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a1625;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;font-weight:600;">Arcane Dice Co.</p>
              <p style="margin:8px 0 0;font-size:24px;font-weight:700;color:#ffffff;">Premium Handcrafted Dice</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">
              ${content}

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border-top:1px solid #e4e4e7;padding-top:24px;">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0;font-size:12px;color:#a1a1aa;">Questions? Email us at <a href="mailto:orders@arcanedice.shop" style="color:#7c3aed;text-decoration:none;">orders@arcanedice.shop</a></p>
                    <p style="margin:8px 0 0;font-size:12px;color:#a1a1aa;">© ${new Date().getFullYear()} Arcane Dice Co. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
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

  const itemRows = input.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#18181b;">
          <span style="font-weight:500;">${item.productName}</span>
          <span style="color:#71717a;"> × ${item.quantity}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#18181b;text-align:right;font-weight:500;">
          ${formatMoney(item.unitAmount * item.quantity, item.currency)}
        </td>
      </tr>`
    )
    .join("")

  const content = `
    <!-- Greeting -->
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#18181b;">Order Confirmed!</p>
    <p style="margin:0 0 32px;font-size:15px;color:#52525b;line-height:1.6;">
      Thanks for your order. We've received it and will start preparing your dice right away.
    </p>

    <!-- Order number badge -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background-color:#f4f4f5;border-radius:8px;padding:16px 20px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-weight:600;">Order Number</p>
          <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#7c3aed;">${input.orderNumber}</p>
        </td>
      </tr>
    </table>

    <!-- Items table -->
    <p style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#71717a;">Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      ${itemRows}
      <tr>
        <td style="padding:16px 0 0;font-size:15px;font-weight:700;color:#18181b;">Total</td>
        <td style="padding:16px 0 0;font-size:15px;font-weight:700;color:#18181b;text-align:right;">
          ${formatMoney(input.totalAmount, input.currency)}
        </td>
      </tr>
    </table>

    <!-- What's next -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;background-color:#faf5ff;border-radius:8px;padding:20px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#7c3aed;">What happens next?</p>
          <p style="margin:0;font-size:14px;color:#52525b;line-height:1.6;">
            We'll send you another email with your tracking number once your order ships.
            Handcrafted dice are worth the wait!
          </p>
        </td>
      </tr>
    </table>`

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Order confirmed: ${input.orderNumber} ✨`,
    html: emailWrapper(content),
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

  const trackingBlock = input.trackingNumber
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="background-color:#f0fdf4;border-radius:8px;padding:20px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#16a34a;font-weight:600;">Tracking Number</p>
            <p style="margin:0;font-size:18px;font-weight:700;color:#15803d;">${input.trackingNumber}</p>
            ${input.carrier ? `<p style="margin:6px 0 0;font-size:13px;color:#52525b;">via ${input.carrier}</p>` : ""}
          </td>
        </tr>
      </table>`
    : `<p style="font-size:14px;color:#52525b;">Tracking information will be emailed to you shortly.</p>`

  const addressBlock = input.shippingAddress
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
        <tr>
          <td style="background-color:#f4f4f5;border-radius:8px;padding:20px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-weight:600;">Shipping To</p>
            <p style="margin:0;font-size:14px;color:#18181b;line-height:1.8;">${addressToLines(input.shippingAddress)}</p>
          </td>
        </tr>
      </table>`
    : ""

  const content = `
    <!-- Greeting -->
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#18181b;">Your order is on the way! 🎲</p>
    <p style="margin:0 0 32px;font-size:15px;color:#52525b;line-height:1.6;">
      Great news — order <strong style="color:#18181b;">${input.orderNumber}</strong> has been fulfilled and is heading your way.
    </p>

    ${trackingBlock}
    ${addressBlock}`

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Your dice are on the way! 🎲 ${input.orderNumber}`,
    html: emailWrapper(content),
  })
}
