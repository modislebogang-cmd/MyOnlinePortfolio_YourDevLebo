import { useCallback, useState } from 'react'
import Intro from './pages/Intro'
import NamePrompt from './pages/NamePrompt'
import Welcome from './pages/Welcome'
import MapSearch from './pages/MapSearch'
import './App.css'

/**
 * Intro sequence:
 *   1. 'name'    -> ask the visitor what their name is.
 *   2. 'welcome' -> "{name} welcome YourDevLebo's Portfolio website" + glitch.
 *   3. 'map'     -> search for yourdevlebo on google map.
 *   4. 'home'    -> the 3D laptop welcome/home page, with the about me
 *                   section below it (revealed by scrolling).
 */
function App() {
  const [step, setStep] = useState('name') // 'name' | 'welcome' | 'map' | 'home'
  const [name, setName] = useState('')

  const handleName = useCallback((value) => {
    setName(value)
    setStep('welcome')
  }, [])

  return (
    <main className="intro">
      {step === 'name' && <NamePrompt onSubmit={handleName} />}

      {step === 'welcome' && (
        <Welcome name={name} onDone={() => setStep('map')} />
      )}

      {step === 'map' && (
        <MapSearch name={name} onDone={() => setStep('home')} />
      )}

      {step === 'home' && <Intro />}
    </main>
  )
}

export default App
