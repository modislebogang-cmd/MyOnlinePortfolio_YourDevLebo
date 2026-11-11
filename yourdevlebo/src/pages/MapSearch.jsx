import { useEffect, useState } from 'react'

/**
 * Step 3 of the intro sequence.
 *
 * Plays a stylised "searching for yourdevlebo on google map" sequence — a
 * fake map grid with a radar sweep and a pin that locks on — then advances to
 * the home page via `onDone`.
 *
 * This is a self-contained visual, not a real Google Maps embed: no API key,
 * no network, no third-party script. Swap the canvas-free grid below for a real
 * <iframe>/Leaflet map and keep the same onDone contract if you later want it.
 */
const MAP_MS = 3600

const LINES = [
  '> connecting to maps service...',
  '> query: "yourdevlebo"',
  '> scanning region ▓▓▓░░░░░░░ 34%',
  '> scanning region ▓▓▓▓▓▓▓░░░ 78%',
  '> match found',
]

export default function MapSearch({ name, onDone }) {
  const [visible, setVisible] = useState(1)
  const [locked, setLocked] = useState(false)

  // Reveal the search log line by line.
  useEffect(() => {
    const timers = LINES.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 380 * (i + 1)),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Lock the pin once the scan completes, then hand off to the home page.
  useEffect(() => {
    const lockAt = setTimeout(() => setLocked(true), MAP_MS - 900)
    const doneAt = setTimeout(() => onDone?.(), MAP_MS)
    return () => {
      clearTimeout(lockAt)
      clearTimeout(doneAt)
    }
  }, [onDone])

  return (
    <section className="gate map-gate" aria-label="Searching on Google Maps">
      <div className="gate-card map-card">
        <p className="eyebrow">// geo lookup</p>

        <div className={`map-viewport ${locked ? 'is-locked' : ''}`} aria-hidden="true">
          <div className="map-grid" />
          <div className="map-sweep" />
          <div className="map-roads" />

          {locked && (
            <div className="map-pin">
              <span className="map-pin-dot" />
              <span className="map-pin-ring" />
              <span className="map-pin-label">{name || 'you'}</span>
            </div>
          )}
        </div>

        <pre className="map-log" role="status">
          {LINES.slice(0, visible).map((line) => (
            <span className="map-log-line" key={line}>
              {line}
            </span>
          ))}
          {!locked && <span className="caret">_</span>}
        </pre>

        <p className="map-footer">
          found <strong>yourdevlebo</strong> — opening home page
          <span className="dots" />
        </p>
      </div>
    </section>
  )
}