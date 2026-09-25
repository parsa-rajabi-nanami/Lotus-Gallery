import { useEffect } from 'react'
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
import { usePageMotion } from './lib/usePageMotion'
import './App.css'

function App() {
  const appRef = usePageMotion()

  useEffect(() => {
    document.documentElement.lang = 'fa'
    document.documentElement.dir = 'rtl'
  }, [])

  return <div className="app" ref={appRef}><Ticker /><Nav /><main><Hero /><Benefits /><Flagships /><Collections /><Showcase /><Knowledge /><Concierge /></main><Footer /></div>
}

export default App
