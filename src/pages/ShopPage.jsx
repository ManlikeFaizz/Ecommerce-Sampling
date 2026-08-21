import { useMemo, useState } from 'react'
import ProductGrid from '../components/products/ProductGrid'
import { productService } from '../services/productService'

const categories = ['All', 'Shirts']

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('featured')

  const filteredProducts = useMemo(() => {
    const products = productService.getProductsByCategory(activeCategory)

    switch (sortOrder) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price)
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return products
    }
  }, [activeCategory, sortOrder])

  return (
    <section className="page-section catalogue-page">
      <div className="catalogue-opening">
        <div className="catalogue-intro">
          <p className="eyebrow">Premium menswear</p>
          <h1>Shirts built for everyday refinement.</h1>
          <p className="lead">
            Thoughtful silhouettes, earthy tones and texture-led fabrics designed to feel elevated without excess.
          </p>

          <div className="catalogue-summary" aria-label="Catalogue summary">
            <div>
              <span className="catalogue-summary__label">Collection</span>
              <strong>Signature Edit</strong>
            </div>
            <div>
              <span className="catalogue-summary__label">Pieces</span>
              <strong>{filteredProducts.length}</strong>
            </div>
            <div>
              <span className="catalogue-summary__label">Craft</span>
              <strong>Premium cotton</strong>
            </div>
          </div>
        </div>

        <div className="catalogue-opening__story">
          <div className="catalogue-opening__story-copy">
            <p className="eyebrow">Material study</p>
            <h2>Quiet structure. Rich texture.</h2>
            <p className="lead">
              A concise collection of shirts shaped by tactile cotton, lived-in warmth and refined everyday proportion.
            </p>
          </div>

          <div className="catalogue-opening__media" aria-label="Material study imagery">
            <img src="/catalogue/catalogue-31.jpeg" alt="Fabric close-up detail" />
            <img src="/catalogue/catalogue-47.jpeg" alt="Textured menswear detail" />
          </div>
        </div>
      </div>

      <div className="catalogue-toolbar">
        <div className="catalogue-filter" aria-label="Product categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`catalogue-filter__chip ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="catalogue-sort">
          <label htmlFor="sort-products">Sort</label>
          <select
            id="sort-products"
            className="select"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="catalogue-empty">
          <h2>No products match this selection</h2>
          <p className="lead">Try a broader category or return to the full catalogue.</p>
        </div>
      )}
    </section>
  )
}
