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

  return {
    title: `${product.name} | Arcane Dice Co.`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProduct(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
