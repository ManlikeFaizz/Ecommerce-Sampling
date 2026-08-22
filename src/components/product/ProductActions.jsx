import { useEffect, useState } from 'react'
import { useStorefront } from '../../context/StorefrontContext'

export default function ProductActions({ product, selectedSize }) {
  const { addToCart, toggleSavedProduct, isSaved } = useStorefront()
  const [addState, setAddState] = useState('idle')
  const isProductSaved = product ? isSaved(product.id) : false

  useEffect(() => {
    if (addState !== 'adding') {
      return undefined
    }

    const successTimer = window.setTimeout(() => setAddState('success'), 260)
    return () => window.clearTimeout(successTimer)
  }, [addState])

  useEffect(() => {
    if (addState !== 'success') {
      return undefined
    }

    const resetTimer = window.setTimeout(() => setAddState('idle'), 1400)
    return () => window.clearTimeout(resetTimer)
  }, [addState])

  const handleAddToBag = () => {
    if (addState !== 'idle') {
      return
    }

    addToCart(product, selectedSize)
    setAddState('adding')
  }

  const buttonLabel = {
    idle: `Add to bag${selectedSize ? ` · ${selectedSize}` : ''}`,
    adding: 'Adding...',
    success: 'Added to bag ✓',
  }[addState]

  return (
    <div className="product-actions">
      <button
        type="button"
        className={`btn btn--primary product-actions__add ${addState === 'success' ? 'is-success' : ''}`}
        onClick={handleAddToBag}
        disabled={addState !== 'idle'}
        aria-live="polite"
      >
        {buttonLabel}
      </button>
      <button
        type="button"
        className={`btn btn--secondary ${isProductSaved ? 'is-active' : ''}`}
        onClick={() => toggleSavedProduct(product)}
        aria-pressed={isProductSaved}
      >
        {isProductSaved ? 'Saved for later' : 'Save for later'}
      </button>
      {addState === 'success' && (
        <p className="product-actions__confirmation" role="status">Added to your bag.</p>
      )}
    </div>
  )
}
