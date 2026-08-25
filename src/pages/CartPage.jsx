import { Link, useNavigate } from 'react-router-dom'
import { useStorefront } from '../context/StorefrontContext'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export default function CartPage() {
  const navigate = useNavigate()
  const { cartItems, updateCartQuantity, removeFromCart, isAuthenticated } = useStorefront()
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const handleCheckout = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', isAuthenticated ? undefined : { state: { returnTo: '/checkout' } })
  }

  if (!cartItems.length) {
    return (
      <section className="page-section cart-empty">
        <div className="cart-empty__copy">
          <p className="eyebrow">Your bag</p>
          <h1>Your bag is waiting.</h1>
          <p className="lead">Take your time with the collection and find the pieces that belong in your everyday rotation.</p>
          <Link className="btn btn--primary" to="/shop">Continue shopping</Link>
        </div>
        <div className="cart-empty__sketch" aria-hidden="true">
          <span className="cart-empty__sketch-handle" />
          <span className="cart-empty__sketch-bag" />
        </div>
      </section>
    )
  }

  return (
    <section className="page-section cart-page">
      <header className="cart-page__header">
        <div>
          <p className="eyebrow">North &amp; Wick / Order sheet</p>
          <h1>Your bag</h1>
        </div>
        <p className="cart-page__intro">A considered edit of pieces selected for your wardrobe.</p>
      </header>

      <div className="cart-layout">
        <div className="cart-items" aria-label="Cart items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link className="cart-item__image-link" to={`/product/${item.productId}`}>
                <img className="cart-item__image" src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item__details">
                <div className="cart-item__topline">
                  <div>
                    <p className="cart-item__category">Shirts</p>
                    <h2><Link to={`/product/${item.productId}`}>{item.name}</Link></h2>
                  </div>
                  <p className="cart-item__total">{currency.format(item.price * item.quantity)}</p>
                </div>
                <p className="cart-item__meta">Colour: {item.color} <span aria-hidden="true">·</span> Size: {item.size}</p>
                <div className="cart-item__controls">
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => updateCartQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateCartQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                  <button type="button" className="cart-item__remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  <span className="cart-item__unit">{currency.format(item.price)} each</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary" aria-label="Order summary">
          <p className="eyebrow">Summary</p>
          <div className="cart-summary__line"><span>Subtotal</span><strong>{currency.format(subtotal)}</strong></div>
          <div className="cart-summary__line"><span>Shipping</span><span>Complimentary</span></div>
          <p className="cart-summary__note">Complimentary delivery on every North &amp; Wick order.</p>
          <div className="cart-summary__total"><span>Total</span><strong>{currency.format(subtotal)}</strong></div>
          <button className="btn btn--primary cart-summary__cta" type="button" onClick={handleCheckout}>Proceed to checkout</button>
          <Link className="cart-summary__continue" to="/shop">Continue shopping <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  )
}