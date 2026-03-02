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
  {
    id: "sakura-spirit-resin-dice",
    name: "Sakura Spirit Resin Dice Set",
    shortDescription: "Hand-painted cherry blossom art sealed in frosted white resin. Seven-piece polyhedral set.",
    description:
      "Born from the quiet beauty of a cherry blossom bloom, the Sakura Spirit set captures the fleeting grace of spring within milky-white resin. Each die features hand-painted crimson blossoms and ink-black branches that seem to float beneath the frosted surface. Silver numbering catches the light with every roll, making this set as beautiful at the table as it is on display.",
    priceInCents: 4999,
    images: [
      "/images/products/sakura-spirit-1.jpg",
      "/images/products/sakura-spirit-2.jpg",
      "/images/products/sakura-spirit-3.jpg",
      "/images/products/sakura-spirit-4.jpg",
      "/images/products/sakura-spirit-5.jpg",
      "/images/products/sakura-spirit-6.jpg",
    ],
    tag: "New Arrival",
    features: [
      "Hand-painted cherry blossom art on every face",
      "Frosted white resin creates a dreamy depth effect",
      "Silver raised numbering for effortless readability",
      "Each die is individually handcrafted and unique",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Frosted white resin with hand-painted cherry blossom inlay and silver numbering",
    inStock: true,
  },
  {
    id: "iron-citadel-metal-dice",
    name: "Iron Citadel Metal Dice Set",
    shortDescription: "Solid brass-finished metal with deep-engraved fortress patterns. Seven-piece polyhedral set.",
    description:
      "Forged for those who demand weight behind every roll. The Iron Citadel set is machined from solid metal and finished in brushed brass-gold, with deep geometric engravings inspired by ancient fortress architecture. The satisfying heft of each die commands attention the moment it hits the table. Bold black-filled numbers cut through the intricate pattern for instant readability. These are not just dice — they are weapons.",
    priceInCents: 7999,
    images: [
      "/images/products/iron-citadel-1.jpg",
      "/images/products/iron-citadel-2.jpg",
      "/images/products/iron-citadel-3.jpg",
      "/images/products/iron-citadel-4.jpg",
      "/images/products/iron-citadel-5.jpg",
    ],
    tag: "Premium",
    features: [
      "Solid metal construction with satisfying weight and roll",
      "Deep-engraved fortress geometric pattern on every face",
      "Brushed brass-gold finish with black-filled numbering",
      "Precision-machined for balanced, fair rolls",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Solid metal with brushed brass-gold finish and black-engraved numbering",
    inStock: true,
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}
