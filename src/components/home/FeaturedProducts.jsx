import { Link } from 'react-router-dom'
import ProductGrid from '../products/ProductGrid'
import { useStorefront } from '../../context/StorefrontContext'

export default function FeaturedProducts() {
  const { products: catalogue, featuredProductIds } = useStorefront()
  const products = catalogue.filter((product) => featuredProductIds.includes(product.id))

  return (
    <section className="home-section">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Featured essentials</p>
          <h2>Quiet pieces with real presence.</h2>
        </div>
        <Link className="text-link" to="/shop">
          Shop all
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  )
}
