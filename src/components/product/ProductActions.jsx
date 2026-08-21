import { useStorefront } from '../../context/StorefrontContext'

export default function ProductActions({ product, selectedSize }) {
  const { toggleSavedProduct, isSaved } = useStorefront()
  const isProductSaved = product ? isSaved(product.id) : false

  return (
    <div className="product-actions">
      <button type="button" className="btn btn--primary">
        Add to bag{selectedSize ? ` · ${selectedSize}` : ''}
      </button>
      <button
        type="button"
        className={`btn btn--secondary ${isProductSaved ? 'is-active' : ''}`}
        onClick={() => toggleSavedProduct(product)}
        aria-pressed={isProductSaved}
      >
        {isProductSaved ? 'Saved for later' : 'Save for later'}
      </button>
    </div>
  )
}
