import { ConvexHttpClient } from "convex/browser"
import { makeFunctionReference } from "convex/server"

function getConvexUrl() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL")
  }
  return url
}

export function convexClient() {
  return new ConvexHttpClient(getConvexUrl())
}

export const convexFns = {
  reserveEventProcessing: makeFunctionReference<"mutation">(
    "events:reserveEventProcessing"
  ),
  completeEventProcessing: makeFunctionReference<"mutation">(
    "events:completeEventProcessing"
  ),
  createOrderFromCheckoutEvent: makeFunctionReference<"mutation">(
    "orders:createOrderFromCheckoutEvent"
  ),
  listPendingFulfillment: makeFunctionReference<"query">(
    "orders:listPendingFulfillment"
  ),
  markOrderFulfilled: makeFunctionReference<"mutation">(
    "orders:markOrderFulfilled"
  ),
}
