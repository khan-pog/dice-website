import Link from "next/link"
import { markFulfilledAction } from "./actions"
import { convexClient, convexFns } from "@/lib/convex"
import { Button } from "@/components/ui/button"

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

type LineItem = {
  quantity: number
  productName: string
}

type Order = {
  _id: string
  orderNumber: string
  customerName?: string
  customerEmail: string
  totalAmount: number
  currency: string
  lineItems: LineItem[]
  shippingAddress?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

export default async function FulfillmentQueuePage() {
  const convex = convexClient()
  const orders: Order[] = await convex.query(convexFns.listPendingFulfillment, {})

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fulfillment Queue</h1>
            <p className="text-sm text-muted-foreground">
              Pending orders ready for supplier placement.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to storefront</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border p-6 text-sm text-muted-foreground">
            No pending orders. New paid checkouts will appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="rounded-xl border p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customerName || order.customerEmail}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatMoney(order.totalAmount, order.currency)}
                  </p>
                </div>

                <div className="mb-4 space-y-1 text-sm">
                  {order.lineItems.map((item, idx) => (
                    <p key={idx}>
                      {item.quantity} x {item.productName}
                    </p>
                  ))}
                </div>

                <form action={markFulfilledAction} className="space-y-3">
                  <input type="hidden" name="orderId" value={order._id} />
                  <input type="hidden" name="orderNumber" value={order.orderNumber} />
                  <input type="hidden" name="customerEmail" value={order.customerEmail} />
                  <input
                    type="hidden"
                    name="shippingLine1"
                    value={order.shippingAddress?.line1 ?? ""}
                  />
                  <input
                    type="hidden"
                    name="shippingLine2"
                    value={order.shippingAddress?.line2 ?? ""}
                  />
                  <input
                    type="hidden"
                    name="shippingCity"
                    value={order.shippingAddress?.city ?? ""}
                  />
                  <input
                    type="hidden"
                    name="shippingState"
                    value={order.shippingAddress?.state ?? ""}
                  />
                  <input
                    type="hidden"
                    name="shippingPostalCode"
                    value={order.shippingAddress?.postalCode ?? ""}
                  />
                  <input
                    type="hidden"
                    name="shippingCountry"
                    value={order.shippingAddress?.country ?? ""}
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      name="supplierOrderRef"
                      placeholder="Supplier order ref (optional)"
                      className="h-10 rounded-md border bg-background px-3 text-sm"
                    />
                    <input
                      name="trackingNumber"
                      placeholder="Tracking number (optional)"
                      className="h-10 rounded-md border bg-background px-3 text-sm"
                    />
                  </div>

                  <Button type="submit">Mark Fulfilled + Send Shipment Email</Button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
