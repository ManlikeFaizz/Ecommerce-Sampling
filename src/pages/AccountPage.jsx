import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useStorefront } from '../context/StorefrontContext'
import { productService } from '../services/productService'

const sections = [
  { id: 'saved', label: 'Saved pieces' },
  { id: 'orders', label: 'Orders' },
  { id: 'details', label: 'Details' },
  { id: 'preferences', label: 'Preferences' },
]

export default function AccountPage() {
  const { savedItems } = useStorefront()
  const [activeSection, setActiveSection] = useState('saved')
  const [details, setDetails] = useState({ name: '', email: '', phone: '' })
  const [preferences, setPreferences] = useState({ collectionUpdates: false, orderUpdates: true, size: 'M' })
  const savedProducts = savedItems
    .map((item) => productService.getProductById(item.id))
    .filter(Boolean)

  const updateDetails = (event) => {
    const { name, value } = event.target
    setDetails((current) => ({ ...current, [name]: value }))
  }

  const updatePreference = (event) => {
    const { name, value, type, checked } = event.target
    setPreferences((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <section className="page-section account-page">
      <header className="account-page__header">
        <p className="eyebrow">Account / Your edit</p>
        <h1>Your edit.</h1>
        <p className="account-page__intro">A considered place for the pieces you've saved, the orders you've placed, and the details that make the experience yours.</p>
      </header>

      <div className="account-layout">
        <nav className="account-nav" aria-label="Account sections">
          <p className="account-nav__title">Your edit</p>
          {sections.map((section) => (
            <button
              className={`account-nav__item ${activeSection === section.id ? 'is-active' : ''}`}
              key={section.id}
              type="button"
              aria-current={activeSection === section.id ? 'page' : undefined}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{section.label}</span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </nav>

        <div className="account-content">
          {activeSection === 'saved' && (
            <section className="account-section" aria-labelledby="saved-heading">
              <div className="account-section__heading">
                <p className="eyebrow">Selected section</p>
                <h2 id="saved-heading">Saved pieces</h2>
                <p>Pieces you've kept in mind.</p>
              </div>
              {savedProducts.length ? (
                <div className="account-product-grid" aria-label="Saved pieces">
                  {savedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showAddToBag />
                  ))}
                </div>
              ) : (
                <div className="account-empty">
                  <h3>Nothing saved yet.</h3>
                  <p>Keep a few pieces in mind while you explore the collection.</p>
                  <Link className="btn btn--secondary" to="/shop">Explore the collection</Link>
                </div>
              )}
            </section>
          )}

          {activeSection === 'orders' && (
            <AccountEmptySection eyebrow="Order record" title="Orders" copy="A record of pieces that have made their way to you." emptyTitle="No orders yet." emptyCopy="Your completed orders will appear here." actionLabel="Start exploring" actionTo="/shop" />
          )}

          {activeSection === 'details' && (
            <section className="account-section" aria-labelledby="details-heading">
              <div className="account-section__heading">
             
                <h2 id="details-heading">Details</h2>
                <p>The information that helps us get things right.</p>
              </div>
              <form className="account-form" onSubmit={(event) => event.preventDefault()}>
                <h3>Personal details</h3>
                <label className="checkout-field"><span>Name</span><input className="input" name="name" value={details.name} onChange={updateDetails} autoComplete="name" /></label>
                <label className="checkout-field"><span>Email</span><input className="input" type="email" name="email" value={details.email} onChange={updateDetails} autoComplete="email" /></label>
                <label className="checkout-field"><span>Phone</span><input className="input" type="tel" name="phone" value={details.phone} onChange={updateDetails} autoComplete="tel" /></label>
                <p className="account-form__note">These details are held in this page only and are not sent to a server.</p>
                <button className="btn btn--primary" type="submit">Save details</button>
              </form>
            </section>
          )}

          {activeSection === 'preferences' && (
            <section className="account-section" aria-labelledby="preferences-heading">
              <div className="account-section__heading">
                <p className="eyebrow">Your rhythm</p>
                <h2 id="preferences-heading">Preferences</h2>
                <p>Your way of experiencing North &amp; Wick.</p>
              </div>
              <form className="account-preferences" onSubmit={(event) => event.preventDefault()}>
                <h3>Communication</h3>
                <label className="preference-row"><span>Collection updates</span><input type="checkbox" name="collectionUpdates" checked={preferences.collectionUpdates} onChange={updatePreference} /></label>
                <label className="preference-row"><span>Order updates</span><input type="checkbox" name="orderUpdates" checked={preferences.orderUpdates} onChange={updatePreference} /></label>
                <h3>Shopping preferences</h3>
                <label className="checkout-field"><span>Preferred size</span><select className="select" name="size" value={preferences.size} onChange={updatePreference}><option>S</option><option>M</option><option>L</option><option>XL</option></select></label>
                <p className="account-form__note">Preferences are held in this page only and are not sent to a server.</p>
              </form>
            </section>
          )}
        </div>
      </div>
    </section>
  )
}

function AccountEmptySection({ eyebrow, title, copy, emptyTitle, emptyCopy, actionLabel, actionTo }) {
  return (
    <section className="account-section" aria-labelledby={`${title.toLowerCase()}-heading`}>
      <div className="account-section__heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${title.toLowerCase()}-heading`}>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="account-empty">
        <h3>{emptyTitle}</h3>
        <p>{emptyCopy}</p>
        <Link className="btn btn--secondary" to={actionTo}>{actionLabel}</Link>
      </div>
    </section>
  )
}
