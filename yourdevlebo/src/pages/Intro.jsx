import { useEffect, useRef, useState } from 'react'
import Laptop from '../components/Laptop'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import useCursorTilt from '../hooks/useCursorTilt'

const TAGLINE = 'TURNING YOUR IDEA INTO A LIVE WEBSITE'

/**
 * Types `text` out one character at a time, like a typewriter.
 * Returns the part typed so far and whether it is finished.
 */
function useTypewriter(text, { start = true, speed = 70 } = {}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return undefined
    if (count >= text.length) return undefined
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [count, start, speed, text.length])

  return { typed: text.slice(0, count), done: count >= text.length }
}

/**
 * Welcome / home page.
 *
 * Sequence:
 *  1. "booting"  -> terminal-style boot log, then the laptop opens.
 *  2. the 3D laptop types code, its screen shows the profile photo.
 *  3. the whole laptop tilts toward the cursor.
 *  4. scrolling down reveals the about, projects and contact sections.
 *
 * The "About me" button scrolls down to the about section instead of opening
 * a separate page.
 */
export default function Intro() {
  const [phase, setPhase] = useState('boot') // 'boot' | 'laptop'
  const [opened, setOpened] = useState(false)
  const scrollRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  // Only start tracking the pointer once the stage is actually mounted,
  // otherwise the ref is null on the first (and only) effect run.
  const tiltRef = useCursorTilt(16, phase === 'laptop')
  const { typed: tagline, done: taglineDone } = useTypewriter(TAGLINE, {
    start: opened,
  })

  // Booting -> laptop after the short boot log.
  useEffect(() => {
    const t = setTimeout(() => setPhase('laptop'), 1400)
    return () => clearTimeout(t)
  }, [])

  // Mouse wheel scrolling is turned off: the page only moves through the
  // buttons (keyboard and touch still work).
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return undefined
    const blockWheel = (e) => e.preventDefault()
    scroller.addEventListener('wheel', blockWheel, { passive: false })
    return () => scroller.removeEventListener('wheel', blockWheel)
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
              <h1 className="glitch glitch-slow" data-text="YourDevLebo">
                YourDevLebo
              </h1>
              <p
                className={`tagline typewriter ${taglineDone ? 'is-done' : ''}`}
                aria-label={TAGLINE}
              >
                <span aria-hidden="true">{tagline}</span>
                <span className="typewriter-caret" aria-hidden="true" />
              </p>
              <div className="cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollTo(aboutRef)}
                >
                  About me
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollTo(aboutRef)}
                >
                  scroll down ▾
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <div ref={aboutRef}>
        <About
          onBack={() => scrollTo({ current: scrollRef.current })}
          onProjects={() => scrollTo(projectsRef)}
        />
      </div>

      <div ref={projectsRef}>
        <Projects onContact={() => scrollTo(contactRef)} />
      </div>

      <div ref={contactRef}>
        <Contact onBack={() => scrollTo({ current: scrollRef.current })} />
      </div>
    </main>
  )
}