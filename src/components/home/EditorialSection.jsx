import { Link } from 'react-router-dom'

export default function EditorialSection() {
  return (
    <section className="editorial-section">
      <div className="editorial-section__content">
        <p className="eyebrow">Editor’s selection</p>
        <h2>Minimal silhouettes. Maximum character.</h2>
        <p className="lead">
          The current edit is built around texture, proportion and tonal depth—outfits that feel easy in motion and elevated in composition.
        </p>
        <Link className="text-link" to="/shop">
          Explore the edit
        </Link>
      </div>

      <div className="editorial-section__stack">
        <img src="/catalogue/catalogue-29.jpeg" alt="Editorial product close-up" />
        <img src="/catalogue/catalogue-35.jpeg" alt="Editorial detail portrait" />
      </div>
    </section>
  )
}
