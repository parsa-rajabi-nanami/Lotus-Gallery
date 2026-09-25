import { goldPrices } from '../data/site'

const SEGMENT_COUNT = 4

export default function Ticker() {
  return <section className="ticker" aria-label="قیمت‌های مرجع امروز">
    <div className="ticker-viewport" role="region" aria-label="قیمت‌های مرجع امروز">
      <div className="ticker-track">
        {Array.from({ length: SEGMENT_COUNT }, (_, segment) => <div className="ticker-segment" aria-hidden={segment !== 1} key={segment}>
          {goldPrices.map(([name, price, unit]) => <span className="ticker-item" key={`${segment}-${name}`}>
            <span>{name}</span>
            <b dir="ltr">{price}</b>
            <small>{unit}</small>
            <i />
          </span>)}
        </div>)}
      </div>
    </div>
  </section>
}
