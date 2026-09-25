export default function Icon({ name, size = 20 }) {
  const content = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M8.5 8.5c.3-.5.7-.5 1-.1l.8 1c.2.3.2.5 0 .8l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.3-.2.5-.2.8 0l1 .8c.4.3.4.7-.1 1-.4.3-1 .4-1.6.1-2.9-1.1-4.9-3.1-6-6-.3-.6-.2-1.2.1-1.6Z" /></>,
  }

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{content[name]}</svg>
}
