import { Link } from 'react-router-dom'

export default function CollectionFeature() {
  return (
    <section className="collection-feature">
      <div className="collection-feature__content">
        <p className="eyebrow">The current edit</p>
        <h2>Seasonal layers, rooted in texture.</h2>
        <p className="lead">
          A restrained edit of structured cottons, earthy tones and relaxed fits designed to move seamlessly through work, evenings and weekends.
        </p>
        <Link className="btn btn--primary" to="/shop">
          Shop the collection
        </Link>
      </div>

      <div className="collection-feature__image">
        <img src="/catalogue/catalogue-24.jpeg" alt="Curated collection highlight" />
      </div>
    </section>
  )
}
