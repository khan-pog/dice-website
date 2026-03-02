import { mutationGeneric, queryGeneric } from "convex/server"
import { v } from "convex/values"

function buildOrderNumber() {
  const now = new Date()
  const y = now.getUTCFullYear().toString()
  const m = String(now.getUTCMonth() + 1).padStart(2, "0")
  const d = String(now.getUTCDate()).padStart(2, "0")
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `ARC-${y}${m}${d}-${rand}`
}

const shippingAddressValidator = v.object({
  line1: v.optional(v.string()),
  line2: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  postalCode: v.optional(v.string()),
  country: v.optional(v.string()),
})

const lineItemValidator = v.object({
  productId: v.string(),
  productName: v.string(),
  quantity: v.number(),
  unitAmount: v.number(),
  currency: v.string(),
})

export const createOrderFromCheckoutEvent = mutationGeneric({
  args: {
    stripeSessionId: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    stripeEventId: v.string(),
    customerEmail: v.string(),
    customerName: v.optional(v.string()),
    shippingAddress: shippingAddressValidator,
    lineItems: v.array(lineItemValidator),
    subtotalAmount: v.number(),
    discountAmount: v.number(),
    shippingAmount: v.number(),
    totalAmount: v.number(),
    currency: v.string(),
    couponCode: v.optional(v.string()),
  },
  returns: v.object({
    orderId: v.id("orders"),
    orderNumber: v.string(),
    created: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first()

    if (existing) {
      return {
        orderId: existing._id,
        orderNumber: existing.orderNumber,
        created: false,
      }
    }

    const now = Date.now()
    const orderNumber = buildOrderNumber()

    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      stripeSessionId: args.stripeSessionId,
      stripePaymentIntentId: args.stripePaymentIntentId,
      stripeEventId: args.stripeEventId,
      customerEmail: args.customerEmail,
      customerName: args.customerName,
      shippingAddress: args.shippingAddress,
      lineItems: args.lineItems,
      subtotalAmount: args.subtotalAmount,
      discountAmount: args.discountAmount,
      shippingAmount: args.shippingAmount,
      totalAmount: args.totalAmount,
      currency: args.currency,
      couponCode: args.couponCode,
      fulfillmentStatus: "pending_fulfillment",
      createdAt: now,
      updatedAt: now,
    })

    return { orderId, orderNumber, created: true }
  },
})

export const listPendingFulfillment = queryGeneric({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("orders"),
      orderNumber: v.string(),
      customerEmail: v.string(),
      customerName: v.optional(v.string()),
      totalAmount: v.number(),
      currency: v.string(),
      createdAt: v.number(),
      lineItems: v.array(lineItemValidator),
      shippingAddress: shippingAddressValidator,
      fulfillmentStatus: v.union(
        v.literal("pending_fulfillment"),
        v.literal("fulfilled"),
        v.literal("cancelled")
      ),
      trackingNumber: v.optional(v.string()),
      supplierOrderRef: v.optional(v.string()),
    })
  ),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("orders")
      .withIndex("by_fulfillmentStatus", (q) =>
        q.eq("fulfillmentStatus", "pending_fulfillment")
      )
      .collect()

    return rows.map((row) => ({
      _id: row._id,
      orderNumber: row.orderNumber,
      customerEmail: row.customerEmail,
      customerName: row.customerName,
      totalAmount: row.totalAmount,
      currency: row.currency,
      createdAt: row.createdAt,
      lineItems: row.lineItems,
      shippingAddress: row.shippingAddress,
      fulfillmentStatus: row.fulfillmentStatus,
      trackingNumber: row.trackingNumber,
      supplierOrderRef: row.supplierOrderRef,
    }))
  },
})

export const getOrderByStripeSessionId = queryGeneric({
  args: { stripeSessionId: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("orders"),
      orderNumber: v.string(),
      customerEmail: v.string(),
      fulfillmentStatus: v.union(
        v.literal("pending_fulfillment"),
        v.literal("fulfilled"),
        v.literal("cancelled")
      ),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first()

    if (!order) return null

    return {
      _id: order._id,
      orderNumber: order.orderNumber,
      customerEmail: order.customerEmail,
      fulfillmentStatus: order.fulfillmentStatus,
    }
  },
})

export const markOrderFulfilled = mutationGeneric({
  args: {
    orderId: v.id("orders"),
    trackingNumber: v.optional(v.string()),
    supplierOrderRef: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      fulfillmentStatus: "fulfilled",
      trackingNumber: args.trackingNumber,
      supplierOrderRef: args.supplierOrderRef,
      updatedAt: Date.now(),
    })
    return null
  },
})

export const markOrderCancelled = mutationGeneric({
  args: {
    orderId: v.id("orders"),
    reason: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      fulfillmentStatus: "cancelled",
      updatedAt: Date.now(),
      supplierOrderRef: args.reason,
    })
    return null
  },
})
