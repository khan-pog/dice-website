import { notFound } from "next/navigation"
import { getProduct, PRODUCTS } from "@/lib/products"
import { ProductDetailClient } from "@/components/product-detail-client"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: "Product Not Found" }

  const image = product.images[0]
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      type: 'website',
      title: product.name,
      description: product.shortDescription,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProduct(id)

  if (!product) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: "Arcane Dice Co." },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.priceInCents / 100).toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://arcanedice.shop/product/${product.id}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  )
}
