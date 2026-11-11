import { useEffect } from 'react'

/**
 * Step 2 of the intro sequence.
 *
 * Greets the visitor by the name they submitted, plays a short glitch effect
 * over the sentence, then hands off to the map search.
 *
 * `onDone` fires after the glitch has finished. The timer is cleared on cleanup
 * so a fast unmount (or the reduced-motion path) cannot fire it twice.
 */
const GLITCH_MS = 2600

export default function Welcome({ name, onDone }) {
  useEffect(() => {
    if (!onDone) return undefined
    const timer = setTimeout(onDone, GLITCH_MS)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <section className="gate" aria-label="Welcome">
      <div className="gate-card welcome-card">
        <p className="eyebrow">// access granted</p>

        {/* data-text feeds the ::before/::after glitch layers */}
        <h1 className="welcome-line glitch" data-text={`${name} welcome`}>
          <span className="welcome-name">{name} welcome</span>
        </h1>

        <p className="welcome-sub glitch" data-text="YourDevLebo's Portfolio website">
          YourDevLebo&apos;s Portfolio website
        </p>

        <p className="welcome-scan" role="status">
          establishing uplink<span className="dots" />
        </p>
      </div>
    </section>
  )
}