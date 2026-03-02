import { mutationGeneric } from "convex/server"
import { v } from "convex/values"

export const reserveEventProcessing = mutationGeneric({
  args: {
    eventId: v.string(),
    eventType: v.string(),
  },
  returns: v.object({
    alreadyProcessed: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("processedEvents")
      .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
      .first()

    if (existing) {
      return { alreadyProcessed: true }
    }

    await ctx.db.insert("processedEvents", {
      eventId: args.eventId,
      eventType: args.eventType,
      processedAt: Date.now(),
    })

    return { alreadyProcessed: false }
  },
})

export const completeEventProcessing = mutationGeneric({
  args: {
    eventId: v.string(),
    orderId: v.optional(v.id("orders")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("processedEvents")
      .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
      .first()

    if (!existing) {
      return null
    }

    await ctx.db.patch(existing._id, {
      orderId: args.orderId,
      processedAt: Date.now(),
    })

    return null
  },
})
