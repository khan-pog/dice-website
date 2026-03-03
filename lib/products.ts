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
    supplierUrl: "https://www.aliexpress.com/item/1005008614369509.html?spm=a2g0o.store_pc_home.promoteWysiwyg_2011405645204.1005008614369509",
    supplierVariantNote: "Select colour: MT-01",
  },
  {
    id: "eye-of-sauron-resin-dice",
    name: "Eye of Sauron Resin Dice Set",
    shortDescription: "Crystal-clear resin with fiery red eye encased within. Available in 10 colorways. Seven-piece polyhedral set.",
    description:
      "Gaze into the Eye and let fate decide. This stunning set encases a vivid, fiery eye within crystal-clear resin, creating a mesmerizing depth effect that catches light from every angle. Bold red numbering ensures readability while the inner eye watches your every roll. An absolute must-have for fantasy enthusiasts.",
    priceInCents: 4999,
    images: [
      "/images/products/eye-of-sauron-1.jpeg",
      "/images/products/eye-of-sauron-2.jpeg",
      "/images/products/eye-of-sauron-3.jpeg",
      "/images/products/eye-of-sauron-4.jpeg",
      "/images/products/eye-of-sauron-5.jpeg",
      "/images/products/eye-of-sauron-6.jpeg",
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
    supplierUrl: "",
    variants: [
      {
        id: "sauron-crimson-gold-dice",
        name: "Crimson Gold",
        images: [
          "/images/products/sauron-crimson-gold-1.jpeg",
          "/images/products/sauron-crimson-gold-2.jpeg",
          "/images/products/sauron-crimson-gold-3.jpeg",
          "/images/products/sauron-crimson-gold-4.jpeg",
          "/images/products/sauron-crimson-gold-5.jpeg",
          "/images/products/sauron-crimson-gold-6.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Bathed in the fires of Mount Doom, the Crimson Gold set wraps the all-seeing eye in layers of deep red resin that glows like molten lava. Rich gold numbering rises from every face, giving each roll a regal, otherworldly presence. The eye watches from within — daring you to roll again.",
        material: "Deep crimson resin with embedded eye design and gold numbering",
        features: [
          "Deep crimson resin with embedded fiery eye design",
          "Gold numbering for a regal, high-contrast look",
          "Multi-layered depth effect with inner glow",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-bloodfire-dice",
        name: "Bloodfire",
        images: [
          "/images/products/sauron-bloodfire-1.jpeg",
          "/images/products/sauron-bloodfire-2.jpeg",
          "/images/products/sauron-bloodfire-3.jpeg",
          "/images/products/sauron-bloodfire-4.jpeg",
          "/images/products/sauron-bloodfire-5.jpeg",
          "/images/products/sauron-bloodfire-6.jpeg",
        ],
        tag: null,
        description:
          "The Bloodfire set burns with a softer, more sinister glow. Rose-tinted red resin cradles the fiery eye within, while crisp silver numbering cuts through the warmth like moonlight through flame. A set that balances beauty with menace at your gaming table.",
        material: "Rose-red resin with embedded eye design and silver numbering",
        features: [
          "Rose-red resin with embedded fiery eye design",
          "Silver numbering for crisp readability",
          "Warm-toned depth effect with inner fire glow",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-shadow-dice",
        name: "Shadow",
        images: [
          "/images/products/sauron-shadow-1.jpeg",
          "/images/products/sauron-shadow-2.jpeg",
          "/images/products/sauron-shadow-3.jpeg",
          "/images/products/sauron-shadow-4.jpeg",
          "/images/products/sauron-shadow-5.jpeg",
          "/images/products/sauron-shadow-6.jpeg",
        ],
        tag: null,
        description:
          "The purest expression of the all-seeing eye. Crystal-clear resin allows the fiery eye to blaze from within without distortion, while polished silver numbering adds an elegant contrast. The Shadow set is for those who want the eye to speak for itself — vivid, unfiltered, and unmistakable.",
        material: "Crystal-clear resin with embedded eye design and silver numbering",
        features: [
          "Crystal-clear resin for maximum eye visibility",
          "Silver numbering for clean, elegant contrast",
          "Vivid fiery eye design with unmatched depth",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-sapphire-flame-dice",
        name: "Sapphire Flame",
        images: [
          "/images/products/sauron-sapphire-flame-1.jpeg",
          "/images/products/sauron-sapphire-flame-2.jpeg",
          "/images/products/sauron-sapphire-flame-3.jpeg",
          "/images/products/sauron-sapphire-flame-4.jpeg",
          "/images/products/sauron-sapphire-flame-5.jpeg",
          "/images/products/sauron-sapphire-flame-6.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Fire meets ice in the Sapphire Flame set. Deep, oceanic blue resin surrounds the burning eye, creating a dramatic contrast between cold and fury. Bold red numbering blazes across every face, making each roll feel like commanding elemental forces at war.",
        material: "Deep sapphire blue resin with embedded eye design and red numbering",
        features: [
          "Deep sapphire blue resin with embedded fiery eye",
          "Bold red numbering for dramatic fire-and-ice contrast",
          "Oceanic depth effect with burning inner glow",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-sapphire-frost-dice",
        name: "Sapphire Frost",
        images: [
          "/images/products/sauron-sapphire-frost-1.jpeg",
          "/images/products/sauron-sapphire-frost-2.jpeg",
          "/images/products/sauron-sapphire-frost-3.jpeg",
          "/images/products/sauron-sapphire-frost-4.jpeg",
          "/images/products/sauron-sapphire-frost-5.jpeg",
          "/images/products/sauron-sapphire-frost-6.jpeg",
        ],
        tag: null,
        description:
          "Cool sapphire resin encases the all-seeing eye in a frozen ocean of blue, while silver numbering glistens like frost on glass. The Sapphire Frost set offers a refined, icy elegance — the eye still burns within, but the blue depths keep its fury beautifully contained.",
        material: "Deep sapphire blue resin with embedded eye design and silver numbering",
        features: [
          "Deep sapphire blue resin with embedded fiery eye",
          "Silver numbering for an icy, refined contrast",
          "Frozen depth effect with burning inner core",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-amethyst-frost-dice",
        name: "Amethyst Frost",
        images: [
          "/images/products/sauron-amethyst-frost-1.jpeg",
          "/images/products/sauron-amethyst-frost-2.jpeg",
          "/images/products/sauron-amethyst-frost-3.jpeg",
          "/images/products/sauron-amethyst-frost-4.jpeg",
          "/images/products/sauron-amethyst-frost-5.jpeg",
          "/images/products/sauron-amethyst-frost-6.jpeg",
        ],
        tag: null,
        description:
          "Cloaked in royal purple, the Amethyst Frost set transforms the all-seeing eye into something arcane and mystical. Rich amethyst resin swirls around the burning core, while silver numbering gleams like starlight. Perfect for spellcasters, warlocks, and anyone drawn to dark magic.",
        material: "Rich amethyst purple resin with embedded eye design and silver numbering",
        features: [
          "Rich amethyst purple resin with embedded fiery eye",
          "Silver numbering for a mystical, arcane aesthetic",
          "Royal purple depth effect with burning inner glow",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-amethyst-gold-dice",
        name: "Amethyst Gold",
        images: [
          "/images/products/sauron-amethyst-gold-1.jpeg",
          "/images/products/sauron-amethyst-gold-2.jpeg",
          "/images/products/sauron-amethyst-gold-3.jpeg",
          "/images/products/sauron-amethyst-gold-4.jpeg",
          "/images/products/sauron-amethyst-gold-5.jpeg",
          "/images/products/sauron-amethyst-gold-6.jpeg",
        ],
        tag: "Premium",
        description:
          "The Amethyst Gold set marries the mystic depths of purple resin with the opulence of gold. The fiery eye smolders within amethyst walls while golden numbers crown every face — a set fit for a dark lord's throne room. Regal, powerful, and impossible to ignore.",
        material: "Rich amethyst purple resin with embedded eye design and gold numbering",
        features: [
          "Rich amethyst purple resin with embedded fiery eye",
          "Gold numbering for a regal, opulent finish",
          "Royal purple and gold color palette",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-amethyst-flame-dice",
        name: "Amethyst Flame",
        images: [
          "/images/products/sauron-amethyst-flame-1.jpeg",
          "/images/products/sauron-amethyst-flame-2.jpeg",
          "/images/products/sauron-amethyst-flame-3.jpeg",
          "/images/products/sauron-amethyst-flame-4.jpeg",
          "/images/products/sauron-amethyst-flame-5.jpeg",
        ],
        tag: null,
        description:
          "Where purple meets fire. The Amethyst Flame set encases the burning eye in deep violet resin while bold red numbering erupts across every face like embers in a dark sky. The result is a set that feels both mystical and ferocious — perfect for characters who wield both magic and fury.",
        material: "Rich amethyst purple resin with embedded eye design and red numbering",
        features: [
          "Rich amethyst purple resin with embedded fiery eye",
          "Bold red numbering for a fiery, dramatic contrast",
          "Deep violet and flame color combination",
          "Each die is individually handcrafted",
        ],
      },
      {
        id: "sauron-onyx-gold-dice",
        name: "Onyx Gold",
        images: [
          "/images/products/sauron-onyx-gold-1.jpeg",
          "/images/products/sauron-onyx-gold-2.jpeg",
          "/images/products/sauron-onyx-gold-3.jpeg",
          "/images/products/sauron-onyx-gold-4.jpeg",
          "/images/products/sauron-onyx-gold-5.jpeg",
        ],
        tag: null,
        description:
          "The definitive dark lord set. Onyx-black resin swallows the light around the fiery eye, creating an abyss-like depth that draws you in. Gold numbering glimmers from the darkness like ancient script etched into shadow. The Onyx Gold set commands reverence with every roll.",
        material: "Deep onyx-dark resin with embedded eye design and gold numbering",
        features: [
          "Deep onyx-dark resin with embedded fiery eye",
          "Gold numbering for a dark, luxurious contrast",
          "Abyss-like depth effect with glowing inner eye",
          "Each die is individually handcrafted",
        ],
      },
    ],
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
    supplierUrl: "",
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
    supplierUrl: "",
  },
  {
    id: "honeybee-garden-dice",
    name: "Honeybee Garden Resin Dice Set",
    shortDescription: "Emerald green resin with hand-painted bees and wildflowers. Seven-piece polyhedral set.",
    description:
      "A love letter to nature's hardest workers. The Honeybee Garden set features emerald green resin adorned with hand-painted honeybees and delicate wildflowers on every face. Warm gold numbering completes the pastoral charm. Each die feels like a tiny piece of a sun-dappled meadow — perfect for druids, rangers, and nature lovers.",
    priceInCents: 5499,
    images: [
      "/images/products/honeybee-garden-1.jpeg",
      "/images/products/honeybee-garden-2.jpeg",
      "/images/products/honeybee-garden-3.jpeg",
    ],
    tag: "New Arrival",
    features: [
      "Hand-painted honeybee and wildflower art on every face",
      "Shimmering emerald green resin with pearlescent finish",
      "Warm gold numbering for easy readability",
      "Each die is individually handcrafted and unique",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Emerald green pearlescent resin with hand-painted bee and floral inlay and gold numbering",
    inStock: true,
    supplierUrl: "",
  },
  {
    id: "mech-core-blue-steel-dice",
    name: "Mech Core Metal Dice Set",
    shortDescription: "Precision-machined solid metal with glowing circuit-line engravings. Available in 6 colorways. Seven-piece polyhedral set.",
    description:
      "Engineered for the future. The Blue Steel set features precision-machined gunmetal dice etched with luminous blue circuit-line patterns that pulse across every face. The sci-fi aesthetic and heavy metal construction make every roll feel like activating a mech's targeting system. Built for technomancers and sci-fi commanders.",
    priceInCents: 7999,
    images: [
      "/images/products/mech-core-blue-steel-1.jpeg",
      "/images/products/mech-core-blue-steel-2.jpeg",
    ],
    tag: "Premium",
    features: [
      "Solid metal construction with satisfying heft",
      "Glowing blue circuit-line engravings on every face",
      "Gunmetal finish with sci-fi industrial aesthetic",
      "Precision-machined for balanced, fair rolls",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Solid gunmetal with blue enamel circuit-line engravings",
    inStock: true,
    supplierUrl: "",
    variants: [
      {
        id: "mech-core-toxic-dice",
        name: "Toxic",
        images: [
          "/images/products/mech-core-toxic-1.jpeg",
          "/images/products/mech-core-toxic-2.jpeg",
        ],
        tag: null,
        description:
          "Radioactive energy courses through every face. The Toxic set combines dark gunmetal construction with vivid green circuit-line engravings that glow like contaminated tech. The heavy, industrial feel makes every roll a statement — perfect for post-apocalyptic campaigns and cyberpunk settings.",
        material: "Solid dark gunmetal with green enamel circuit-line engravings",
        features: [
          "Solid metal construction with satisfying heft",
          "Vivid toxic green circuit-line engravings",
          "Dark gunmetal finish with industrial aesthetic",
          "Precision-machined for balanced, fair rolls",
        ],
      },
      {
        id: "mech-core-silver-circuit-dice",
        name: "Silver Circuit",
        images: [
          "/images/products/mech-core-silver-circuit-1.jpeg",
          "/images/products/mech-core-silver-circuit-2.jpeg",
        ],
        tag: null,
        description:
          "Sleek, bright, and battle-ready. The Silver Circuit set features brushed silver metal with green-tinted circuit engravings that evoke advanced alien technology. Lighter in tone than its gunmetal siblings, this set brings a clean, futuristic look to any sci-fi or cyberpunk tabletop session.",
        material: "Solid brushed silver metal with green enamel circuit-line engravings",
        features: [
          "Solid metal construction with satisfying heft",
          "Green circuit-line engravings on brushed silver",
          "Bright, futuristic aesthetic with clean lines",
          "Precision-machined for balanced, fair rolls",
        ],
      },
      {
        id: "mech-core-ember-dice",
        name: "Ember",
        images: [
          "/images/products/mech-core-ember-1.jpeg",
          "/images/products/mech-core-ember-2.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Forged in the heart of a dying star. The Ember set pairs matte black metal with smoldering orange circuit-line engravings that look like cooling magma flowing through circuitry. The darkest and most aggressive of the Mech Core line — built for those who play with fire.",
        material: "Solid matte black metal with orange enamel circuit-line engravings",
        features: [
          "Solid metal construction with satisfying heft",
          "Glowing orange circuit-line engravings on matte black",
          "Aggressive, volcanic industrial aesthetic",
          "Precision-machined for balanced, fair rolls",
        ],
      },
      {
        id: "mech-core-gold-matrix-dice",
        name: "Gold Matrix",
        images: [
          "/images/products/mech-core-gold-matrix-1.jpeg",
          "/images/products/mech-core-gold-matrix-2.jpeg",
        ],
        tag: "Premium",
        priceInCents: 8999,
        description:
          "Luxury meets circuitry. The Gold Matrix set shines in polished gold with emerald green circuit-line engravings that weave across every face like an ancient alien motherboard. The most opulent of the Mech Core line, this set is for commanders who demand both power and style.",
        material: "Solid polished gold metal with green enamel circuit-line engravings",
        features: [
          "Solid metal construction with satisfying heft",
          "Emerald green circuit-line engravings on polished gold",
          "Opulent, high-tech aesthetic with luxurious finish",
          "Precision-machined for balanced, fair rolls",
        ],
      },
      {
        id: "mech-core-arctic-dice",
        name: "Arctic",
        images: [
          "/images/products/mech-core-arctic-1.jpeg",
          "/images/products/mech-core-arctic-2.jpeg",
        ],
        tag: null,
        description:
          "Cold precision. The Arctic set gleams in chrome silver with deep blue circuit-line engravings that pulse like frozen data streams. The cleanest and most refined of the Mech Core line, it brings a sterile, high-tech beauty to your tabletop that feels pulled from a space station control room.",
        material: "Solid chrome silver metal with blue enamel circuit-line engravings",
        features: [
          "Solid metal construction with satisfying heft",
          "Icy blue circuit-line engravings on chrome silver",
          "Clean, refined futuristic aesthetic",
          "Precision-machined for balanced, fair rolls",
        ],
      },
    ],
  },
  {
    id: "feline-familiar-holographic-dice",
    name: "Feline Familiar Dice Set",
    shortDescription: "Enchanting cat-themed dice with iridescent engravings. Available in 4 styles. Seven-piece polyhedral set.",
    description:
      "Your familiar has arrived. The Holographic set features matte black resin adorned with stunning holographic cat engravings that shift between pink, green, and gold as light catches them. Each face bears a different playful cat pose — stretching, sitting, pouncing — with crisp white numbering. A must-have for cat lovers and whimsical adventurers.",
    priceInCents: 5499,
    images: [
      "/images/products/feline-holographic-1.jpeg",
    ],
    tag: "New Arrival",
    features: [
      "Holographic cat engravings that shift in the light",
      "Matte black resin with pink-green iridescent cats",
      "Unique cat pose on every face of every die",
      "White numbering for easy readability",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Matte black resin with holographic cat inlay and white numbering",
    inStock: true,
    supplierUrl: "",
    variants: [
      {
        id: "feline-familiar-midnight-dice",
        name: "Midnight",
        images: [
          "/images/products/feline-midnight-1.jpeg",
        ],
        tag: null,
        description:
          "Cats that prowl by moonlight. The Midnight set cloaks its feline companions in deep blue and purple iridescence against matte black resin. Each die features a different cat pose that shimmers like a shadow familiar under starlight. White numbering keeps readability sharp while the midnight cats steal the show.",
        material: "Matte black resin with blue-purple iridescent cat inlay and white numbering",
        features: [
          "Blue-purple iridescent cat engravings",
          "Matte black resin with moonlit shimmer effect",
          "Unique cat pose on every face of every die",
          "White numbering for easy readability",
        ],
      },
      {
        id: "feline-familiar-copper-dice",
        name: "Copper",
        images: [
          "/images/products/feline-copper-1.jpeg",
        ],
        tag: "Premium",
        priceInCents: 8999,
        description:
          "Warm copper meets whimsical cats. This premium metal set is crafted from polished copper with deeply engraved cat designs on every face — each one a different playful pose. The warm, rosy tone of the copper gives these dice a vintage, storybook charm while the satisfying heft makes every roll a moment.",
        material: "Solid polished copper with deep-engraved cat designs",
        features: [
          "Solid copper metal construction with satisfying weight",
          "Deep-engraved cat design on every face",
          "Warm polished copper finish with vintage charm",
          "Precision-machined for balanced, fair rolls",
        ],
      },
      {
        id: "feline-familiar-silver-dice",
        name: "Silver",
        images: [
          "/images/products/feline-silver-1.jpeg",
        ],
        tag: null,
        priceInCents: 8999,
        description:
          "Elegance and whimsy in brushed silver. Each die in this premium metal set features a beautifully engraved cat in a different pose — lounging, leaping, and looking adorably grumpy. The cool brushed silver finish gives these dice a modern, refined look while the metal weight delivers a deeply satisfying roll every time.",
        material: "Solid brushed silver-tone metal with deep-engraved cat designs",
        features: [
          "Solid silver-tone metal construction with satisfying weight",
          "Deep-engraved cat design on every face",
          "Cool brushed silver finish with modern elegance",
          "Precision-machined for balanced, fair rolls",
        ],
      },
    ],
  },
  {
    id: "metal-maze-dice",
    name: "Metal Maze Dice Set",
    shortDescription: "Hollow-forged metal dice with intricate intertwining maze pattern. Available in 9 colorways. Seven-piece polyhedral set.",
    description:
      "Cast from solid metal and hollowed to reveal a breathtaking intertwining maze pattern, these dice blur the line between gaming gear and sculpture. Light plays through the open framework on every face, while the substantial weight delivers a roll with true presence. The Antique Copper finish wears a rich, aged patina that only deepens the drama. Available in nine striking colorways to match your table's aesthetic.",
    priceInCents: 7999,
    images: [
      "/images/Dice Metal Maze/1.jpeg",
      "/images/Dice Metal Maze/2.jpeg",
      "/images/Dice Metal Maze/3.jpeg",
      "/images/Dice Metal Maze/4.jpeg",
      "/images/Dice Metal Maze/5.jpeg",
      "/images/Dice Metal Maze/6.jpeg",
    ],
    tag: "New Arrival",
    features: [
      "Hollow-forged metal with intricate maze lattice pattern",
      "Substantial metal weight for deeply satisfying rolls",
      "Light plays through the open framework on every face",
      "Includes collector's metal storage tin",
    ],
    includes: "D4, D6, D8, D10, D10 (percentile), D12, D20",
    material: "Hollow-forged metal with antique copper finish",
    inStock: true,
    supplierUrl: "",
    variants: [
      {
        id: "metal-maze-antique-gold",
        name: "Antique Gold",
        images: [
          "/images/Dice Metal Maze/20.jpeg",
          "/images/Dice Metal Maze/21.jpeg",
          "/images/Dice Metal Maze/22.jpeg",
          "/images/Dice Metal Maze/23.jpeg",
          "/images/Dice Metal Maze/24.jpeg",
          "/images/Dice Metal Maze/25.jpeg",
        ],
        tag: "New Arrival",
        description:
          "A warm antique gold finish over a dark base, these hollow maze dice carry an air of ancient treasure. The aged gold tones shift beautifully in candlelight and lamplight alike.",
        material: "Hollow-forged metal with antique gold finish",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Antique gold finish with warm, aged character",
          "Light plays through the open framework on every face",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-gunmetal-green",
        name: "Gunmetal Green",
        images: [
          "/images/Dice Metal Maze/40.jpeg",
          "/images/Dice Metal Maze/41.jpeg",
          "/images/Dice Metal Maze/42.jpeg",
          "/images/Dice Metal Maze/44.jpeg",
          "/images/Dice Metal Maze/43.jpeg",
          "/images/Dice Metal Maze/45.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Cold gunmetal frames vivid emerald-green enamel numbering — a bold, tactical look for players who want their dice to look as lethal as their builds.",
        material: "Hollow-forged metal with gunmetal finish and green enamel numbering",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Gunmetal finish with vivid green enamel numbers",
          "High-contrast readability at a glance",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-obsidian-gold",
        name: "Obsidian Gold",
        images: [
          "/images/Dice Metal Maze/60.jpeg",
          "/images/Dice Metal Maze/61.jpeg",
          "/images/Dice Metal Maze/62.jpeg",
          "/images/Dice Metal Maze/64.jpeg",
          "/images/Dice Metal Maze/63.jpeg",
          "/images/Dice Metal Maze/65.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Gloss obsidian black with polished gold numbering and a deep crimson interior visible through the hollow lattice. The most dramatic colorway in the collection — pure dark elegance.",
        material: "Hollow-forged metal with obsidian black finish, gold numbering, and crimson interior",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Gloss obsidian finish with polished gold numbers",
          "Crimson interior glows through the open lattice",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-silver",
        name: "Silver",
        images: [
          "/images/Dice Metal Maze/82.png",
          "/images/Dice Metal Maze/80.png",
          "/images/Dice Metal Maze/79.png",
          "/images/Dice Metal Maze/84.png",
          "/images/Dice Metal Maze/81.png",
          "/images/Dice Metal Maze/83.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Polished chrome silver with gold numbering, these hollow maze dice are almost entirely open — pure metal architecture. The most eye-catching colorway when light hits the table.",
        material: "Hollow-forged metal with polished chrome silver finish and gold numbering",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Chrome silver finish with brilliant mirror polish",
          "Gold numbering pops against the bright silver",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-gold-white",
        name: "Gold & White",
        images: [
          "/images/Dice Metal Maze/91.jpeg",
          "/images/Dice Metal Maze/86.jpeg",
          "/images/Dice Metal Maze/87.jpeg",
          "/images/Dice Metal Maze/90.jpeg",
          "/images/Dice Metal Maze/88.jpeg",
          "/images/Dice Metal Maze/89.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Bright polished gold with clean white enamel numbering — a regal, high-contrast combination that reads instantly across the table. Gold never looked this sharp.",
        material: "Hollow-forged metal with polished gold finish and white enamel numbering",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Brilliant polished gold finish",
          "White enamel numbering for instant readability",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-emerald-green",
        name: "Emerald Green",
        images: [
          "/images/Dice Metal Maze/105.jpeg",
          "/images/Dice Metal Maze/101.jpeg",
          "/images/Dice Metal Maze/102.jpeg",
          "/images/Dice Metal Maze/104.jpeg",
          "/images/Dice Metal Maze/103.jpeg",
          "/images/Dice Metal Maze/100.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Vivid emerald green all the way through — framework and numbering alike. A bold monochrome statement that turns every roll into a showstopper.",
        material: "Hollow-forged metal with emerald green finish and silver numbering",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Saturated emerald green finish",
          "Silver numbering for crisp readability",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-arcane-purple",
        name: "Arcane Purple",
        images: [
          "/images/Dice Metal Maze/110.jpeg",
          "/images/Dice Metal Maze/111.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Deep arcane purple with silver numbering — the color of spellcraft and mystery. The open lattice framework makes these hollow metal dice look like something conjured from the astral plane.",
        material: "Hollow-forged metal with arcane purple finish and silver numbering",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Deep arcane purple finish",
          "Silver numbering for clear contrast",
          "Includes collector's metal storage tin",
        ],
      },
      {
        id: "metal-maze-sapphire-blue",
        name: "Sapphire Blue",
        images: [
          "/images/Dice Metal Maze/112.jpeg",
          "/images/Dice Metal Maze/113.jpeg",
          "/images/Dice Metal Maze/114.jpeg",
          "/images/Dice Metal Maze/116.jpeg",
          "/images/Dice Metal Maze/115.jpeg",
          "/images/Dice Metal Maze/117.jpeg",
        ],
        tag: "New Arrival",
        description:
          "Brilliant sapphire blue with white numbering — vivid, clean, and impossible to ignore. The deep blue finish gives the hollow maze pattern an almost oceanic depth.",
        material: "Hollow-forged metal with sapphire blue finish and white numbering",
        features: [
          "Hollow-forged metal with intricate maze lattice pattern",
          "Sapphire blue finish with striking depth",
          "White numbering for instant legibility",
          "Includes collector's metal storage tin",
        ],
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
