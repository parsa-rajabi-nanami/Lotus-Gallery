import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import products from './data/products.json'
import lotusLogo from './assets/branding/lotus-logo-gold.svg'
import './App.css'

const base = import.meta.env.BASE_URL
const asset = (path) => `${base}${path.replace(/^\//, '')}`
const bySku = Object.fromEntries(products.map((item) => [item.sku, item]))
const collections = [
  ['سرویس‌های فاخر', '۱.۲ تا ۵.۸ میلیارد تومان', 'Haute Parure'],
  ['نیم‌ست‌های جواهری', '۴۵۰ میلیون تا ۱.۵ میلیارد تومان', 'Fine Sets'],
  ['حلقه‌های نامزدی', '۲۵۰ میلیون تا ۱.۵ میلیارد تومان', 'Bridal Icons'],
  ['گوشواره‌های جواهری', '۶۴۰ میلیون تا ۱.۳ میلیارد تومان', 'Statement Earrings'],
  ['آویز و گردنبند', '۱۶۵ میلیون تا ۱.۳ میلیارد تومان', 'Neckline Stories'],
]
const benefits = [
  ['01', 'شفافیت ارزش', 'قیمت‌گذاری روشن بر پایه ارزش واقعی اثر و سنگ.'],
  ['02', 'گارانتی مادام‌العمر', 'همراهی تخصصی و خدمات پس از فروش برای انتخابی ماندگار.'],
  ['03', 'گواهی بین‌المللی', 'برای الماس‌های شاخص، مستندات و مشخصات قابل بررسی ارائه می‌شود.'],
  ['04', 'آتلیه اختصاصی', 'ساخت و پرداخت نهایی در کارگاه اختصاصی لوتوس در بازار تهران.'],
]

function Icon({ name, size = 20 }) {
  const content = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M8.5 8.5c.3-.5.7-.5 1-.1l.8 1c.2.3.2.5 0 .8l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.3-.2.5-.2.8 0l1 .8c.4.3.4.7-.1 1-.4.3-1 .4-1.6.1-2.9-1.1-4.9-3.1-6-6-.3-.6-.2-1.2.1-1.6Z" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{content[name]}</svg>
}

function Ticker() {
  const items = ['مثقال آبشده', 'طلای ۱۸ عیار', 'انس جهانی', 'سکه امامی', 'دلار تهران']
  return <div className="ticker"><div className="ticker-track">{[...items, ...items].map((item, i) => <span className="ticker-item" key={`${item}-${i}`}>{item}<b className="en-text">در حال بروزرسانی</b><i /></span>)}</div></div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="nav-shell">
    <a href="#top" className="brand"><img src={lotusLogo} alt="لوتوس" /><span>LOTUS<small>JEWELRY GALLERY</small></span></a>
    <button className="menu-button" type="button" aria-label="منو" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="menu" /></button>
    <nav className={open ? 'main-nav open' : 'main-nav'}><a href="#collection">کالکشن‌ها</a><a href="#flagships">شاهکارهای لوتوس</a><a href="#knowledge">دانش جواهر</a><a href="#concierge">رزرو خصوصی</a></nav>
    <a className="outline-button nav-cta" href="#concierge">رزرو مشاوره VIP <Icon name="arrow" size={16} /></a>
  </div></header>
}

function Hero() {
  const product = bySku['11433']
  return <section className="hero" id="top"><div className="hero-image" style={{ backgroundImage: `url(${asset(product.image_url)})` }} /><div className="hero-content"><p className="eyebrow">LOTUS / HIGH JEWELRY</p><h1>تجلی زیبایی در<br /><em>شاهکارهای ماندگار</em></h1><p className="hero-copy">انتخابی برای کسانی که ارزش را فراتر از زمان می‌بینند؛ مجموعه‌ای از جواهرات فاخر با روایت، اصالت و جزئیات بی‌نقص.</p><div className="hero-actions"><a className="gold-button" href="#flagships">مشاهده کالکشن <Icon name="arrow" size={16} /></a><a className="text-link" href="#concierge">بازدید حضوری <span>↗</span></a></div></div><div className="hero-caption"><b className="en-text">THE CROWN RING</b><span>انگشتر تخمه یک قیراطی GIA</span></div></section>
}

function Heading({ overline, children, description }) {
  return <div className="section-heading"><p className="eyebrow">{overline}</p><h2>{children}</h2>{description && <p>{description}</p>}</div>
}

