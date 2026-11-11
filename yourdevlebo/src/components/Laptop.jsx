import { useEffect, useState } from 'react'
import myPic from '../assets/mypic-nobg.png'

const CODE_LINES = [
  'const dev = {',
  "  name: 'YourDevLebo',",
  "  role: 'Full-Stack Developer',",
  "  stack: ['React', 'Node', 'TS'],",
  '  passion: "building things"',
  '}',
  '',
  'while (awake) {',
  '  dev.learn();',
  '  dev.ship();',
  '}',
]

/**
 * A 3D CSS laptop. The lid opens on mount (keyframe: LaptopOpen) and the
 * provided photo is shown on the screen surface, with a typing overlay.
 */
export default function Laptop({ open, onOpened }) {
  const [typed, setTyped] = useState('')

  // Kick off the typing animation only after the lid has opened.
  useEffect(() => {
    if (!open) return undefined
    const full = CODE_LINES.join('\n')
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(timer)
        onOpened?.()
      }
    }, 32)
    return () => clearInterval(timer)
  }, [open, onOpened])

  return (
    <div className={`laptop ${open ? 'is-open' : ''}`} aria-label="3D laptop">
      <div className="laptop-screen">
        <div className="screen-bezel">
          <div className="screen-content">
            <img
              className="screen-photo"
              src={myPic}
              alt="YourDevLebo"
            />
            <pre className="screen-code" aria-hidden="true">
              {typed}
              <span className="caret">_</span>
            </pre>
            <div className="screen-scanlines" aria-hidden="true" />
            <div className="screen-glare" aria-hidden="true" />
          </div>
          <div className="screen-camera" aria-hidden="true" />
        </div>
      </div>
      <div className="laptop-base">
        <div className="keyboard" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <span className="key" key={i} />
          ))}
        </div>
        <div className="trackpad" aria-hidden="true" />
      </div>
    </div>
  )
}