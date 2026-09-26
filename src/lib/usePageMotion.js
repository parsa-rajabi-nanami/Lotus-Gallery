import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const variants = {
  heading: { from: { autoAlpha: 0, y: 34 }, to: { autoAlpha: 1, y: 0 } },
  item: { from: { autoAlpha: 0, y: 28 }, to: { autoAlpha: 1, y: 0 } },
  card: { from: { autoAlpha: 0, y: 42, scale: .96 }, to: { autoAlpha: 1, y: 0, scale: 1 } },
  media: { from: { autoAlpha: 0, y: 24, scale: .97 }, to: { autoAlpha: 1, y: 0, scale: 1 } },
  row: { from: { autoAlpha: 0, x: 26 }, to: { autoAlpha: 1, x: 0 } },
  panel: { from: { autoAlpha: 0, y: 36, scale: .985 }, to: { autoAlpha: 1, y: 0, scale: 1 } },
}

const reveal = (element, type = 'item') => {
  const variant = variants[type] || variants.item
  return gsap.fromTo(element, variant.from, {
    ...variant.to,
    duration: type === 'card' ? .9 : .75,
    ease: type === 'media' ? 'power3.out' : 'power2.out',
    overwrite: 'auto',
    scrollTrigger: {
      trigger: element,
      start: 'top 86%',
      once: true,
    },
  })
}

export function usePageMotion() {
  const scope = useRef(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = gsap.utils.toArray('[data-reveal="hero"]')
    const revealElements = gsap.utils.toArray('[data-reveal]:not([data-reveal="hero"])')

    if (reduceMotion) {
      gsap.set([...hero, ...revealElements], { clearProps: 'all', autoAlpha: 1 })
      return
    }

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    heroTimeline
      .fromTo('.hero-stage-inner', { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.5 }, 0)
      .fromTo(hero, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .95, stagger: .1 }, .18)
      .fromTo('.hero-caption', { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: .7 }, .58)

    revealElements.forEach((element) => {
      reveal(element, element.dataset.reveal)
    })

    ScrollTrigger.refresh()
  }, { scope })

  return scope
}
