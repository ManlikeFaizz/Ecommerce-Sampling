import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StorefrontContext = createContext(null)
const STORAGE_KEY = 'north-and-wick-saved-items'

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems))
    }
  }, [savedItems])

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

  const isSaved = (productId) => savedItems.some((item) => item.id === productId)

  const value = useMemo(
    () => ({
      savedItems,
      toggleSavedProduct,
      isSaved,
    }),
    [savedItems],
  )

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

export function useStorefront() {
  const context = useContext(StorefrontContext)

  if (!context) {
    throw new Error('useStorefront must be used within StorefrontProvider')
  }

  return context
}
