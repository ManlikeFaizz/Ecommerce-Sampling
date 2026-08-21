import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Shirts',
    description: 'Refined everyday layers',
    image: '/catalogue/catalogue-2.jpeg',
    to: '/shop',
  },
  {
    name: 'Signature Edit',
    description: 'Built for the season',
    image: '/catalogue/catalogue-7.jpeg',
    to: '/shop',
  },
  {
    name: 'New Arrivals',
    description: 'Fresh textures and tones',
    image: '/catalogue/catalogue-11.jpeg',
    to: '/shop',
  },
  {
    name: 'Collections',
    description: 'Quiet statement dressing',
    image: '/catalogue/catalogue-18.jpeg',
    to: '/shop',
  },
]

export default function CategoryShowcase() {
  return (
    <section className="home-section">
      <div className="section-heading">
        <p className="eyebrow">Browse by world</p>
        <h2>Curated for everyday refinement.</h2>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.name} to={category.to} className="category-card">
            <img src={category.image} alt={category.name} />
            <div className="category-card__content">
              <span>{category.name}</span>
              <strong>{category.description}</strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
