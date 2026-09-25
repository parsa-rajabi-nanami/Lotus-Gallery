import { useState } from 'react'
import { collections, products } from '../data/site'
import { asset } from '../lib/asset'
import Heading from './Heading'

export default function Collections() {
  const [active, setActive] = useState(0)
  const item = collections[active]
  return <section className="section-pad collections" id="collection"><div className="container"><div className="collection-top"><Heading overline="CURATED COLLECTIONS">روایت خود را<br /><span>انتخاب کنید.</span></Heading><div className="collection-controls"><button type="button" onClick={() => setActive((active + 4) % 5)}>←</button><span className="en-text">0{active + 1} / 05</span><button type="button" onClick={() => setActive((active + 1) % 5)}>→</button></div></div><div className="collection-stage" data-reveal="media"><div className="collection-art"><img src={asset(products[active % products.length].image_url)} alt="" /></div><div className="collection-copy"><p className="eyebrow en-text">{item[2]}</p><h3>{item[0]}</h3><p>{item[1]}</p><a className="text-link" href="#concierge">رزرو دیدار خصوصی <span>↗</span></a></div></div><div className="collection-tabs">{collections.map(([title], i) => <button className={i === active ? 'active' : ''} type="button" onClick={() => setActive(i)} key={title}><span className="en-text">0{i + 1}</span>{title}</button>)}</div></div></section>
}
