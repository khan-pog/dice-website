import type Stripe from "stripe"

interface CartMetadataItem {
  productId: string
  quantity: number
}

function parseCartMetadata(raw: string | null | undefined): CartMetadataItem[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as CartMetadataItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item) =>
        typeof item?.productId === "string" && typeof item?.quantity === "number"
    )
  } catch {
    return []
  }
}

export function normalizeCheckoutToOrderPayload(input: {
  session: Stripe.Checkout.Session
  lineItems: Stripe.ApiList<Stripe.LineItem>
  stripeEventId: string
}) {
  const { session, lineItems, stripeEventId } = input
  const cartMetadata = parseCartMetadata(session.metadata?.cart)
  const discountAmount = session.total_details?.amount_discount ?? 0
  const shippingAmount = session.total_details?.amount_shipping ?? 0
  const subtotalAmount = session.amount_subtotal ?? 0
  const totalAmount = session.amount_total ?? 0
  const currency = session.currency ?? "usd"

  const normalizedLineItems = lineItems.data.map((item, index) => {
    const meta = cartMetadata[index]
    return {
      productId: meta?.productId ?? `unknown-${index + 1}`,
      productName: item.description || `Item ${index + 1}`,
      quantity: item.quantity ?? meta?.quantity ?? 1,
      unitAmount: item.price?.unit_amount ?? 0,
      currency: item.currency ?? currency,
    }
  })

  const customer = session.customer_details
  const shipping = customer?.address

  return {
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : undefined,
    stripeEventId,
    customerEmail: customer?.email ?? "unknown@example.com",
    customerName: customer?.name ?? undefined,
    shippingAddress: {
      line1: shipping?.line1 ?? undefined,
      line2: shipping?.line2 ?? undefined,
      city: shipping?.city ?? undefined,
      state: shipping?.state ?? undefined,
      postalCode: shipping?.postal_code ?? undefined,
      country: shipping?.country ?? undefined,
    },
    lineItems: normalizedLineItems,
    subtotalAmount,
    discountAmount,
    shippingAmount,
    totalAmount,
    currency,
    couponCode: (() => {
      const discount = session.discounts?.[0]
      if (!discount) return undefined
      const promo = discount.promotion_code
      if (typeof promo === "object" && promo !== null && "code" in promo) {
        return (promo as { code: string }).code
      }
      return undefined
    })(),
  }
}
