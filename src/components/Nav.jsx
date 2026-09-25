import { useEffect, useRef, useState } from 'react'
import lotusLogo from '../assets/branding/lotus-logo-gold.svg'
import Icon from './Icon'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const shellRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const closeOnOutsideClick = (event) => {
      if (!shellRef.current?.contains(event.target)) setOpen(false)
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return <header className="site-header"><div className="nav-shell" ref={shellRef}>
    <a href="#top" className="brand"><img src={lotusLogo} alt="لوتوس" /><span>LOTUS<small>JEWELRY GALLERY</small></span></a>
    <button className={open ? 'menu-button is-open' : 'menu-button'} type="button" aria-label={open ? 'بستن منو' : 'باز کردن منو'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}><Icon name="menu" /></button>
    <nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'} onClick={() => setOpen(false)}><a href="#collection">کالکشن‌ها</a><a href="#flagships">شاهکارهای لوتوس</a><a href="#knowledge">دانش جواهر</a><a href="#concierge">رزرو خصوصی</a><a className="outline-button nav-cta" href="#concierge">رزرو مشاوره VIP <Icon name="arrow" size={16} /></a></nav>
  </div></header>
}
