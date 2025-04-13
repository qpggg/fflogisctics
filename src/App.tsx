import { useEffect } from 'react';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Reviews from './components/Reviews'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { startAnimations } from './utils/animations'

function App() {
  useEffect(() => {
    startAnimations();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <CTA />
      <Footer />
    </>
  )
}

export default App
