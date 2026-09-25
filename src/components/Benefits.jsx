import { benefits } from '../data/site'
import Heading from './Heading'

export default function Benefits() {
  return <section className="section-pad benefits" id="atelier"><div className="container"><Heading overline="THE LOTUS STANDARD" description="از اولین گفت‌وگو تا لحظه‌ای که شاهکار خود را به دست می‌گیرید، استاندارد لوتوس بر شفافیت، تخصص و احترام بنا شده است.">تفاوت، در جزئیات<br /><span>آشکار می‌شود.</span></Heading><div className="benefit-grid">{benefits.map(([n, title, text]) => <article className="benefit" data-reveal="item" key={n}><b className="benefit-number en-text">{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}
