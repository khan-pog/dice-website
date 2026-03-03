import { notFound } from "next/navigation"
import { getProduct, getProductByVariantId, PRODUCTS } from "@/lib/products"
import { ProductDetailClient } from "@/components/product-detail-client"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const params: { id: string }[] = []
  for (const product of PRODUCTS) {
    params.push({ id: product.id })
    if (product.variants) {
      for (const variant of product.variants) {
        params.push({ id: variant.id })
      }
    }
  }
  return params
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  let product = getProduct(id)
  let variantName: string | undefined

  if (!product) {
    const result = getProductByVariantId(id)
    if (!result) return { title: "Product Not Found" }
    product = result.product
    variantName = result.variant.name
  }

  const displayName = variantName ? `${product.name} — ${variantName}` : product.name
  const image = product.images[0]
  return {
    title: displayName,
    description: product.shortDescription,
    openGraph: {
      type: 'website',
      title: displayName,
      description: product.shortDescription,
      images: [{ url: image, alt: displayName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayName,
      description: product.shortDescription,
      images: [image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  let product = getProduct(id)
  let initialVariantId: string | undefined

  if (!product) {
    const result = getProductByVariantId(id)
    if (!result) notFound()
    product = result.product
    initialVariantId = result.variant.id
  }

  const activeVariant = initialVariantId
    ? product.variants?.find((v) => v.id === initialVariantId)
    : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: activeVariant ? `${product.name} — ${activeVariant.name}` : product.name,
    description: activeVariant?.description ?? product.description,
    image: activeVariant ? activeVariant.images : product.images,
    sku: activeVariant ? activeVariant.id : product.id,
    brand: { "@type": "Brand", name: "Arcane Dice Co." },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: ((activeVariant?.priceInCents ?? product.priceInCents) / 100).toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://arcanedice.shop/product/${activeVariant ? activeVariant.id : product.id}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} initialVariantId={initialVariantId} />
    </>
  )
}
