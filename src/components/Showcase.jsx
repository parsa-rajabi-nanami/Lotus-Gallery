import { bySku } from '../data/site'
import { asset } from '../lib/asset'
import Icon from './Icon'

export default function Showcase() {
  const product = bySku['21180']
  return <section className="video-showcase"><div className="video-frame" style={{ backgroundImage: `url(${asset(product.image_url)})` }}><div className="video-overlay" /><div className="video-content"><p className="eyebrow">THE ART OF LIGHT</p><h2>درخشش، وقتی<br /><em>به اوج می‌رسد.</em></h2><p>سرویس تمام برلیان و تخمه جیبسون؛ تلاقی هنر، نور و ساخت دقیق.</p><a className="outline-button" href="#concierge">مشاهده جزئیات <Icon name="arrow" size={16} /></a></div><span className="video-note en-text">IMAGE PREVIEW / VIDEO PENDING</span></div></section>
}
