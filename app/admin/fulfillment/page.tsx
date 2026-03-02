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
  unitAmount: number
  currency: string
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

function ShippingAddress({ address }: { address: Order["shippingAddress"] }) {
  if (!address) return <p className="text-muted-foreground italic">No address on file</p>
  const parts = [
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(", "),
    address.postalCode,
    address.country,
  ].filter(Boolean)
  if (parts.length === 0) return <p className="text-muted-foreground italic">No address on file</p>
  return (
    <div className="space-y-0.5">
      {parts.map((part, i) => (
        <p key={i}>{part}</p>
      ))}
    </div>
  )
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
              {orders.length} pending {orders.length === 1 ? "order" : "orders"} ready for supplier placement.
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
              <div key={order._id} className="rounded-xl border p-5 space-y-4">

                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-lg">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order._id.length).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xl font-bold">
                    {formatMoney(order.totalAmount, order.currency)}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  {/* Customer info */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Customer</p>
                    <p className="font-medium">{order.customerName || "—"}</p>
                    <p className="text-muted-foreground">{order.customerEmail}</p>
                  </div>

                  {/* Shipping address */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ship To</p>
                    <ShippingAddress address={order.shippingAddress} />
                  </div>
                </div>

                {/* Line items */}
                <div className="space-y-1 text-sm border-t pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Items</p>
                  {order.lineItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantity} × {item.productName}</span>
                      <span className="text-muted-foreground">
                        {formatMoney(item.unitAmount * item.quantity, item.currency)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fulfillment form */}
                <form action={markFulfilledAction} className="space-y-3 border-t pt-3">
                  <input type="hidden" name="orderId" value={order._id} />
                  <input type="hidden" name="orderNumber" value={order.orderNumber} />
                  <input type="hidden" name="customerEmail" value={order.customerEmail} />
                  <input type="hidden" name="shippingLine1" value={order.shippingAddress?.line1 ?? ""} />
                  <input type="hidden" name="shippingLine2" value={order.shippingAddress?.line2 ?? ""} />
                  <input type="hidden" name="shippingCity" value={order.shippingAddress?.city ?? ""} />
                  <input type="hidden" name="shippingState" value={order.shippingAddress?.state ?? ""} />
                  <input type="hidden" name="shippingPostalCode" value={order.shippingAddress?.postalCode ?? ""} />
                  <input type="hidden" name="shippingCountry" value={order.shippingAddress?.country ?? ""} />

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
