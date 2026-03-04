export interface ProductVariant {
  id: string
  name: string
  images: string[]
  tag?: string | null
  description?: string
  material?: string
  features?: string[]
  priceInCents?: number
  supplierUrl?: string
  supplierVariantNote?: string
}

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
  variants?: ProductVariant[]
  supplierUrl?: string
  supplierVariantNote?: string
}

function sortImageNames(names: string[]): string[] {
  return [...names].sort((a, b) => {
    const aBase = a.toLowerCase()
    const bBase = b.toLowerCase()
    const aNum = Number((aBase.match(/^(\d+)/) ?? [])[1] ?? Number.POSITIVE_INFINITY)
    const bNum = Number((bBase.match(/^(\d+)/) ?? [])[1] ?? Number.POSITIVE_INFINITY)
    if (aNum !== bNum) return aNum - bNum

    const aStyle = Number((aBase.match(/\((\d+)\)/) ?? [])[1] ?? Number.POSITIVE_INFINITY)
    const bStyle = Number((bBase.match(/\((\d+)\)/) ?? [])[1] ?? Number.POSITIVE_INFINITY)
    if (aStyle !== bStyle) return aStyle - bStyle

    return aBase.localeCompare(bBase)
  })
}

function imagePaths(folder: string, names: string[]): string[] {
  return sortImageNames(Array.from(new Set(names))).map((name) => `/images/${folder}/${name}`)
}

function imagePathsInOrder(folder: string, names: string[]): string[] {
  return Array.from(new Set(names)).map((name) => `/images/${folder}/${name}`)
}

function jpegRange(start: number, end: number): string[] {
  return Array.from({ length: end - start + 1 }, (_, i) => `${start + i}.jpeg`)
}

