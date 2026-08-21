import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../common/Container'
import { productService } from '../../services/productService'

const primaryProductId = productService.getProducts()?.[0]?.id ?? 'olive-heritage-shirt'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: `/product/${primaryProductId}`, label: 'Shirts' },
  { to: '/cart', label: 'Cart' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/account', label: 'Account' },
]

const footerGroups = [
  {
    title: 'Shop',
    links: [
      { to: '/shop', label: 'New Arrivals' },
      { to: `/product/${primaryProductId}`, label: 'Shirts' },
      { to: '/shop', label: 'Collections' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/account', label: 'Account' },
      { to: '/checkout', label: 'Shipping' },
      { to: '/login', label: 'Contact' },
    ],
  },
]

export default function StorefrontShell({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="storefront-header" aria-label="Storefront header">
        <Container className="storefront-header__inner">
          <NavLink to="/" className="storefront-brand" aria-label="North and Wick home">
            <span className="storefront-brand__wordmark">North &amp; Wick</span>
          </NavLink>

          <nav className="storefront-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `storefront-nav__link ${isActive ? 'is-active' : ''}`.trim()
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="storefront-utility" aria-label="Utility navigation">
            <button type="button" className="utility-button" aria-label="Search products">
              Search
            </button>
            <NavLink to="/account" className="utility-button" aria-label="Account overview">
              Account
            </NavLink>
            <NavLink to="/cart" className="utility-button utility-button--cart" aria-label="Shopping cart">
              Cart
              <span className="utility-button__count" aria-label="Cart item count">
                2
              </span>
            </NavLink>
            <button
              type="button"
              className="mobile-toggle"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              Menu
            </button>
          </div>
        </Container>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="storefront-mobile-panel" role="dialog" aria-modal="false">
            <Container>
              <nav className="storefront-mobile-panel__nav" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="storefront-mobile-panel__link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </NavLink>
                ))}
              </nav>
            </Container>
          </div>
        )}
      </header>

      <main className="site-main">
        <Container>{children}</Container>
      </main>

      <footer className="storefront-footer" aria-label="Store footer">
        <Container className="storefront-footer__grid">
          <div className="storefront-footer__brand">
            <span className="storefront-brand__wordmark">North &amp; Wick</span>
            <p>Premium men’s topwear, designed for quiet confidence.</p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="storefront-footer__list">
              <p className="storefront-footer__list-title">{group.title}</p>
              {group.links.map((link) => (
                <NavLink key={link.label} to={link.to} className="storefront-footer__list-item">
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </Container>

        <Container className="storefront-footer__meta">
          <span>© 2026 North &amp; Wick</span>
          <span>Premium essentials</span>
        </Container>
      </footer>
    </div>
  )
}
