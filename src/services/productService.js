const products = [
  {
    id: 'olive-heritage-shirt',
    name: 'Olive Heritage Shirt',
    category: 'Shirts',
    collection: 'Signature Edit',
    description:
      'A sharply cut cotton shirt with a natural earth-tone finish and understated patterning designed for everyday refinement.',
    price: 2999,
    color: 'Olive',
    pattern: 'Paisley texture',
    fabric: 'Cotton twill',
    availability: 'In stock',
    badge: 'New in',
    images: ['/catalogue/shirt-01.jpeg', '/catalogue/catalogue-1.jpeg'],
  },
  {
    id: 'copper-drift-shirt',
    name: 'Copper Drift Shirt',
    category: 'Shirts',
    collection: 'City Form',
    description:
      'A warm, tactile menswear staple with a structured silhouette and a refined burnt-amber palette.',
    price: 3199,
    color: 'Copper',
    pattern: 'Textured print',
    fabric: 'Cotton blend',
    availability: 'In stock',
    badge: 'Popular',
    images: ['/catalogue/shirt-02.jpeg', '/catalogue/catalogue-2.jpeg'],
  },
  {
    id: 'forest-structure-shirt',
    name: 'Forest Structure Shirt',
    category: 'Shirts',
    collection: 'Field Notes',
    description:
      'Balanced structure with a rich green base and soft pattern detail for a premium, easy-to-style look.',
    price: 3099,
    color: 'Forest green',
    pattern: 'Abstract print',
    fabric: 'Cotton poplin',
    availability: 'Limited',
    badge: 'Limited',
    images: ['/catalogue/shirt-03.jpeg', '/catalogue/catalogue-3.jpeg'],
  },
  {
    id: 'sandstone-essay-shirt',
    name: 'Sandstone Essay Shirt',
    category: 'Shirts',
    collection: 'The Studio',
    description:
      'An easy premium shirt with relaxed proportions and a neutral warmth that slots seamlessly into daily dressing.',
    price: 2899,
    color: 'Sand',
    pattern: 'Subtle texture',
    fabric: 'Cotton',
    availability: 'In stock',
    images: ['/catalogue/shirt-04.jpeg', '/catalogue/catalogue-4.jpeg'],
  },
  {
    id: 'charcoal-ritual-shirt',
    name: 'Charcoal Ritual Shirt',
    category: 'Shirts',
    collection: 'Evening Layer',
    description:
      'Dark-toned and sharply finished, this shirt brings a crisp silhouette to evening and smart-casual dressing.',
    price: 3299,
    color: 'Charcoal',
    pattern: 'Monochrome wash',
    fabric: 'Structured cotton',
    availability: 'In stock',
    badge: 'Editor pick',
    images: ['/catalogue/shirt-05.jpeg', '/catalogue/catalogue-5.jpeg'],
  },
  {
    id: 'smoked-olive-shirt',
    name: 'Smoked Olive Shirt',
    category: 'Shirts',
    collection: 'Grounded',
    description:
      'Soft tonal variation and a confident collar line give this shirt a premium, lived-in character without excess styling.',
    price: 2999,
    color: 'Smoked olive',
    pattern: 'Layered effect',
    fabric: 'Cotton twill',
    availability: 'In stock',
    badge: 'New',
    images: ['/catalogue/shirt-06.jpeg', '/catalogue/catalogue-6.jpeg'],
  },
  {
    id: 'cedar-silhouette-shirt',
    name: 'Cedar Silhouette Shirt',
    category: 'Shirts',
    collection: 'North Light',
    description:
      'A quietly expressive shirt in warm cedar tones with a clean fit and a softly brushed hand feel.',
    price: 3149,
    color: 'Cedar',
    pattern: 'Tone-on-tone weave',
    fabric: 'Cotton twill',
    availability: 'In stock',
    badge: 'Featured',
    images: ['/catalogue/catalogue-7.jpeg', '/catalogue/catalogue-19.jpeg'],
  },
  {
    id: 'weathered-ash-shirt',
    name: 'Weathered Ash Shirt',
    category: 'Shirts',
    collection: 'Studio Ground',
    description:
      'A restrained stone tone finish that keeps the silhouette crisp while feeling effortlessly lived-in.',
    price: 2899,
    color: 'Ash',
    pattern: 'Dusty grain',
    fabric: 'Cotton poplin',
    availability: 'In stock',
    images: ['/catalogue/catalogue-9.jpeg', '/catalogue/catalogue-20.jpeg'],
  },
  {
    id: 'terracotta-curve-shirt',
    name: 'Terracotta Curve Shirt',
    category: 'Shirts',
    collection: 'Warm Signal',
    description:
      'An earth-rich statement shirt with tonal depth and a relaxed cut built for everyday ease.',
    price: 3229,
    color: 'Terracotta',
    pattern: 'Soft stripe',
    fabric: 'Cotton blend',
    availability: 'Limited',
    badge: 'Limited',
    images: ['/catalogue/catalogue-11.jpeg', '/catalogue/catalogue-21.jpeg'],
  },
  {
    id: 'dune-quiet-shirt',
    name: 'Dune Quiet Shirt',
    category: 'Shirts',
    collection: 'Open Field',
    description:
      'Muted sand tones and an easy drape create a polished foundation for layering through the week.',
    price: 2949,
    color: 'Dune',
    pattern: 'Subtle wash',
    fabric: 'Cotton',
    availability: 'In stock',
    images: ['/catalogue/catalogue-13.jpeg', '/catalogue/catalogue-22.jpeg'],
  },
  {
    id: 'midnight-loom-shirt',
    name: 'Midnight Loom Shirt',
    category: 'Shirts',
    collection: 'After Hours',
    description:
      'A deeper midnight palette with crisp structure and a relaxed drape for evening refinement.',
    price: 3349,
    color: 'Midnight',
    pattern: 'Noir texture',
    fabric: 'Structured cotton',
    availability: 'In stock',
    badge: 'Editor pick',
    images: ['/catalogue/catalogue-15.jpeg', '/catalogue/catalogue-23.jpeg'],
  },
  {
    id: 'field-utility-shirt',
    name: 'Field Utility Shirt',
    category: 'Shirts',
    collection: 'Groundwork',
    description:
      'Built around utility ease and tactile fabric weight, this shirt feels at home on long days and quick transitions.',
    price: 3019,
    color: 'Moss',
    pattern: 'Natural weave',
    fabric: 'Cotton twill',
    availability: 'In stock',
    images: ['/catalogue/catalogue-17.jpeg', '/catalogue/catalogue-25.jpeg'],
  },
]

export const productService = {
  getProducts() {
    return products
  },

  getProductById(id) {
    return products.find((product) => product.id === id)
  },

  getProductsByCategory(category) {
    if (!category || category === 'All') {
      return products
    }

    return products.filter((product) => product.category === category)
  },

  getProductsByCollection(collection) {
    if (!collection || collection === 'All') {
      return products
    }

    return products.filter((product) => product.collection === collection)
  },
}
