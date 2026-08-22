import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const StorefrontContext = createContext(null)
const STORAGE_KEY = 'north-and-wick-saved-items'
const CART_STORAGE_KEY = 'north-and-wick-cart'

export function StorefrontProvider({ children }) {
  const [savedItems, setSavedItems] = useState(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY)
      return storedValue ? JSON.parse(storedValue) : []
    } catch {
      return []
    }
  })

  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const storedValue = window.localStorage.getItem(CART_STORAGE_KEY)
      return storedValue ? JSON.parse(storedValue) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems))
    }
  }, [savedItems])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }
  }, [cartItems])

  const toggleSavedProduct = (product) => {
    if (!product?.id) {
      return
    }

    setSavedItems((current) => {
      const exists = current.some((item) => item.id === product.id)

      if (exists) {
        return current.filter((item) => item.id !== product.id)
      }

      return [
        {
          id: product.id,
          name: product.name,
          image: product.images?.[0] || null,
        },
        ...current,
      ]
    })
  }

  const isSaved = useCallback((productId) => savedItems.some((item) => item.id === productId), [savedItems])

  const addToCart = (product, selectedSize = 'M') => {
    if (!product?.id) {
      return
    }

    setCartItems((current) => {
      const itemIndex = current.findIndex(
        (item) => item.productId === product.id && item.size === selectedSize,
      )

      if (itemIndex === -1) {
        return [
          ...current,
          {
            id: `${product.id}-${selectedSize}`,
            productId: product.id,
            name: product.name,
            image: product.images?.[0] || null,
            color: product.color,
            size: selectedSize,
            price: product.price,
            quantity: 1,
          },
        ]
      }

      return current.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item,
      )
    })
  }

  const updateCartQuantity = (itemId, change) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (itemId) => {
    setCartItems((current) => current.filter((item) => item.id !== itemId))
  }

  const value = useMemo(
    () => ({
      savedItems,
      cartItems,
      cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleSavedProduct,
      isSaved,
    }),
    [savedItems, cartItems, isSaved],
  )

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

// The provider and its hook intentionally share this context module.
// eslint-disable-next-line react-refresh/only-export-components
export function useStorefront() {
  const context = useContext(StorefrontContext)

  if (!context) {
    throw new Error('useStorefront must be used within StorefrontProvider')
  }

  return context
}
