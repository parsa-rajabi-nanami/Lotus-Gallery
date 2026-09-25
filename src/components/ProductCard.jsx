import { asset } from '../lib/asset'
import Icon from './Icon'

export default function ProductCard({ item, featured }) {
  return <article className={featured ? 'product-card featured' : 'product-card'}><div className="product-media"><img src={asset(item.image_url)} alt={item.title_fa} loading="lazy" /><span className="badge en-text">{item.badges?.[0]}</span><a className="media-link" href="#concierge" aria-label="رزرو مشاوره"><Icon name="arrow" size={18} /></a></div><div className="product-info"><div><p className="product-category">{item.category}</p><h3>{item.title_fa}</h3><p className="product-en en-text" dir="ltr">{item.title_en}</p></div><div className="product-price"><small>قیمت اثر</small><strong>{item.price_formatted.replace(' تومان', '')}</strong><span>تومان</span></div></div></article>
}
