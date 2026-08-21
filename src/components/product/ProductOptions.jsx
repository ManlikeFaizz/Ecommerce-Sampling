import { useState } from 'react'

const sizeOptions = ['S', 'M', 'L', 'XL']

export default function ProductOptions({ product, selectedSize, onSizeChange }) {
  const [pendingSize, setPendingSize] = useState(selectedSize || 'M')

  const handleSizeClick = (size) => {
    setPendingSize(size)
    onSizeChange(size)
  }

  return (
    <div className="product-options">
      <div className="field">
        <label className="field__label" htmlFor="pdp-size">
          Size
        </label>
        <div className="size-picker" id="pdp-size" role="listbox" aria-label="Select size">
          {sizeOptions.map((size) => (
            <button
              key={size}
              type="button"
              className={`size-picker__chip ${size === (selectedSize || pendingSize) ? 'is-selected' : ''}`}
              aria-pressed={size === (selectedSize || pendingSize)}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="pdp-color">
          Colour
        </label>
        <div className="color-picker" id="pdp-color" aria-label="Selected colour">
          <span className="color-swatch" style={{ background: '#586d4d' }} aria-hidden="true" />
          <span>{product.color}</span>
        </div>
      </div>
    </div>
  )
}