export const PRODUCTS: Product[] = [
  {
    id: "metal-maze-dice",
    name: "Metal Maze Dice Set",
    shortDescription:
      "Hollow-forged metal dice with intricate intertwining maze pattern. Multi-style lineup.",
    description:
      "Built from hollow-forged metal with an open maze lattice, this set combines sculptural detail with satisfying tabletop heft. Choose from multiple color styles, each with its own finish and numbering contrast.",
    priceInCents: 7999,
    images: imagePaths("Dice Metal Maze", jpegRange(1, 6)),
    tag: "New Arrival",
    features: [
      "Hollow-forged metal lattice construction",
      "Substantial weight with balanced roll feel",
      "Open framework catches table lighting beautifully",
      "Multiple style finishes available",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Hollow-forged metal alloy",
    inStock: true,
    variants: [
      {
        id: "metal-maze-antique-gold",
        name: "Antique Gold",
        images: imagePaths("Dice Metal Maze", jpegRange(20, 25)),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-gunmetal-green",
        name: "Gunmetal Green",
        images: imagePaths("Dice Metal Maze", ["40.jpeg", "41.jpeg", "42.jpeg", "43.jpeg", "44.jpeg", "45.jpeg"]),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-obsidian-gold",
        name: "Obsidian Gold",
        images: imagePaths("Dice Metal Maze", jpegRange(60, 65)),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-silver",
        name: "Silver",
        images: imagePathsInOrder("Dice Metal Maze", [
          "82.png",
          "80.png",
          "79.png",
          "84.png",
          "81.png",
          "83.jpeg",
        ]),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-gold-white",
        name: "Gold & White",
        images: imagePathsInOrder("Dice Metal Maze", [
          "91.jpeg",
          "86.jpeg",
          "87.jpeg",
          "90.jpeg",
          "88.jpeg",
          "89.jpeg",
        ]),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-emerald-green",
        name: "Emerald Green",
        images: imagePaths("Dice Metal Maze", ["100.jpeg", "101.jpeg", "102.jpeg", "103.jpeg", "104.jpeg", "105.jpeg"]),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-arcane-purple",
        name: "Arcane Purple",
        images: imagePaths("Dice Metal Maze", ["110.jpeg", "111.jpeg"]),
        tag: "New Arrival",
      },
      {
        id: "metal-maze-sapphire-blue",
        name: "Sapphire Blue",
        images: imagePaths("Dice Metal Maze", ["112.jpeg", "113.jpeg", "114.jpeg", "115.jpeg", "116.jpeg", "117.jpeg"]),
        tag: "New Arrival",
      },
    ],
  },
  {
    id: "eye-of-sauron-resin-dice",
    name: "Eye of Sauron Resin Dice Set",
    shortDescription:
      "Crystal resin dice with embedded eye core. Includes style variants from source set.",
    description:
      "A dramatic resin set with a fiery eye centerpiece embedded in each die. This catalog entry includes multiple style variants sourced from your provided image set.",
    priceInCents: 4999,
    images: imagePaths("Eye of Sauron Resin Dice Set", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
    tag: "New Arrival",
    features: [
      "Embedded eye centerpiece with layered depth",
      "High-contrast numbering for readability",
      "Hand-finished resin surfaces",
      "Multiple style variants available",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Transparent cast resin",
    inStock: true,
    variants: [
      {
        id: "eye-of-sauron-style-a",
        name: "Style A",
        images: imagePaths("Eye of Sauron Resin Dice Set", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg"]),
      },
      {
        id: "eye-of-sauron-style-b",
        name: "Style B",
        images: imagePaths("Eye of Sauron Resin Dice Set", ["9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg"]),
      },
    ],
  },
  {
    id: "shadowthorn-gothic-dice",
    name: "Gothic Dice Set",
    shortDescription:
      "Dark gothic-themed black resin with gold numbering. Seven-piece polyhedral set.",
    description:
      "A gothic-forward resin set with deep black sculpted faces and rich gold numbering. This listing keeps only the black-and-gold variant from your source images.",
    priceInCents: 4999,
    images: imagePaths("Gothic", ["1 (6).jpeg", "2 (6).jpeg", "3 (6).jpeg", "4 (6).jpeg", "5 (6).jpeg", "6 (6).jpeg"]),
    tag: "Best Seller",
    features: [
      "Gothic visual theme",
      "High-contrast numbering",
      "Black-and-gold finish",
      "Balanced for tabletop play",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Cast resin",
    inStock: true,
  },
  {
    id: "honeybee-garden-dice",
    name: "Green Cherry Blossom Dice Set",
    shortDescription:
      "Green cherry blossom-themed resin dice sourced from the provided folder, with styles.",
    description:
      "A nature-inspired resin set with blossom motifs and saturated green tones. Style variants are grouped directly from your Green cherry blosm files.",
    priceInCents: 5499,
    images: imagePaths("Green cherry blosm", ["1 (2).jpeg", "2 (2).jpeg", "3 (2).jpeg", "4 (2).jpeg", "5 (2).jpeg", "6 (2).jpeg"]),
    tag: "New Arrival",
    features: [
      "Cherry blossom themed artwork",
      "Green-toned resin body",
      "Grouped style variants from source images",
      "Hand-finished look and feel",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Pigmented cast resin",
    inStock: true,
    variants: [
      {
        id: "green-cherry-style-2",
        name: "Style 2",
        images: imagePaths("Green cherry blosm", [
          "1 (2).jpeg",
          "2 (2).jpeg",
          "3 (2).jpeg",
          "4 (2).jpeg",
          "5 (2).jpeg",
          "6 (2).jpeg",
          "7 (2).jpeg",
          "8 (2).jpeg",
          "11 (2).jpeg",
          "12 (2).jpeg",
          "13 (2).jpeg",
          "14 (2).jpeg",
          "15 (2).jpeg",
          "16 (2).jpeg",
        ]),
      },
      {
        id: "green-cherry-style-5",
        name: "Style 5",
        images: imagePaths("Green cherry blosm", [
          "9 (5).jpeg",
          "10 (5).jpeg",
          "11 (5).jpeg",
          "12 (5).jpeg",
          "13 (5).jpeg",
          "14 (5).jpeg",
        ]),
      },
      {
        id: "green-cherry-style-classic",
        name: "Classic",
        images: imagePaths("Green cherry blosm", ["17.jpeg"]),
      },
    ],
  },
  {
    id: "white-cherry-blossom-dice",
    name: "White Cherry Blossom Dice Set",
    shortDescription:
      "White cherry blossom resin set with grouped style options from your provided folder.",
    description:
      "A softer blossom-themed resin lineup in white/pale tones. Variants are grouped by the style markers present in the source filenames.",
    priceInCents: 5499,
    images: imagePaths("White cherry blosm", ["1 (5).jpeg", "2 (5).jpeg", "3 (5).jpeg", "4 (5).jpeg", "5 (5).jpeg", "6 (5).jpeg"]),
    tag: "New Arrival",
    features: [
      "White blossom-inspired theme",
      "Crisp number contrast",
      "Style variants grouped from provided files",
      "Balanced polyhedral set",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Pigmented cast resin",
    inStock: true,
    variants: [
      {
        id: "white-cherry-style-5",
        name: "Silver Numbers",
        images: imagePaths("White cherry blosm", [
          "1 (5).jpeg",
          "2 (5).jpeg",
          "3 (5).jpeg",
          "4 (5).jpeg",
          "5 (5).jpeg",
          "7 (5).jpeg",
        ]),
      },
      {
        id: "white-cherry-style-2",
        name: "Golden Numbers",
        images: imagePaths("White cherry blosm", [
          "10 (2).jpeg",
        ]),
      },
    ],
  },
  {
    id: "feline-familiar-holographic-dice",
    name: "Metal Cat Dice Set",
    shortDescription:
      "Cat-themed metal dice with multiple style variants from your Metal cat source folder.",
    description:
      "A playful cat-motif metal set with heavy roll feel and multiple style groupings built from your provided images.",
    priceInCents: 7999,
    images: imagePaths("Metal cat", ["1 (4).jpeg", "2 (4).jpeg", "3 (4).jpeg", "4 (4).jpeg", "5 (4).jpeg", "6 (4).jpeg"]),
    tag: "Premium",
    features: [
      "Metal construction with satisfying weight",
      "Cat motif styling",
      "Multiple image-group style variants",
      "Collector-friendly visual detail",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Metal alloy",
    inStock: true,
    variants: [
      {
        id: "metal-cat-style-4",
        name: "Style 4",
        images: imagePaths("Metal cat", [
          "1 (4).jpeg",
          "2 (4).jpeg",
          "3 (4).jpeg",
          "4 (4).jpeg",
          "5 (4).jpeg",
          "6 (4).jpeg",
          "7 (4).jpeg",
          "8 (4).jpeg",
          "9 (4).jpeg",
          "10 (4).jpeg",
          "11 (4).jpeg",
          "12 (4).jpeg",
          "13 (4).jpeg",
          "14 (4).jpeg",
          "15 (4).jpeg",
          "16 (4).jpeg",
        ]),
      },
      {
        id: "metal-cat-style-2",
        name: "Style 2",
        images: imagePaths("Metal cat", ["18 (2).jpeg", "19 (2).jpeg", "20 (2).jpeg", "21 (2).jpeg", "22 (2).jpeg", "23 (2).jpeg"]),
      },
      {
        id: "metal-cat-style-3",
        name: "Style 3",
        images: imagePaths("Metal cat", ["17 (3).jpeg"]),
      },
      {
        id: "metal-cat-classic",
        name: "Classic",
        images: imagePaths("Metal cat", ["24.jpeg", "25.jpeg", "26.jpeg", "27.jpeg"]),
      },
    ],
  },
  {
    id: "mech-core-blue-steel-dice",
    name: "Metal Cyber Dice Set",
    shortDescription:
      "Tech-inspired metal dice lineup sourced from your Metal Cyber folder with styles.",
    description:
      "A cyber-themed metal set built from the provided Metal Cyber assets, grouped into style variants based on filename markers.",
    priceInCents: 7999,
    images: imagePaths("Metal Cyber", ["1 (3).jpeg", "2 (3).jpeg", "3 (3).jpeg", "4 (3).jpeg", "5 (3).jpeg", "6 (3).jpeg"]),
    tag: "Premium",
    features: [
      "Cyber-industrial metal styling",
      "Heavy metal feel and crisp edges",
      "Grouped multi-style variants",
      "Distinct high-contrast visuals",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Metal alloy",
    inStock: true,
    variants: [
      {
        id: "metal-cyber-style-3",
        name: "Style 3",
        images: imagePaths("Metal Cyber", [
          "1 (3).jpeg",
          "2 (3).jpeg",
          "3 (3).jpeg",
          "4 (3).jpeg",
          "5 (3).jpeg",
          "6 (3).jpeg",
          "7 (3).jpeg",
          "8 (3).jpeg",
          "9 (3).jpeg",
          "10 (3).jpeg",
          "11 (3).jpeg",
          "12 (3).jpeg",
          "13 (3).jpeg",
          "14 (3).jpeg",
          "15 (3).jpeg",
          "16 (3).jpeg",
        ]),
      },
      {
        id: "metal-cyber-style-2",
        name: "Style 2",
        images: imagePaths("Metal Cyber", ["17 (2).jpeg"]),
      },
      {
        id: "metal-cyber-classic",
        name: "Classic",
        images: imagePaths("Metal Cyber", ["18.jpeg", "19.jpeg", "20.jpeg", "21.jpeg", "22.jpeg", "23.jpeg"]),
      },
    ],
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductByVariantId(
  variantId: string
): { product: Product; variant: ProductVariant } | undefined {
  for (const product of PRODUCTS) {
    if (product.variants) {
      const variant = product.variants.find((v) => v.id === variantId)
      if (variant) return { product, variant }
    }
  }
  return undefined
}

export function resolveProductForCheckout(productId: string): Product | undefined {
  const direct = getProduct(productId)
  if (direct) return direct

  const result = getProductByVariantId(productId)
  if (result) {
    const { product, variant } = result
    return {
      ...product,
      id: variant.id,
      name: `${product.name} — ${variant.name}`,
      images: variant.images,
      tag: variant.tag !== undefined ? (variant.tag ?? null) : product.tag,
      description: variant.description ?? product.description,
      material: variant.material ?? product.material,
      features: variant.features ?? product.features,
      priceInCents: variant.priceInCents ?? product.priceInCents,
    }
  }
  return undefined
}

export function resolveSupplierInfo(productId: string): { url?: string; variantNote?: string } {
  const direct = getProduct(productId)
  if (direct) {
    return {
      url: direct.supplierUrl || undefined,
      variantNote: direct.supplierVariantNote || undefined,
    }
  }

  const result = getProductByVariantId(productId)
  if (result) {
    return {
      url: result.variant.supplierUrl || result.product.supplierUrl || undefined,
      variantNote: result.variant.supplierVariantNote || result.product.supplierVariantNote || undefined,
    }
  }
  return {}
}

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}
