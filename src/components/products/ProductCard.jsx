import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const primaryImage = product.images?.[0]

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
      </div>
    </article>
  )
}
