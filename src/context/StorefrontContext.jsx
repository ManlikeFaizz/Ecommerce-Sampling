import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { prototypeAdminCredentials } from '../config/prototypeAdmin'
import { productService } from '../services/productService'

const StorefrontContext = createContext(null)
const STORAGE_KEY = 'north-and-wick-saved-items'
const CART_STORAGE_KEY = 'north-and-wick-cart'
const USER_STORAGE_KEY = 'north-and-wick-prototype-user'
const AUTH_STORAGE_KEY = 'north-and-wick-prototype-auth'
const ADMIN_AUTH_STORAGE_KEY = 'north-and-wick-prototype-admin-auth'

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

  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const authenticated = window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
      const storedUser = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY))
      return authenticated && storedUser?.email ? storedUser : null
    } catch {
      return null
    }
  })

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true'
  })
  const [products, setProducts] = useState(() => productService.getProducts())
  const [inventory, setInventory] = useState({})
  const [collections, setCollections] = useState(() =>
    [...new Set(productService.getProducts().map((product) => product.collection))].map((name) => ({ name, visible: true })),
  )
  const [featuredProductIds, setFeaturedProductIds] = useState(() =>
    productService.getProducts().filter((product) => product.badge).map((product) => product.id),
  )

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

  const register = (user) => {
    if (!user?.email || !user.password) {
      return { success: false, error: 'Unable to create that account.' }
    }

    try {
      const existingUser = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY))
      if (existingUser?.email === user.email) {
        return { success: false, error: 'An account with this email already exists. Log in instead.' }
      }

      // Prototype-only storage. Replace with server-side authentication before production.
      const storedUser = { name: user.name, email: user.email, password: user.password }
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(storedUser))
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      setCurrentUser({ name: user.name, email: user.email })
      return { success: true }
    } catch {
      return { success: false, error: 'Unable to create that account.' }
    }
  }

  const login = (email, password) => {
    try {
      const storedUser = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY))
      if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
        return { success: false, error: "Those details don't match an account." }
      }

      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      setCurrentUser({ name: storedUser.name, email: storedUser.email })
      return { success: true }
    } catch {
      return { success: false, error: "Those details don't match an account." }
    }
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setCurrentUser(null)
  }

  const adminLogin = (email, password) => {
    if (email !== prototypeAdminCredentials.email || password !== prototypeAdminCredentials.password) {
      return { success: false, error: "Those admin details don't match." }
    }

    window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true')
    setIsAdminAuthenticated(true)
    return { success: true }
  }

  const adminLogout = () => {
    window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
    setIsAdminAuthenticated(false)
  }

  const addProduct = (product) => {
    const nextProduct = { ...product, id: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}` }
    setProducts((current) => [...current, nextProduct])
    if (nextProduct.featured) setFeaturedProductIds((current) => [...current, nextProduct.id])
    setCollections((current) => current.some((item) => item.name === nextProduct.collection) ? current : [...current, { name: nextProduct.collection, visible: true }])
    return nextProduct
  }

  const updateProduct = (product) => {
    setProducts((current) => current.map((item) => item.id === product.id ? product : item))
    setFeaturedProductIds((current) => product.featured ? [...new Set([...current, product.id])] : current.filter((id) => id !== product.id))
  }

  const deleteProduct = (productId) => {
    setProducts((current) => current.filter((product) => product.id !== productId))
    setFeaturedProductIds((current) => current.filter((id) => id !== productId))
  }

  const updateInventory = (productId, status) => {
    setInventory((current) => ({ ...current, [productId]: status }))
  }

  const toggleCollection = (name) => {
    setCollections((current) => current.map((item) => item.name === name ? { ...item, visible: !item.visible } : item))
  }

  const toggleFeatured = (productId) => {
    setFeaturedProductIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])
  }

  const value = useMemo(
    () => ({
      savedItems,
      cartItems,
      cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isAdminAuthenticated,
      products,
      inventory,
      collections,
      featuredProductIds,
      addProduct,
      updateProduct,
      deleteProduct,
      updateInventory,
      toggleCollection,
      toggleFeatured,
      adminLogin,
      adminLogout,
      register,
      login,
      logout,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleSavedProduct,
      isSaved,
    }),
    [savedItems, cartItems, currentUser, isAdminAuthenticated, products, inventory, collections, featuredProductIds, isSaved],
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
