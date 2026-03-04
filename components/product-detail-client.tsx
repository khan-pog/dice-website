"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Minus, Plus, ArrowLeft, Check, Package, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/product-gallery"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import type { Product, ProductVariant } from "@/lib/products"

interface ProductDetailClientProps {
  product: Product
  initialVariantId?: string
}

export function ProductDetailClient({ product, initialVariantId }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const showOriginalStyleOption = false
  const fallbackVariantId =
    !showOriginalStyleOption && product.variants && product.variants.length > 0
      ? product.variants[0].id
      : null

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    initialVariantId ?? fallbackVariantId
  )
  const selectedVariant: ProductVariant | null = useMemo(
    () =>
      selectedVariantId
        ? (product.variants?.find((v) => v.id === selectedVariantId) ?? null)
        : null,
    [product.variants, selectedVariantId]
  )

  useEffect(() => {
    setSelectedVariantId(initialVariantId ?? fallbackVariantId)
  }, [product.id, initialVariantId, fallbackVariantId])

  const displayImages = selectedVariant ? selectedVariant.images : product.images
  const displayTag = selectedVariant !== null ? (selectedVariant.tag ?? null) : product.tag
  const displayDescription = product.description
  const displayMaterial = selectedVariant?.material ?? product.material
  const displayFeatures = selectedVariant?.features ?? product.features
  const displayPrice = selectedVariant?.priceInCents ?? product.priceInCents
  const allProductImages = useMemo(
    () =>
      product.variants && product.variants.length > 0
        ? Array.from(
            new Set([
              ...product.variants[0].images,
              ...product.variants.slice(1).flatMap((variant) =>
                variant.images[0] ? [variant.images[0]] : []
              ),
            ])
          )
        : Array.from(new Set(product.images)),
    [product.images, product.variants]
  )

  const handleAdd = () => {
    const cartProduct = selectedVariant
      ? {
          ...product,
          id: selectedVariant.id,
          name: `${product.name} — ${selectedVariant.name}`,
          images: selectedVariant.images,
          tag: selectedVariant.tag !== undefined ? (selectedVariant.tag ?? null) : product.tag,
          description: selectedVariant.description ?? product.description,
          material: selectedVariant.material ?? product.material,
          features: selectedVariant.features ?? product.features,
          priceInCents: selectedVariant.priceInCents ?? product.priceInCents,
        }
      : product
    addItem(cartProduct, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <ProductGallery
              key={selectedVariant?.id ?? "original"}
              images={displayImages}
              name={product.name}
            />

            {/* Product info */}
            <div className="flex flex-col">
              {displayTag && (
                <span className="inline-flex self-start bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-4">
                  {displayTag}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {product.name}
                {selectedVariant && (
                  <span className="text-primary"> — {selectedVariant.name}</span>
                )}
              </h1>

              <p className="text-3xl font-bold text-primary mt-4">
                {formatPrice(displayPrice)}
              </p>

              <p className="text-muted-foreground leading-relaxed mt-6">
                {displayDescription}
              </p>

              {/* Variant selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Style:{" "}
                    <span className="text-primary font-semibold">
                      {selectedVariant
                        ? selectedVariant.name
                        : (showOriginalStyleOption ? "Original" : (product.variants?.[0]?.name ?? "Style"))}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {showOriginalStyleOption && (
                      <button
                        onClick={() => setSelectedVariantId(null)}
                        className={`flex flex-col items-center gap-1.5 group`}
                        aria-label="Original"
                      >
                        <div className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedVariant === null
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        }`}>
                          <img
                            src={product.images[0]}
                            alt="Original"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          selectedVariant === null ? "text-primary" : "text-muted-foreground"
                        }`}>
                          Original
                        </span>
                      </button>
                    )}

                    {/* Variant options */}
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex flex-col items-center gap-1.5 group`}
                        aria-label={variant.name}
                      >
                        <div className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedVariant?.id === variant.id
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        }`}>
                          <img
                            src={variant.images[0]}
                            alt={variant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          selectedVariant?.id === variant.id ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {variant.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <ul className="mt-6 flex flex-col gap-2">
                {displayFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Includes */}
              <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
                <p className="text-sm font-medium text-foreground mb-1">Set Includes:</p>
                <p className="text-sm text-muted-foreground">{product.includes}</p>
              </div>

              {/* Product photo catalog */}
              {allProductImages.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm font-medium text-foreground mb-3">Photo Catalog</p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {allProductImages.map((image, index) => (
                      <div key={image} className="aspect-square overflow-hidden rounded-md border border-border">
                        <img
                          src={image}
                          alt={`${product.name} catalog image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Material */}
              <p className="text-sm text-muted-foreground mt-4">
                <span className="font-medium text-foreground">Material:</span> {displayMaterial}
              </p>

              {/* Quantity + Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 text-foreground font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart - {formatPrice(displayPrice * quantity)}
                    </>
                  )}
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: "Free shipping over $75" },
                  { icon: Shield, label: "30-day return policy" },
                  { icon: Package, label: "Secure packaging" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
