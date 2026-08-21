import { Link } from 'react-router-dom'

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="brand-story__image">
        <img src="/catalogue/catalogue-16.jpeg" alt="North & Wick editorial portrait" />
      </div>

      <div className="brand-story__content">
        <p className="eyebrow">Our philosophy</p>
        <h2>Crafted for the rhythm of real life.</h2>
        <p className="lead">
          North & Wick brings together tactile fabrics, confident silhouettes and everyday versatility—pieces that feel premium without demanding attention.
        </p>
        <Link className="btn btn--secondary" to="/shop">
          Discover the brand
        </Link>
      </div>
    </section>
  )
}
