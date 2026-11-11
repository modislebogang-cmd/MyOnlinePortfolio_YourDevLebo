import { useEffect, useRef } from 'react'

/**
 * The matrix background is 2D (three.js is optional). This hook returns
 * nothing webgl-specific; it exists so the MatrixRain canvas can be swapped
 * for a three.js scene later without touching the Intro page.
 */

/**
 * Makes an element tilt in 3D toward the cursor.
 *
 * - Writes the rotation to CSS custom properties instead of React state,
 *   so pointer moves never trigger a re-render (smooth at 60fps).
 * - Uses a rAF loop that eases the current rotation toward the target,
 *   giving the laptop weight/momentum instead of snapping.
 * - Smoothly returns to rest when the pointer leaves the window.
 *
 * @param {number} max   maximum tilt in degrees per axis
 */
export function useCursorTilt(max = 14, enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const el = ref.current
    if (!el) return undefined

    // Respect users who asked for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let rafId = 0
    let cancelled = false

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      const cx = window.innerWidth / 2 || 1
      const cy = window.innerHeight / 2 || 1
      // -1..1 relative to the centre of the viewport.
      const dx = (clientX - cx) / cx
      const dy = (clientY - cy) / cy

      // Move *in the direction of* the cursor: pointing right tilts the
      // right edge away (rotateY positive), pointing down tilts forward.
      target.y = dx * max
      target.x = -dy * max
    }

    const onPointerLeave = () => {
      target.x = 0
      target.y = 0
    }

    // Device orientation = the same effect on phones/tablets.
    const onOrientation = (event) => {
      if (event.gamma == null || event.beta == null) return
      const dx = Math.max(-1, Math.min(1, event.gamma / 45))
      const dy = Math.max(-1, Math.min(1, (event.beta - 45) / 45))
      target.y = dx * max
      target.x = -dy * max
    }

    const tick = () => {
      if (cancelled) return

      // Ease toward the target (lerp) for a springy, weighty feel.
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08

      el.style.setProperty('--tilt-x', `${current.x.toFixed(3)}deg`)
      el.style.setProperty('--tilt-y', `${current.y.toFixed(3)}deg`)
      el.style.setProperty(
        '--glare-x',
        `${(50 + current.y * 3).toFixed(2)}%`,
      )
      el.style.setProperty(
        '--glare-y',
        `${(50 - current.x * 3).toFixed(2)}%`,
      )

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('deviceorientation', onOrientation)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('deviceorientation', onOrientation)
    }
  }, [max, enabled])

  return ref
}

export default useCursorTilt