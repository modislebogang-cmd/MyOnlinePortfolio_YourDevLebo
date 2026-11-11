import { useState } from 'react'

/**
 * Step 1 of the intro sequence.
 *
 * Asks "what's your name?" and only advances once a name is submitted.
 * The parent owns the value; this component just validates and reports it.
 */
export default function NamePrompt({ onSubmit }) {
  const [name, setName] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <section className="gate" aria-label="Name prompt">
      <form className="gate-card" onSubmit={submit}>
        <p className="eyebrow">// visitor detected</p>
        <h1 className="gate-question">What&apos;s your name?</h1>

        <label className="gate-field">
          <span className="gate-label">name</span>
          <span className="gate-input-wrap">
            <span className="gate-prompt">&gt;</span>
            <input
              className="gate-input"
              type="text"
              name="visitor"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="type here..."
              autoComplete="off"
              autoFocus
              maxLength={40}
            />
            <span className="caret">_</span>
          </span>
        </label>

        <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
          Submit
        </button>
      </form>
    </section>
  )
}