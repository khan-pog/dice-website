export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  priceInCents: number
  images: string[]
  tag: string | null
  features: string[]
  includes: string
  material: string
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "shadowthorn-gothic-dice",
    name: "Shadowthorn Gothic Dice Set",
    shortDescription: "Hand-sculpted black resin with gold numbering. Seven-piece polyhedral set.",
    description:
      "Forged in darkness and crowned with gold, the Shadowthorn Gothic set features intricate thorn-patterned faces hand-sculpted into deep black resin. Each number gleams in antique gold, making every roll feel like summoning ancient power. The perfect centerpiece for any serious tabletop collection.",
    priceInCents: 4999,
    images: [
      "/images/products/shadowthorn-1.jpg",
      "/images/products/shadowthorn-2.jpg",
      "/images/products/shadowthorn-3.jpg",
      "/images/products/shadowthorn-4.jpg",
      "/images/products/shadowthorn-5.jpg",
    ],
    tag: "Best Seller",
    features: [
      "Hand-sculpted thorn pattern on every face",
      "Antique gold numbering for easy readability",
      "Precision-balanced for fair rolls",
      "Premium black resin construction",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "High-density black resin with gold-fill numbering",
    inStock: true,
  },
  {
    id: "eye-of-sauron-resin-dice",
    name: "Eye of Sauron Resin Dice Set",
    shortDescription: "Crystal-clear resin with fiery red eye encased within. Seven-piece polyhedral set.",
    description:
      "Gaze into the Eye and let fate decide. This stunning set encases a vivid, fiery eye within crystal-clear resin, creating a mesmerizing depth effect that catches light from every angle. Bold red numbering ensures readability while the inner eye watches your every roll. An absolute must-have for fantasy enthusiasts.",
    priceInCents: 4999,
    images: [
      "/images/products/eye-of-sauron-1.jpg",
      "/images/products/eye-of-sauron-2.jpg",
      "/images/products/eye-of-sauron-3.jpg",
      "/images/products/eye-of-sauron-4.jpg",
      "/images/products/eye-of-sauron-5.jpg",
    ],
    tag: "New Arrival",
    features: [
      "Crystal-clear resin with encased fiery eye design",
      "Multi-layered depth effect catches light beautifully",
      "Bold red numbering for easy readability",
      "Each die is individually handcrafted",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Crystal-clear resin with embedded eye design and red numbering",
    inStock: true,
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}
