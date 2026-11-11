import { useEffect, useRef } from 'react'
import {
  JavaScriptLogo,
  ReactLogo,
  ViteLogo,
  GitHubLogo,
  GitLogo,
  NpmLogo,
  FirebaseLogo,
  NodeLogo,
} from '../components/TechLogos'
import myPic from '../assets/mypic-nobg.png'

/**
 * About me section, shown below the home page.
 *
 * It is not a separate page any more: the home page and this section live in
 * one scroll container, so scrolling down from the laptop reveals the about
 * content. The "About me" button on the home page scrolls here.
 *
 * Contents (see aboutme-prompt.txt):
 *  1. profile photo (the black & white portrait behind the section)
 *  2. short summary
 *  3. the technologies used to design / build websites, shown as icons only
 *     (JS, React, Vite, Node, npm, Git, GitHub, Firebase)
 *
 * `onBack` scrolls back up to the home page.
 */
const STACK = [
  { name: 'JavaScript', Logo: JavaScriptLogo },
  { name: 'React', Logo: ReactLogo },
  { name: 'Vite', Logo: ViteLogo },
  { name: 'Node.js', Logo: NodeLogo },
  { name: 'npm', Logo: NpmLogo },
  { name: 'Git', Logo: GitLogo },
  { name: 'GitHub', Logo: GitHubLogo },
  { name: 'Firebase', Logo: FirebaseLogo },
]

export default function About({ onBack }) {
  const sectionRef = useRef(null)

  // Escape scrolls back up, same as the back button.
  useEffect(() => {
    if (!onBack) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return (
    <section
      ref={sectionRef}
      className="about-section"
      aria-label="About me"
    >
      {/* the photo is the section background, so it is decorative here */}
      <div
        className="about-bg"
        style={{ backgroundImage: `url(${myPic})` }}
        aria-hidden="true"
      />
      <div className="about-bg-fade" aria-hidden="true" />

      <div className="about-card">
        <div className="about-grid about-grid--solo">
          {/* 1. photo — shown as the section background (see .about-bg) */}

          {/* 2. summary */}
          <div className="about-copy">
            <p className="eyebrow">// about me</p>
            <h1 className="about-title">Hi, I&apos;m YourDevLebo.</h1>
            <p className="about-summary">
              I&apos;m a full-stack developer who turns ideas into fast,
              clean websites. I care about the small details — smooth motion,
              readable code, and pages that feel alive without getting in the
              way. When I&apos;m not shipping features, I&apos;m breaking things
              apart to learn how they work.
            </p>

            {/* 3. technologies — icons only */}
            <p className="about-stack-label">// built with</p>
            <ul className="about-stack">
              {STACK.map(({ name, Logo }) => (
                <li className="stack-item" key={name} title={name}>
                  <Logo size={44} />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>

            {/* 4. call to action */}
            <div className="about-cta">
              <a className="btn btn-primary" href="mailto:hello@yourdevlebo.dev">
                Hire me
              </a>
              <button type="button" className="about-back" onClick={onBack}>
                <span aria-hidden="true">↑</span> back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
