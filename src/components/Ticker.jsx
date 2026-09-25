import { useEffect, useRef } from 'react'
import { goldPrices } from '../data/site'

const AUTO_SPEED = 18
const SEGMENT_COUNT = 4

export default function Ticker() {
  const viewportRef = useRef(null)
  const segmentWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const resumeTimerRef = useRef(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const segment = viewport?.querySelector('.ticker-segment')
    if (!viewport || !segment) return undefined

    const normalize = () => {
      const width = segmentWidthRef.current
      if (!width) return
      if (viewport.scrollLeft < width * .5) viewport.scrollLeft += width
      if (viewport.scrollLeft > width * 1.5) viewport.scrollLeft -= width
    }

    const updateWidth = () => {
      const nextWidth = segment.getBoundingClientRect().width
      if (!nextWidth) return
      const previousWidth = segmentWidthRef.current
      segmentWidthRef.current = nextWidth
      if (!previousWidth) viewport.scrollLeft = nextWidth
      else if (previousWidth !== nextWidth) viewport.scrollLeft += nextWidth - previousWidth
      normalize()
    }

    const observer = new ResizeObserver(updateWidth)
    let frame
    let previousTime
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = motionQuery.matches

    const handleMotionChange = (event) => {
      prefersReducedMotion = event.matches
      previousTime = undefined
    }
    const handleVisibilityChange = () => { previousTime = undefined }

    const animate = (time) => {
      if (previousTime !== undefined && !pausedRef.current && !prefersReducedMotion && document.visibilityState === 'visible') {
        viewport.scrollLeft += ((time - previousTime) / 1000) * AUTO_SPEED
        normalize()
      }
      previousTime = time
      frame = requestAnimationFrame(animate)
    }

    updateWidth()
    observer.observe(segment)
    motionQuery.addEventListener?.('change', handleMotionChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(resumeTimerRef.current)
      observer.disconnect()
      motionQuery.removeEventListener?.('change', handleMotionChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const move = (direction) => {
    const viewport = viewportRef.current
    if (!viewport) return
    pausedRef.current = true
    clearTimeout(resumeTimerRef.current)
    viewport.scrollBy({ left: direction * 240, behavior: 'smooth' })
    resumeTimerRef.current = window.setTimeout(() => { pausedRef.current = false }, 700)
  }

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }
  const releasePointer = (event) => {
    if (event.pointerType !== 'mouse') resume()
  }

  return <section className="ticker" aria-label="قیمت‌های مرجع امروز">
    <button className="ticker-control ticker-control-prev" type="button" onClick={() => move(-1)} aria-controls="ticker-viewport" aria-label="حرکت به قیمت‌های قبلی">←</button>
    <div
      className="ticker-viewport"
      id="ticker-viewport"
      ref={viewportRef}
      role="region"
      tabIndex="0"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onPointerDown={pause}
      onPointerUp={releasePointer}
      onPointerCancel={resume}
      onFocus={pause}
      onBlur={resume}
      aria-label="قیمت‌های مرجع امروز، برای مرور دستی قابل پیمایش است"
    >
      <div className="ticker-track">
        {Array.from({ length: SEGMENT_COUNT }, (_, segment) => <div className="ticker-segment" aria-hidden={segment !== 1} key={segment}>
          {goldPrices.map(([name, price, unit]) => <span className="ticker-item" key={`${segment}-${name}`}><span>{name}</span><b dir="ltr">{price}</b><small>{unit}</small><i /></span>)}
        </div>)}
      </div>
    </div>
    <button className="ticker-control ticker-control-next" type="button" onClick={() => move(1)} aria-controls="ticker-viewport" aria-label="حرکت به قیمت‌های بعدی">→</button>
  </section>
}
