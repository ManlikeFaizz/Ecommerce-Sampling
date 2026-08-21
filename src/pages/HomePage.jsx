import BrandStory from '../components/home/BrandStory'
import CategoryShowcase from '../components/home/CategoryShowcase'
import CollectionFeature from '../components/home/CollectionFeature'
import EditorialSection from '../components/home/EditorialSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HeroSection from '../components/home/HeroSection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <BrandStory />
      <CollectionFeature />
      <EditorialSection />
      <NewsletterSection />
    </div>
  )
}
