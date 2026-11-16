import { GitHubLogo } from '../components/TechLogos'

/**
 * Projects section, shown below the about section.
 *
 * Each project is a floating card with:
 *  1. a link to view the project on GitHub,
 *  2. a status badge — under construction / completed / personal project,
 *  3. a rating given by the site owner (out of 5).
 *
 * The list below is placeholder content: replace the entries with your real
 * repositories, statuses and ratings.
 *
 * `onContact` scrolls down to the contact section.
 */
const PROJECTS = [
  {
    name: 'YourDevLebo Portfolio',
    description:
      'This site — a 3D laptop intro, a scroll-revealed about section and a neon terminal theme.',
    repo: 'https://github.com/yourdevlebo',
    status: 'completed',
    rating: 5,
    tags: ['React', 'Vite', 'CSS'],
  },
  {
    name: 'Task Tracker',
    description:
      'A small productivity app for keeping track of daily tasks, with local storage and dark mode.',
    repo: 'https://github.com/yourdevlebo',
    status: 'under-construction',
    rating: 3,
    tags: ['React', 'Firebase'],
  },
  {
    name: 'Weather Dashboard',
    description:
      'A personal project that pulls live weather data and shows a 5-day forecast for any city.',
    repo: 'https://github.com/yourdevlebo',
    status: 'personal',
    rating: 4,
    tags: ['JavaScript', 'API'],
  },
]

const STATUS_LABEL = {
  completed: 'Completed',
  'under-construction': 'Under construction',
  personal: 'Personal project',
}

function Stars({ rating }) {
  return (
    <span
      className="project-stars"
      role="img"
      aria-label={`Rated ${rating} out of 5 by the owner`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star ${i < rating ? 'is-on' : ''}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  )
}

export default function Projects({ onContact }) {
  return (
    <section className="projects-section" aria-label="Projects">
      <div className="projects-inner">
        <p className="eyebrow">// my work</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          Things I&apos;ve built — open any card on GitHub to see the code.
        </p>

        <ul className="project-grid">
          {PROJECTS.map((project) => (
            <li className="project-card" key={project.name}>
              <div className="project-head">
                <span className={`project-status is-${project.status}`}>
                  {STATUS_LABEL[project.status]}
                </span>
                <Stars rating={project.rating} />
              </div>

              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.description}</p>

              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <a
                className="project-link"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubLogo size={20} />
                View on GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="scroll-hint section-next"
          onClick={onContact}
        >
          contact me ▾
        </button>
      </div>
    </section>
  )
}
