import Navbar          from './components/Navbar'
import HeroSection      from './components/HeroSection'
import ServicesSection  from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import { CtaSection, Footer } from './components/CtaSection'
import ChatWidget       from './components/ChatWidget'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <CtaSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
