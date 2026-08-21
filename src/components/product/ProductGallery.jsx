import { useState } from 'react'

export default function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = product?.images || []

  if (!images.length) {
    return (
      <div className="product-gallery product-gallery--empty">
        <div className="product-gallery__fallback">Image unavailable</div>
      </div>
    )
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery__primary" aria-label={`${product.name} primary image`}>
        <img src={images[activeIndex]} alt={product.name} />
      </div>

      <div className="product-gallery__thumbs" aria-label="Product image gallery">
        {images.map((image, index) => (
          <button
            key={`${product.id}-thumb-${index}`}
            type="button"
            className={`product-gallery__thumb ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1} for ${product.name}`}
          >
            <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
