import { Link } from 'react-router-dom'
import ProductGrid from '../products/ProductGrid'
import { productService } from '../../services/productService'

export default function FeaturedProducts() {
  const products = productService.getProducts()

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
