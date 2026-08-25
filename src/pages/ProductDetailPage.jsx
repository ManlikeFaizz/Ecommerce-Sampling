import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductAccordion from '../components/product/ProductAccordion'
import ProductActions from '../components/product/ProductActions'
import ProductGallery from '../components/product/ProductGallery'
import ProductInformation from '../components/product/ProductInformation'
import ProductOptions from '../components/product/ProductOptions'
import RelatedProducts from '../components/product/RelatedProducts'
import { useStorefront } from '../context/StorefrontContext'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { products } = useStorefront()
  const product = products.find((item) => item.id === productId)
  const [selectedSize, setSelectedSize] = useState('M')

  if (!product) {
    return (
      <section className="page-section product-not-found">
        <p className="eyebrow">Product detail</p>
        <h1>This piece could not be found.</h1>
        <p className="lead">The product you selected is not available in the current catalogue.</p>
        <Link className="btn btn--secondary" to="/shop">
          Return to the collection
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="page-section product-page">
        <div className="product-page__layout">
          <ProductGallery product={product} />

          <div className="product-page__content">
            <ProductInformation product={product} />
            <ProductOptions product={product} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
            <ProductActions product={product} selectedSize={selectedSize} />
            <ProductAccordion product={product} />
          </div>
        </div>
      </section>

      <RelatedProducts currentProductId={product.id} />
    </>
  )
}
