import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const FRAME_COUNT = 120
const PRIORITY_FRAMES = 15
const HERO_SCROLL_DISTANCE = '+=1550vh'
const cache = { desktop: new Map(), mobile: new Map() }
const pending = { desktop: new Map(), mobile: new Map() }

const getFrameUrl = (mode, index) => `/assets/hero/${mode}/frame-${String(index + 1).padStart(4, '0')}.jpg`

function loadFrame(mode, index) {
  if (cache[mode].has(index)) return Promise.resolve(cache[mode].get(index))
  if (pending[mode].has(index)) return pending[mode].get(index)

  const promise = new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      const decoded = image.decode ? image.decode().catch(() => undefined) : Promise.resolve()
      decoded.then(() => {
        cache[mode].set(index, image)
        pending[mode].delete(index)
        resolve(image)
      })
    }
    image.onerror = reject
    image.src = getFrameUrl(mode, index)
  })

  pending[mode].set(index, promise)
  return promise
}

function findLoadedFrame(mode, index) {
  if (cache[mode].has(index)) return cache[mode].get(index)
  for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
    if (cache[mode].has(index - distance)) return cache[mode].get(index - distance)
    if (cache[mode].has(index + distance)) return cache[mode].get(index + distance)
  }
  return null
}

function drawCover(context, image, width, height) {
  // الگوریتم دقیق Cover: محاسبه مقیاس بر اساس بزرگترین نسبت برای پوشش کامل و کراپ کردن اضافات
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  
  // استفاده از Math.ceil برای جلوگیری از باگ رندرینگ ساب‌پیکسل و پر کردن قطعی لبه‌ها
  const drawWidth = Math.ceil(image.naturalWidth * scale)
  const drawHeight = Math.ceil(image.naturalHeight * scale)
  
  // استفاده از Math.round برای مختصات دهی دقیق و مرکزی
  const x = Math.round((width - drawWidth) / 2)
  const y = Math.round((height - drawHeight) / 2)
  
  context.drawImage(image, x, y, drawWidth, drawHeight)
}

export default function Hero() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(0)
  const frameState = useRef({ frame: 0 })
  const requestFrameRef = useRef(() => {})
  
  const [mode, setMode] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop'
  )

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const updateMode = (event) => setMode(event.matches ? 'mobile' : 'desktop')
    media.addEventListener('change', updateMode)
    return () => media.removeEventListener('change', updateMode)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return undefined

    const context = canvas.getContext('2d', { alpha: false })
    let animationFrame = 0
    let cancelled = false
    let timerId = null
    let isIdleCallback = false
    let nextBackgroundFrame = PRIORITY_FRAMES

    // حذف Aspect Ratio تحمیلی؛ استفاده از ابعاد واقعی برای جلوگیری از بیرون‌زدگی محتوا
    const resize = () => {
      // استفاده از clientHeight و clientWidth کانتینر
      const width = stage.clientWidth || window.innerWidth
      const height = stage.clientHeight || window.innerHeight 
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      const image = findLoadedFrame(mode, frameRef.current)
      if (image) drawCover(context, image, width, height)
    }

    const drawFrame = (index) => {
      const image = findLoadedFrame(mode, index)
      if (!image) return
      frameRef.current = index
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      
      context.clearRect(0, 0, width, height)
      drawCover(context, image, width, height)
      canvas.classList.add('is-ready')
    }

    const scheduleDraw = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0
        drawFrame(Math.round(frameState.current.frame))
      })
    }
    requestFrameRef.current = scheduleDraw

    const loadBackgroundChunk = () => {
      if (cancelled) return
      const indexes = Array.from({ length: 8 }, (_, offset) => nextBackgroundFrame + offset)
        .filter((index) => index < FRAME_COUNT)
        
      if (!indexes.length) return
      nextBackgroundFrame += indexes.length
      
      Promise.all(indexes.map((index) => loadFrame(mode, index).catch(() => null))).then(() => {
        if (!cancelled) scheduleDraw()
      })
      
      if ('requestIdleCallback' in window) {
        isIdleCallback = true
        timerId = window.requestIdleCallback(loadBackgroundChunk, { timeout: 800 })
      } else {
        isIdleCallback = false
        timerId = window.setTimeout(loadBackgroundChunk, 80)
      }
    }

    const observer = new ResizeObserver(resize)
    observer.observe(stage)
    resize()

    loadFrame(mode, 0).then(() => {
      if (!cancelled) {
        drawFrame(0)
        Promise.all(Array.from({ length: PRIORITY_FRAMES - 1 }, (_, index) => loadFrame(mode, index + 1).catch(() => null)))
          .then(() => { if (!cancelled) scheduleDraw() })
        loadBackgroundChunk()
      }
    }).catch(() => undefined)

    return () => {
      cancelled = true
      observer.disconnect()
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      requestFrameRef.current = () => {}
      
      // دیباگ پاکسازی مطمئن مموری برای تایمرها
      if (timerId !== null) {
        if (isIdleCallback && 'cancelIdleCallback' in window) {
          window.cancelIdleCallback(timerId)
        } else {
          window.clearTimeout(timerId)
        }
      }
    }
  }, [mode])

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = heroRef.current
    const stage = stageRef.current
    if (!hero || !stage || reduceMotion) return

    const frameTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 0, 
        end: HERO_SCROLL_DISTANCE,
        pin: true,
        pinSpacing: true,
        scrub: 1.2, 
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    frameTimeline.to(frameState.current, {
      frame: FRAME_COUNT - 1,
      duration: 1,
      ease: 'none',
      onUpdate: () => requestFrameRef.current(),
    })

    // دیباگ رفع مشکل باکس شیشه‌ای: همیشه خود کانتینر اصلی محو می‌شود
    frameTimeline.to('.hero-content', { 
      y: -60, 
      autoAlpha: 0, 
      scale: 0.96, 
      duration: 0.25,
      force3D: true
    }, 0)

    const xTo = gsap.quickTo(stage, 'rotationY', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo(stage, 'rotationX', { duration: 0.8, ease: 'power3.out' })
    const resetTilt = () => { xTo(0); yTo(0) }
    
    const onPointerMove = (event) => {
      const bounds = stage.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      xTo(x * 3)
      yTo(y * -3)
    }

    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('pointerleave', resetTilt, { passive: true })
    return () => {
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', resetTilt)
    }
  }, { scope: heroRef, dependencies: [mode], revertOnUpdate: true })

  const fallbackSrc = getFrameUrl(mode, 0)

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-stage" ref={stageRef}>
        <div className="hero-stage-inner">
          <img className="hero-fallback" src={fallbackSrc} alt="" aria-hidden="true" />
          <canvas className="hero-canvas" ref={canvasRef} aria-label="نمایش سینمایی کالکشن لوتوس" />
        </div>
      </div>
      <div className="hero-content" dir="rtl">
        <div className="hero-hud hero-hud-top">
          <p className="eyebrow" data-reveal="hero">LOTUS / HIGH JEWELRY</p>
          <h1 data-reveal="hero">تجلی زیبایی در<br /><em>شاهکارهای ماندگار</em></h1>
        </div>
        <div className="hero-hud hero-hud-bottom">
          <p className="hero-copy" data-reveal="hero">انتخابی برای کسانی که ارزش را فراتر از زمان می‌بینند؛ مجموعه‌ای از جواهرات فاخر با اصالت و جزئیات بی‌نقص.</p>
          <div className="hero-actions" data-reveal="hero">
            <a className="gold-button" href="#flagships">مشاهده کالکشن <Icon name="arrow" size={16} /></a>
            <a className="hero-visit-link" href="#concierge">بازدید حضوری <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}