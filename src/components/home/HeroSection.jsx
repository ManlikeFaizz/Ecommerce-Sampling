import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const heroSlides = [
  { image: '/catalogue/catalogue-1.jpeg', accent: 'Signature Edit', label: 'Seasonal layers' },
  { image: '/catalogue/catalogue-2.jpeg', accent: 'City Form', label: 'Grounded tones' },
  { image: '/catalogue/catalogue-3.jpeg', accent: 'Field Notes', label: 'Quiet confidence' },
  { image: '/catalogue/catalogue-4.jpeg', accent: 'The Studio', label: 'Everyday ease' },
]

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(intervalId)
  }, [])

  const activeSlide = heroSlides[activeIndex]

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">North & Wick</p>
        <h1>Made for the everyday. Refined for everywhere.</h1>
        <p className="lead">
          Premium menswear shaped by quiet confidence, natural texture and silhouettes that work across the rhythm of the day.
        </p>
        <div className="button-row">
          <Link className="btn btn--primary" to="/shop">
            Shop the edit
          </Link>
          <Link className="btn btn--secondary" to="/shop">
            View collections
          </Link>
        </div>
      </div>

      <div className="hero-visual" aria-label="Featured brand campaign image" aria-live="polite">
        <img src={activeSlide.image} alt="Editorial menswear campaign" />
        <div className="hero-visual__card hero-visual__card--top">
          <span>{activeSlide.accent}</span>
          <strong>{activeSlide.label}</strong>
        </div>
        <div className="hero-visual__card hero-visual__card--bottom">
          <span>Crafted</span>
          <strong>Premium cotton</strong>
        </div>
      </div>
    </section>
  )
}
