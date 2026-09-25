import { bySku } from '../data/site'
import { asset } from '../lib/asset'
import Icon from './Icon'

export default function Hero() {
  const product = bySku['11433']
  return <section className="hero" id="top"><div className="hero-image" style={{ backgroundImage: `url(${asset(product.image_url)})` }} /><div className="hero-content"><p className="eyebrow">LOTUS / HIGH JEWELRY</p><h1>تجلی زیبایی در<br /><em>شاهکارهای ماندگار</em></h1><p className="hero-copy">انتخابی برای کسانی که ارزش را فراتر از زمان می‌بینند؛ مجموعه‌ای از جواهرات فاخر با روایت، اصالت و جزئیات بی‌نقص.</p><div className="hero-actions"><a className="gold-button" href="#flagships">مشاهده کالکشن <Icon name="arrow" size={16} /></a><a className="text-link" href="#concierge">بازدید حضوری <span>↗</span></a></div></div><div className="hero-caption"><b className="en-text">THE CROWN RING</b><span>انگشتر تخمه یک قیراطی GIA</span></div></section>
}
