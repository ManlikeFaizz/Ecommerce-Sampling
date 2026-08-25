import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStorefront } from '../context/StorefrontContext'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, isAuthenticated } = useStorefront()
  const [isProcessing, setIsProcessing] = useState(false)
  const [notice, setNotice] = useState('')

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true, state: { returnTo: '/checkout' } })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsProcessing(true)
    setNotice('')

    window.setTimeout(() => {
      setIsProcessing(false)
      setNotice('Your details are ready. No payment has been processed.')
    }, 900)
  }

  if (!cartItems.length) {
    return (
      <section className="page-section checkout-empty">
        <p className="eyebrow">Checkout</p>
        <h1>Your bag is empty.</h1>
        <p className="lead">There are no pieces waiting to be checked out.</p>
        <Link className="btn btn--primary" to="/shop">Return to shop</Link>
      </section>
    )
  }

  return (
    <section className="page-section checkout-page">
      <header className="checkout-page__header">
        <p className="eyebrow">North &amp; Wick / Checkout</p>
        <h1>Complete your order.</h1>
        <p className="checkout-page__intro">A final review before your pieces make their way to you.</p>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-section" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact</h2>
            <div className="checkout-fields">
              <label className="checkout-field checkout-field--full">
                <span>Email address</span>
                <input className="input" type="email" name="email" autoComplete="email" required />
              </label>
            </div>
          </section>

          <section className="checkout-section" aria-labelledby="delivery-heading">
            <h2 id="delivery-heading">Delivery</h2>
            <div className="checkout-fields">
              <label className="checkout-field checkout-field--full">
                <span>Full name</span>
                <input className="input" type="text" name="name" autoComplete="name" required />
              </label>
              <label className="checkout-field checkout-field--full">
                <span>Address</span>
                <input className="input" type="text" name="address" autoComplete="street-address" required />
              </label>
              <label className="checkout-field">
                <span>Apartment / suite <em>(optional)</em></span>
                <input className="input" type="text" name="apartment" autoComplete="address-line2" />
              </label>
              <label className="checkout-field">
                <span>City</span>
                <input className="input" type="text" name="city" autoComplete="address-level2" required />
              </label>
              <label className="checkout-field">
                <span>State</span>
                <input className="input" type="text" name="state" autoComplete="address-level1" required />
              </label>
              <label className="checkout-field">
                <span>Postal code</span>
                <input className="input" type="text" name="postalCode" inputMode="numeric" autoComplete="postal-code" required />
              </label>
              <label className="checkout-field checkout-field--full">
                <span>Phone number</span>
                <input className="input" type="tel" name="phone" inputMode="tel" autoComplete="tel" required />
              </label>
            </div>
          </section>

          <section className="checkout-section" aria-labelledby="method-heading">
            <h2 id="method-heading">Delivery method</h2>
            <div className="checkout-option checkout-option--selected">
              <div>
                <strong>Complimentary delivery</strong>
                <span>3–5 business days</span>
              </div>
              <span>₹0</span>
            </div>
          </section>

          <section className="checkout-section" aria-labelledby="payment-heading">
            <h2 id="payment-heading">Payment</h2>
            <div className="checkout-payment-options">
              <label className="checkout-option">
                <input type="radio" name="payment" value="card" required />
                <span>Card</span>
              </label>
              <label className="checkout-option">
                <input type="radio" name="payment" value="cod" />
                <span>Cash on delivery</span>
              </label>
            </div>
            <p className="checkout-section__note">Payment is not processed in this frontend preview.</p>
          </section>

          <button className="btn btn--primary checkout-form__submit" type="submit" disabled={isProcessing}>
            {isProcessing ? 'Placing order...' : 'Place order'}
          </button>
          {notice && <p className="checkout-form__notice" role="status">{notice}</p>}
        </form>

        <aside className="checkout-summary" aria-labelledby="order-heading">
          <div className="checkout-summary__heading">
            <p className="eyebrow">Order sheet</p>
            <h2 id="order-heading">Your order</h2>
          </div>
          <div className="checkout-summary__items">
            {cartItems.map((item) => (
              <div className="checkout-summary__item" key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.size} · {item.color}</span>
                  <span>Qty {item.quantity}</span>
                </div>
                <strong>{currency.format(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="checkout-summary__line"><span>Subtotal</span><strong>{currency.format(subtotal)}</strong></div>
          <div className="checkout-summary__line"><span>Shipping</span><span>Complimentary</span></div>
          <div className="checkout-summary__total"><span>Total</span><strong>{currency.format(subtotal)}</strong></div>
          <p className="checkout-summary__reassurance">Your order is prepared with care and delivered complimentary.</p>
          <Link className="checkout-summary__back" to="/cart">Return to bag <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  )
}
