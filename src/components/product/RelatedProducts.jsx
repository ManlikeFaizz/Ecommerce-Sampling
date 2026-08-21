import ProductGrid from '../products/ProductGrid'
import { productService } from '../../services/productService'

export default function RelatedProducts({ currentProductId }) {
  const products = productService
    .getProducts()
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4)

  return (
    <section className="home-section related-products">
      <div className="section-heading">
        <p className="eyebrow">You may also like</p>
        <h2>Continue the edit.</h2>
      </div>
      <ProductGrid products={products} />
    </section>
  )
}
