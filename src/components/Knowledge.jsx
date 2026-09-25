import { articles } from '../data/site'
import Heading from './Heading'

export default function Knowledge() {
  return <section className="section-pad knowledge" id="knowledge"><div className="container"><Heading overline="THE LOTUS JOURNAL" description="قبل از انتخاب، با زبانی روشن و تخصصی بیشتر بدانید.">دانش، بخشی از <span>انتخاب است.</span></Heading><div className="article-list">{articles.map((item, i) => <a className="article-row" href="#concierge" key={item}><span className="en-text">0{i + 1}</span><h3>{item}</h3><b>↗</b></a>)}</div></div></section>
}