function Benefits() {
  return <section className="section-pad benefits" id="atelier"><div className="container"><Heading overline="THE LOTUS STANDARD" description="از اولین گفت‌وگو تا لحظه‌ای که شاهکار خود را به دست می‌گیرید، استاندارد لوتوس بر شفافیت، تخصص و احترام بنا شده است.">تفاوت، در جزئیات<br /><span>آشکار می‌شود.</span></Heading><div className="benefit-grid">{benefits.map(([n, title, text]) => <article className="benefit" key={n}><b className="benefit-number en-text">{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}

function ProductCard({ item, featured }) {
  return <article className={featured ? 'product-card featured' : 'product-card'}><div className="product-media"><img src={asset(item.image_url)} alt={item.title_fa} loading="lazy" /><span className="badge en-text">{item.badges?.[0]}</span><a className="media-link" href="#concierge" aria-label="رزرو مشاوره"><Icon name="arrow" size={18} /></a></div><div className="product-info"><div><p className="product-category">{item.category}</p><h3>{item.title_fa}</h3><p className="product-en en-text" dir="ltr">{item.title_en}</p></div><div className="product-price"><small>قیمت اثر</small><strong>{item.price_formatted.replace(' تومان', '')}</strong><span>تومان</span></div></div></article>
}

function Flagships() {
  return <section className="section-pad flagships" id="flagships"><div className="container"><Heading overline="THE SIGNATURE COLLECTION" description="آثاری که در آن‌ها، مهندسی دقیق و زیبایی طبیعی به یک زبان مشترک می‌رسند.">چهار امضای <span>لوتوس</span></Heading><div className="product-grid">{products.map((item, i) => <ProductCard item={item} featured={i === 0} key={item.id} />)}</div><a className="center-link" href="#collection">کاوش در کالکشن‌های فاخر <Icon name="arrow" size={17} /></a></div></section>
}

function Collections() {
  const [active, setActive] = useState(0)
  const item = collections[active]
  return <section className="section-pad collections" id="collection"><div className="container"><div className="collection-top"><Heading overline="CURATED COLLECTIONS">روایت خود را<br /><span>انتخاب کنید.</span></Heading><div className="collection-controls"><button type="button" onClick={() => setActive((active + 4) % 5)}>←</button><span className="en-text">0{active + 1} / 05</span><button type="button" onClick={() => setActive((active + 1) % 5)}>→</button></div></div><div className="collection-stage"><div className="collection-art"><img src={asset(products[active % products.length].image_url)} alt="" /></div><div className="collection-copy"><p className="eyebrow en-text">{item[2]}</p><h3>{item[0]}</h3><p>{item[1]}</p><a className="text-link" href="#concierge">رزرو دیدار خصوصی <span>↗</span></a></div></div><div className="collection-tabs">{collections.map(([title], i) => <button className={i === active ? 'active' : ''} type="button" onClick={() => setActive(i)} key={title}><span className="en-text">0{i + 1}</span>{title}</button>)}</div></div></section>
}

function Showcase() {
  const product = bySku['21180']
  return <section className="video-showcase"><div className="video-frame" style={{ backgroundImage: `url(${asset(product.image_url)})` }}><div className="video-overlay" /><div className="video-content"><p className="eyebrow">THE ART OF LIGHT</p><h2>درخشش، وقتی<br /><em>به اوج می‌رسد.</em></h2><p>سرویس تمام برلیان و تخمه جیبسون؛ تلاقی هنر، نور و ساخت دقیق.</p><a className="outline-button" href="#concierge">مشاهده جزئیات <Icon name="arrow" size={16} /></a></div><span className="video-note en-text">IMAGE PREVIEW / VIDEO PENDING</span></div></section>
}

function Knowledge() {
  const articles = ['۷ اشتباه رایج در انتخاب سنگ قیمتی', 'چطور قیمت واقعی طلا را محاسبه کنیم؟', 'همه‌چیز درباره شاخص ۴C الماس']
  return <section className="section-pad knowledge" id="knowledge"><div className="container"><Heading overline="THE LOTUS JOURNAL" description="قبل از انتخاب، با زبانی روشن و تخصصی بیشتر بدانید.">دانش، بخشی از <span>انتخاب است.</span></Heading><div className="article-list">{articles.map((item, i) => <a className="article-row" href="#concierge" key={item}><span className="en-text">0{i + 1}</span><h3>{item}</h3><b>↗</b></a>)}</div></div></section>
}

function Concierge() {
  const [sent, setSent] = useState(false)
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const message = `سلام، برای رزرو بازدید خصوصی لوتوس درخواست دارم. نام: ${data.get('name')}، زمان: ${data.get('time')}`; window.open(`https://wa.me/989363793110?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); setSent(true) }
  return <section className="section-pad concierge" id="concierge"><div className="container concierge-grid"><div><p className="eyebrow">PRIVATE APPOINTMENT</p><h2>انتخاب شما،<br /><em>تشریفات خودش را دارد.</em></h2><p className="concierge-copy">برای تجربه‌ای خصوصی و متناسب با سلیقه شما، زمان بازدید خود را در آتلیه لوتوس رزرو کنید.</p><div className="address"><span>تهران، بازار بزرگ</span><small>خیابان ۱۵ خرداد، پاساژ چیت‌ساز، طبقه ۴</small></div></div><form className="concierge-form" onSubmit={submit}><label>نام و نام خانوادگی<input name="name" required placeholder="نام شما" /></label><label>زمان پیشنهادی<select name="time" defaultValue="" required><option value="" disabled>انتخاب زمان</option><option>صبح، ۸ تا ۱۲</option><option>ظهر، ۱۲ تا ۱۶</option><option>عصر، ۱۶ تا ۲۱</option></select></label><button className="gold-button" type="submit">{sent ? 'درخواست آماده شد' : 'ادامه در واتساپ'} <Icon name="whatsapp" size={18} /></button><p className="form-note">با انتخاب ادامه، وارد گفت‌وگوی واتساپ مدیریت می‌شوید.</p></form></div></section>
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><a href="#top" className="brand"><img src={lotusLogo} alt="لوتوس" /><span>LOTUS<small>JEWELRY GALLERY</small></span></a><p>سرمایه‌گذاری ماندگار، با انتخابی که از زمان عبور می‌کند.</p><a href="#top" className="back-top">بازگشت به بالا ↑</a></div><div className="footer-bottom"><div><small>تماس با ما</small><a href="tel:+982133941295">۰۲۱-۳۳۹۴۱۲۹۵</a><a href="tel:+989363793110">۰۹۳۶۳۷۹۳۱۱۰</a></div><div><small>ساعات فعالیت</small><span>هر روز، ۸ تا ۲۱</span></div><div><small>آدرس</small><span>پاساژ چیت‌ساز، طبقه ۴</span></div><span className="copyright en-text">© 2026 LOTUS GALLERY</span></div></div></footer>
}

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
