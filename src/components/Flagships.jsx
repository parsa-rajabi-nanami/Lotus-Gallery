import { products } from '../data/site'
import Heading from './Heading'
import Icon from './Icon'
import ProductCard from './ProductCard'

export default function Flagships() {
  return <section className="section-pad flagships" id="flagships"><div className="container"><Heading overline="THE SIGNATURE COLLECTION" description="آثاری که در آن‌ها، مهندسی دقیق و زیبایی طبیعی به یک زبان مشترک می‌رسند.">چهار امضای <span>لوتوس</span></Heading><div className="product-grid">{products.map((item, i) => <ProductCard item={item} featured={i === 0} key={item.id} />)}</div><a className="center-link" href="#collection">کاوش در کالکشن‌های فاخر <Icon name="arrow" size={17} /></a></div></section>
}
