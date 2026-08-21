export default function ProductInformation({ product }) {
  return (
    <div className="product-information">
      <p className="detail-collection">{product.collection}</p>
      <h1>{product.name}</h1>

      <div className="price-row">
        <span className="price">₹{product.price}</span>
        {product.compareAtPrice ? <span className="compare-at">₹{product.compareAtPrice}</span> : null}
      </div>

      <p className="lead">{product.description}</p>

      <div className="product-meta">
        <div className="product-meta__item">
          <span>Fabric</span>
          <strong>{product.fabric}</strong>
        </div>
        <div className="product-meta__item">
          <span>Colour</span>
          <strong>{product.color}</strong>
        </div>
        <div className="product-meta__item">
          <span>Pattern</span>
          <strong>{product.pattern}</strong>
        </div>
      </div>
    </div>
  )
}
