import {
  EmailLogo,
  WhatsAppLogo,
  TikTokLogo,
  FacebookLogo,
  GitHubLogo,
  LinkedInLogo,
} from '../components/TechLogos'

/**
 * Contact section, shown below the projects section.
 *
 *  1. contact by email or WhatsApp (the numbers/addresses are the real ones
 *     from projects-prompt.txt),
 *  2. email and WhatsApp shown with their icons,
 *  3. social media icons (TikTok, Facebook, GitHub, LinkedIn) with a note that
 *     I'm also available there.
 *
 * Replace the social profile URLs with your own handles.
 *
 * `onBack` scrolls back up to the home page.
 */
const EMAIL = 'modislebogang@gmail.com'
const WHATSAPP = '0791503851'
// wa.me needs the international number without the leading 0 (South Africa +27)
const WHATSAPP_LINK = 'https://wa.me/27791503851'

const SOCIALS = [
  { name: 'TikTok', Logo: TikTokLogo, href: 'https://www.tiktok.com/@yourdevlebo' },
  { name: 'Facebook', Logo: FacebookLogo, href: 'https://www.facebook.com/yourdevlebo' },
  { name: 'GitHub', Logo: GitHubLogo, href: 'https://github.com/yourdevlebo' },
  { name: 'LinkedIn', Logo: LinkedInLogo, href: 'https://www.linkedin.com/in/yourdevlebo' },
]

export default function Contact({ onBack }) {
  return (
    <section className="contact-section" aria-label="Contact me">
      <div className="contact-inner">
        <p className="eyebrow">// get in touch</p>
        <h2 className="section-title">Contact me</h2>
        <p className="section-sub">
          Have a project in mind? Reach me directly — I usually reply fast.
        </p>

        {/* 1 + 2. email and whatsapp, with icons */}
        <div className="contact-methods">
          <a className="contact-method" href={`mailto:${EMAIL}`}>
            <EmailLogo size={34} />
            <span className="contact-method-text">
              <span className="contact-method-label">Email</span>
              <span className="contact-method-value">{EMAIL}</span>
            </span>
          </a>

          <a
            className="contact-method"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppLogo size={34} />
            <span className="contact-method-text">
              <span className="contact-method-label">WhatsApp</span>
              <span className="contact-method-value">{WHATSAPP}</span>
            </span>
          </a>
        </div>

        {/* 3. social media */}
        <p className="contact-social-label">// available also on social media</p>
        <ul className="contact-socials">
          {SOCIALS.map(({ name, Logo, href }) => (
            <li key={name}>
              <a
                className="social-link"
                href={href}
                target="_blank"
                rel="noreferrer"
                title={name}
              >
                <Logo size={34} />
                <span className="sr-only">{name}</span>
              </a>
            </li>
          ))}
        </ul>

        <button type="button" className="about-back contact-back" onClick={onBack}>
          <span aria-hidden="true">↑</span> back to top
        </button>
      </div>
    </section>
  )
}
