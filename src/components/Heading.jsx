export default function Heading({ overline, children, description }) {
  return <div className="section-heading" data-reveal="heading"><p className="eyebrow">{overline}</p><h2>{children}</h2>{description && <p>{description}</p>}</div>
}
