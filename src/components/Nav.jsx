import { useState } from 'react'
import lotusLogo from '../assets/branding/lotus-logo-gold.svg'
import Icon from './Icon'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="nav-shell">
    <a href="#top" className="brand"><img src={lotusLogo} alt="لوتوس" /><span>LOTUS<small>JEWELRY GALLERY</small></span></a>
    <button className="menu-button" type="button" aria-label="منو" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><Icon name="menu" /></button>
    <nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'}><a href="#collection">کالکشن‌ها</a><a href="#flagships">شاهکارهای لوتوس</a><a href="#knowledge">دانش جواهر</a><a href="#concierge">رزرو خصوصی</a></nav>
    <a className="outline-button nav-cta" href="#concierge">رزرو مشاوره VIP <Icon name="arrow" size={16} /></a>
  </div></header>
}
