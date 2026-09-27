import { benefits } from '../data/site'
import Heading from './Heading'
import WireTerrain from './originkit/ui/wire-terrain'

export default function Benefits() {
  return <section className="section-pad benefits" id="atelier"><div className="benefits-terrain"><WireTerrain background="#0D0D0D" lineColor="#E2E8F0" accent="#D4AF37" density={101} speed={56} style={{ minWidth: 0, minHeight: 0 }} /></div><div className="container benefits-content"><Heading overline="THE LOTUS STANDARD" description="از اولین گفت‌وگو تا لحظه‌ای که شاهکار خود را به دست می‌گیرید، استاندارد لوتوس بر شفافیت، تخصص و احترام بنا شده است.">تفاوت، در جزئیات<br /><span>آشکار می‌شود.</span></Heading><div className="benefit-grid">{benefits.map(([n, title, text]) => <article className="benefit" data-reveal="item" key={n}><b className="benefit-number en-text">{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}
