import ProductGrid from '../products/ProductGrid'
import { useStorefront } from '../../context/StorefrontContext'

export default function RelatedProducts({ currentProductId }) {
  const { products: catalogue } = useStorefront()
  const products = catalogue
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
