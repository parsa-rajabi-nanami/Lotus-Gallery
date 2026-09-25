import { useEffect } from 'react'
import { gsap } from 'gsap'
import Benefits from './components/Benefits'
import Collections from './components/Collections'
import Concierge from './components/Concierge'
import Footer from './components/Footer'
import Flagships from './components/Flagships'
import Hero from './components/Hero'
import Knowledge from './components/Knowledge'
import Nav from './components/Nav'
import Showcase from './components/Showcase'
import Ticker from './components/Ticker'
import './App.css'

function App() {
  useEffect(() => {
    document.documentElement.lang = 'fa'
    document.documentElement.dir = 'rtl'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let observer
    const context = gsap.context(() => {
      gsap.fromTo('.hero-content', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .9, ease: 'power2.out' })
      const elements = document.querySelectorAll('.section-heading, .benefit, .product-card, .collection-stage, .article-row, .concierge-grid')
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out' })
          observer.unobserve(entry.target)
        }
      }), { threshold: .12 })
      elements.forEach((element) => observer.observe(element))
    })
    return () => { observer?.disconnect(); context.revert() }
  }, [])

  return <div className="app"><Ticker /><Nav /><main><Hero /><Benefits /><Flagships /><Collections /><Showcase /><Knowledge /><Concierge /></main><Footer /></div>
}

export default App
