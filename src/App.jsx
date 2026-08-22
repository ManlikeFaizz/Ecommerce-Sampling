import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import { StorefrontProvider } from './context/StorefrontContext'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <StorefrontProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PlaceholderPage title="Checkout" />} />
          <Route path="/account" element={<PlaceholderPage title="Account" />} />
          <Route path="/login" element={<PlaceholderPage title="Login" />} />
          <Route path="*" element={<PlaceholderPage title="Not Found" />} />
        </Routes>
      </AppShell>
    </StorefrontProvider>
  )
}

function PlaceholderPage({ title }) {
  return (
    <section className="page-section">
      <p className="eyebrow">Placeholder route</p>
      <h1>{title}</h1>
      <p className="lead">
        This route exists only to validate the frontend shell and routing structure.
      </p>
    </section>
  )
}

export default App
