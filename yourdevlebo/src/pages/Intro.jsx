import { useEffect, useRef, useState } from 'react'
import Laptop from '../components/Laptop'
import About from './About'
import useCursorTilt from '../hooks/useCursorTilt'

/**
 * Welcome / home page.
 *
 * Sequence:
 *  1. "booting"  -> terminal-style boot log, then the laptop opens.
 *  2. the 3D laptop types code, its screen shows the profile photo.
 *  3. the whole laptop tilts toward the cursor.
 *  4. scrolling down reveals the about me section below the laptop.
 *
 * The "About me" button scrolls down to that section instead of opening a
 * separate page.
 */
export default function Intro() {
  const [phase, setPhase] = useState('boot') // 'boot' | 'laptop'
  const [opened, setOpened] = useState(false)
  const scrollRef = useRef(null)
  const aboutRef = useRef(null)
  // Only start tracking the pointer once the stage is actually mounted,
  // otherwise the ref is null on the first (and only) effect run.
  const tiltRef = useCursorTilt(16, phase === 'laptop')

  // Booting -> laptop after the short boot log.
  useEffect(() => {
    const t = setTimeout(() => setPhase('laptop'), 1400)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (ref) => {
    const scroller = scrollRef.current
    const target = ref.current
    if (!scroller || !target) return
    scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
  }

  return (
    <main className="intro-scroll" ref={scrollRef}>
      <section className="intro" aria-label="Home">
        <div className="intro-vignette" aria-hidden="true" />

        {phase === 'boot' && (
          <div className="boot" role="status">
            <p className="boot-line">&gt; initializing yourdevlebo...</p>
            <p className="boot-line">&gt; loading profile ██████████ 100%</p>
            <p className="boot-line boot-ready">&gt; welcome_</p>
          </div>
        )}

        {phase === 'laptop' && (
          <div className="stage" ref={tiltRef}>
            <Laptop open onOpened={() => setOpened(true)} />

            <div className={`intro-copy ${opened ? 'is-visible' : ''}`}>
              <p className="eyebrow">// welcome to my space</p>
              <h1>YourDevLebo</h1>
              <p className="tagline">
                TURNING YOUR IDEA INTO A LIVE WEBSITE
              </p>
              <div className="cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollTo(aboutRef)}
                >
                  About me
                </button>
              </div>
              <button
                type="button"
                className="scroll-hint"
                onClick={() => scrollTo(aboutRef)}
              >
                scroll down ▾
              </button>
            </div>
          </div>
        )}
      </section>

      <div ref={aboutRef}>
        <About onBack={() => scrollTo({ current: scrollRef.current })} />
      </div>
    </main>
  )
}