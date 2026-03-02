"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { convexClient, convexFns } from "@/lib/convex"
import { sendShipmentEmail } from "@/lib/email"

export async function markFulfilledAction(formData: FormData) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const orderId = formData.get("orderId")?.toString()
  const orderNumber = formData.get("orderNumber")?.toString()
  const customerEmail = formData.get("customerEmail")?.toString()
  const trackingNumber = formData.get("trackingNumber")?.toString() || undefined
  const supplierOrderRef = formData.get("supplierOrderRef")?.toString() || undefined
  const shippingLine1 = formData.get("shippingLine1")?.toString() || undefined
  const shippingLine2 = formData.get("shippingLine2")?.toString() || undefined
  const shippingCity = formData.get("shippingCity")?.toString() || undefined
  const shippingState = formData.get("shippingState")?.toString() || undefined
  const shippingPostalCode = formData.get("shippingPostalCode")?.toString() || undefined
  const shippingCountry = formData.get("shippingCountry")?.toString() || undefined

  if (!orderId || !orderNumber || !customerEmail) {
    throw new Error("Missing order fields")
  }

  const convex = convexClient()
  await convex.mutation(convexFns.markOrderFulfilled, {
    orderId,
    trackingNumber,
    supplierOrderRef,
  })

  try {
    await sendShipmentEmail({
      to: customerEmail,
      orderNumber,
      trackingNumber,
      shippingAddress: {
        line1: shippingLine1,
        line2: shippingLine2,
        city: shippingCity,
        state: shippingState,
        postalCode: shippingPostalCode,
        country: shippingCountry,
      },
    })
  } catch (error) {
    console.error("Shipment email failed", error)
  }

  revalidatePath("/admin/fulfillment")
}
