import { useEffect, useRef } from 'react'

/**
 * Returns a ref. When the element enters the viewport, the
 * `visible` class is added so CSS transitions fire.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return ref
}
