import { useState } from 'react'

export default function ProductAccordion({ product }) {
  const [openIndex, setOpenIndex] = useState(0)

  const details = [
    {
      title: 'Details',
      content: (
        <>
          <p>{product.description}</p>
          <ul className="accordion-list">
            <li>Collection: {product.collection}</li>
            <li>Colour: {product.color}</li>
            <li>Pattern: {product.pattern}</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Fabric & care',
      content: `Crafted in ${product.fabric.toLowerCase()} with a considered finish designed for everyday wear. Machine wash cold, line dry and steam as needed.`,
    },
    {
      title: 'Shipping',
      content: 'Free shipping on orders over ₹4,999. Standard delivery within 4–6 business days.',
    },
  ]

  return (
    <div className="product-accordion">
      {details.map((item, index) => (
        <div key={item.title} className={`accordion-item ${openIndex === index ? 'is-open' : ''}`}>
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.title}</span>
            <span aria-hidden="true">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && <div className="accordion-content">{item.content}</div>}
        </div>
      ))}
    </div>
  )
}
