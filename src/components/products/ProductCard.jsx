import { Link } from 'react-router-dom'

import { useStorefront } from '../../context/StorefrontContext'

export default function ProductCard({ product, showAddToBag = false }) {
  const primaryImage = product.images?.[0]
  const { addToCart, toggleSavedProduct, isSaved } = useStorefront()

  return (
    <article className="product-card">
      <Link className="product-card__media" to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
        {primaryImage && <img className="product-card__image" src={primaryImage} alt={product.name} />}
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__collection">{product.collection}</span>
          {product.badge && <span className="product-card__badge">{product.badge}</span>}
        </div>

        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__details" aria-label="Product details">
          <span>{product.fabric}</span>
          <span>{product.color}</span>
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">₹{product.price}</span>
          <Link className="product-card__cta" to={`/product/${product.id}`}>
            View
          </Link>
        </div>
        {showAddToBag && (
          <div className="product-card__actions">
            <button type="button" className="product-card__action" onClick={() => addToCart(product, 'M')}>
              Add to bag
            </button>
            <button type="button" className="product-card__action" onClick={() => toggleSavedProduct(product)} aria-pressed={isSaved(product.id)}>
                {isSaved(product.id) ? 'Saved' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
