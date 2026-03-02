import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  orders: defineTable({
    orderNumber: v.string(),
    stripeSessionId: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    stripeEventId: v.string(),
    customerEmail: v.string(),
    customerName: v.optional(v.string()),
    shippingAddress: v.object({
      line1: v.optional(v.string()),
      line2: v.optional(v.string()),
      city: v.optional(v.string()),
      state: v.optional(v.string()),
      postalCode: v.optional(v.string()),
      country: v.optional(v.string()),
    }),
    lineItems: v.array(
      v.object({
        productId: v.string(),
        productName: v.string(),
        quantity: v.number(),
        unitAmount: v.number(),
        currency: v.string(),
      })
    ),
    subtotalAmount: v.number(),
    discountAmount: v.number(),
    shippingAmount: v.number(),
    totalAmount: v.number(),
    currency: v.string(),
    couponCode: v.optional(v.string()),
    fulfillmentStatus: v.union(
      v.literal("pending_fulfillment"),
      v.literal("fulfilled"),
      v.literal("cancelled")
    ),
    trackingNumber: v.optional(v.string()),
    supplierOrderRef: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_stripeSessionId", ["stripeSessionId"])
    .index("by_fulfillmentStatus", ["fulfillmentStatus"])
    .index("by_createdAt", ["createdAt"]),

  processedEvents: defineTable({
    eventId: v.string(),
    eventType: v.string(),
    processedAt: v.number(),
    orderId: v.optional(v.id("orders")),
  }).index("by_eventId", ["eventId"]),
})
