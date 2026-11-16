# yourdevlebo — Portfolio Website

A personal portfolio for **YourDevLebo**, built as a single-page "terminal / neon"
experience. The site opens with a short cinematic intro, drops you onto a 3D laptop
home screen, and then everything else — About, Projects, Contact — is revealed by
scrolling down through one continuous page.

Built with **React 19 + Vite 8**, plain **CSS** (no UI framework, no Tailwind), and
hand-drawn **inline SVG** icons. There is no backend, no database and no API keys —
the whole thing is static and deploys anywhere that serves files (Vercel, Netlify,
GitHub Pages).

---

## Table of contents

1. [Quick start](#quick-start)
2. [Tech stack](#tech-stack)
3. [Project structure](#project-structure)
4. [How the site is built (page by page)](#how-the-site-is-built-page-by-page)
5. [Feature list](#feature-list)
6. [Design system](#design-system)
7. [Editing content (where to change things)](#editing-content-where-to-change-things)
8. [Accessibility](#accessibility)
9. [Performance notes](#performance-notes)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# lint the code
npm run lint

# production build -> dist/
npm run build

# preview the production build locally
npm run preview
```

Requirements: **Node.js 20.19+ or 22.12+** (Vite 8 requires a modern Node) and npm 10+.

---

## Tech stack

| Area                    | What is used                                                                    | Why                                                              |
| ----------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| UI library              | **React 19** (`react`, `react-dom`)                                             | Component model, hooks                                           |
| Build tool / dev server | **Vite 8** (Rolldown-powered)                                                   | Instant HMR, fast builds                                         |
| React plugin            | **@vitejs/plugin-react**                                                        | JSX transform + Fast Refresh                                     |
| Compiler                | **React Compiler** (`babel-plugin-react-compiler` via `@rolldown/plugin-babel`) | Auto-memoisation — no manual `useMemo`/`useCallback` everywhere  |
| Styling                 | **Plain CSS** in `src/App.css` + `src/index.css`                                | Full control over the 3D/keyframe effects; CSS custom properties |
| Icons / logos           | **Inline SVG components** (`src/components/TechLogos.jsx`)                      | Crisp at any size, themeable, zero network requests              |
| Fonts                   | System stacks (`system-ui`, `ui-monospace`)                                     | No web-font download, no FOUT                                    |
| Animation               | CSS `@keyframes`, transitions, 3D transforms                                    | GPU-accelerated, no animation library                            |
| Linting                 | **ESLint 10** + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`     | Catch bugs and hook mistakes                                     |
| Routing                 | **None** — single scroll container                                              | Simpler, no router dependency                                    |

Dependencies are intentionally minimal: the only runtime dependencies are `react`
and `react-dom`. Everything else is a dev/build tool.

---

## Project structure

```
yourdevlebo/
├─ index.html                  # app shell, #root mount point
├─ vite.config.js              # React + React Compiler plugins, Rolldown options
├─ eslint.config.js            # flat ESLint config
├─ package.json
└─ src/
   ├─ main.jsx                 # createRoot + <StrictMode>
   ├─ App.jsx                  # intro step machine: name -> welcome -> map -> home
   ├─ index.css                # global resets, CSS variables, base typography
   ├─ App.css                  # all component/page styling (the big one)
   ├─ assets/
   │  ├─ mypic-nobg.png        # full-body portrait, transparent background
   │  ├─ mypic-face.png        # square face crop used on the laptop screen
   │  ├─ react.svg / vite.svg  # unused template leftovers
   ├─ hooks/
   │  └─ useCursorTilt.js      # 3D tilt toward the cursor / device orientation
   ├─ components/
   │  ├─ Laptop.jsx            # 3D CSS laptop + typing code + photo + glitch
   │  ├─ TechLogos.jsx         # all brand icons (JS, React, Vite, Node, npm,
   │  │                        #   Git, GitHub, Firebase, Vercel, Email,
   │  │                        #   WhatsApp, TikTok, Facebook, LinkedIn)
   │  └─ MatrixRain.jsx        # canvas digital-rain (kept, not currently mounted)
   └─ pages/
      ├─ NamePrompt.jsx        # step 1: "What's your name?"
      ├─ Welcome.jsx           # step 2: "<name> welcome" + glitch
      ├─ MapSearch.jsx         # step 3: fake radar "google map" search
      ├─ Intro.jsx             # home page + scroll flow (owns all sections)
      ├─ About.jsx             # about me section
      ├─ Projects.jsx          # projects section
      └─ Contact.jsx           # contact section
```

---

## How the site is built (page by page)

### 0. Entry point

`src/main.jsx` mounts `<App />` into `#root` inside `<StrictMode>`. `App.jsx` is a
tiny step machine:

```
'name'  ->  'welcome'  ->  'map'  ->  'home'
```

Only one step is mounted at a time. Once you reach `'home'`, `Intro` takes over and
owns everything below.

### 1. Name prompt (`pages/NamePrompt.jsx`)

A terminal-style card asking **"What's your name?"**. It's a real `<form>` with a
required `<input>`; the value is trimmed and empty submissions are ignored. On submit
it hands the name up to `App`, which advances to the welcome step.

### 2. Welcome glitch (`pages/Welcome.jsx`)

Greets the visitor by name — _"`<name>` welcome"_ — with a CSS glitch effect on the
text and a "establishing uplink…" status line. It runs for 2.6 s and then auto-advances
via an `onDone` callback (timer cleared on unmount, so it can't double-fire).

### 3. Map search (`pages/MapSearch.jsx`)

A stylised "searching for yourdevlebo on Google Maps" sequence: a fake map grid, a
conic-gradient radar sweep, a pin that drops and pings, and a log that types out line
by line. After ~3.6 s it advances to the home page.

> This is a **self-contained visual** — no Google Maps embed, no API key, no network
> request. Swap the grid for a real `<iframe>`/Leaflet map later if wanted; the
> `onDone` contract stays the same.

### 4. Home page (`pages/Intro.jsx`)

The centrepiece. It does four things:

1. **Boot log** — three lines of terminal text (`> initializing yourdevlebo...`) for
   1.4 s, then swaps to the laptop.
2. **3D laptop** (`components/Laptop.jsx`) — a CSS-built laptop whose lid swings open
   (`rotateX` from `-90deg` to `-14deg`), a keyboard that pulses, a trackpad, a
   webcam dot, scanline + glare overlays, and on the screen: the **black-and-white
   face crop**, a typing code editor (`setInterval` typewriter), and two **glitch
   copies** of the photo sliced/offset in red/cyan.
3. **Cursor tilt** (`hooks/useCursorTilt.js`) — the laptop rotates toward the pointer.
   It writes `--tilt-x` / `--tilt-y` / `--glare-x` / `--glare-y` CSS variables from a
   `requestAnimationFrame` lerp loop (no React re-renders), and also responds to
   `deviceorientation`, so it tilts on phones too. Fully disabled under
   `prefers-reduced-motion`.
4. **Copy + controls** — eyebrow, **glitching name** (`YourDevLebo`), a **typewriter
   tagline** ("TURNING YOUR IDEA INTO A LIVE WEBSITE", monospace + blinking caret,
   typed once the laptop opens), and two identical primary buttons:
   **About me** and **scroll down ▾**.

### 5. The scroll flow

`Intro` renders **one scroll container** (`.intro-scroll`) holding four full-height
sections stacked vertically:

```
home  ->  about  ->  projects  ->  contact
```

Buttons use `scrollTo({ top: section.offsetTop, behavior: 'smooth' })` on that
container, so navigation is a smooth scroll rather than a page change.

**Mouse-wheel scrolling is disabled** on that container (`wheel` listener with
`preventDefault`) — the site moves only through the buttons. Keyboard (Tab + Enter)
and touch scrolling still work, so it stays usable.

### 6. About (`pages/About.jsx`)

- The **full portrait** is the section background (bottom-right, black & white).
- Two extra background layers of the same photo create a **photo glitch** (CSS
  `clip-path` slices + red/cyan drop-shadows).
- **Summary** paragraph, then the **tech stack as icons only** (JS, React, Vite,
  Node.js, npm, Git, GitHub, Firebase) — each with a tooltip and a screen-reader label.
- Buttons: **Hire me** (`mailto:`), **scroll down ▾** (to Projects), **↑ back to top**.
- `Esc` also returns to the top.

### 7. Projects (`pages/Projects.jsx`)

A grid of **floating cards** (each gently bobs on a staggered 6 s loop, lifts and
glows on hover, and pauses its float while hovered). Every card shows:

- a **status badge** — _Completed_ (green) / _Under construction_ (amber) /
  _Personal project_ (cyan),
- the owner's **5-star rating**,
- name, description, tech tags,
- **View on GitHub** and **View on Vercel** buttons with their logos.

At the bottom: **↑ scroll up** (to About) and **scroll down ▾** (to Contact).

### 8. Contact (`pages/Contact.jsx`)

- **Email** `modislebogang@gmail.com` and **WhatsApp** `0791503851` as clickable
  cards with icons (`mailto:` and `wa.me/27791503851`).
- **Social media** icons — TikTok, Facebook, GitHub, LinkedIn — under the line
  _"available also on social media"_.
- **↑ back to top** button.

---

## Feature list

### Intro sequence

- [x] Terminal-style name prompt with validation
- [x] Personalised welcome message with CSS glitch text
- [x] Fake "Google Map" radar search with animated log and pin
- [x] Terminal boot log before the laptop appears

### Home page

- [x] Pure-CSS 3D laptop (opening lid, pulsing keyboard, trackpad, webcam dot)
- [x] Typing code animation on the laptop screen
- [x] Black-and-white face photo with red/cyan glitch copies
- [x] Screen scanlines + cursor-tracking glare
- [x] Cursor tilt (and device-orientation tilt) with smooth easing
- [x] Slow glitch effect on the site name
- [x] Typewriter tagline with blinking caret
- [x] About me / scroll down buttons

### About section

- [x] Black-and-white portrait background with a glitch effect
- [x] Short bio / summary
- [x] Tech stack as icon-only row (8 logos) with tooltips and a11y labels
- [x] Hire me, scroll down, back to top
- [x] `Esc` shortcut to go back to the top

### Projects section

- [x] Floating project cards (staggered float animation)
- [x] Status badges: completed / under construction / personal
- [x] Owner rating (5 stars, accessible label)
- [x] View on GitHub + View on Vercel
- [x] Tech tags per project
- [x] Scroll up / scroll down navigation

### Contact section

- [x] Email + WhatsApp contact cards with icons
- [x] Social media icons (TikTok, Facebook, GitHub, LinkedIn)
- [x] Back to top

### Site-wide

- [x] Single-page continuous scroll (no router, no page reloads)
- [x] Mouse-wheel scroll disabled — button-driven navigation
- [x] Smooth scrolling
- [x] Fully responsive (breakpoints at 720 px; separate phone layout for About)
- [x] `prefers-reduced-motion` support — animations and tilt are disabled
- [x] Keyboard accessible — real buttons, focus-visible outlines, `Esc` shortcut
- [x] Screen-reader labels on icon-only controls, `aria-hidden` on decoration
- [x] Inline SVG icons — no icon font, no image requests
- [x] Zero backend / zero API keys — fully static

---

## Design system

All colours come from CSS custom properties in `App.css`:

| Variable         | Value     | Use                                |
| ---------------- | --------- | ---------------------------------- |
| `--mx-green`     | `#00ff66` | primary neon green (CTAs, glows)   |
| `--mx-green-dim` | `#0a8f3c` | muted green for labels             |
| `--mx-cyan`      | `#35f1ff` | secondary accent (glitch layering) |
| `--ink`          | `#eafff2` | primary text                       |
| `--ink-dim`      | `#7fa99a` | secondary text                     |

Supporting tones: red `#ff2e6a` (glitch), amber `#ffd166` (stars / under construction).

**Layout primitives**

- `.gate` — full-screen centred card used by the intro steps
- `.gate-card` — the dark card with a neon border and glow
- `.intro-scroll` — the single scroll container (home + all sections)
- `.intro` / `.about-section` / `.projects-section` / `.contact-section` — full-height sections
- `.btn`, `.btn-primary`, `.btn-ghost` — pill buttons
- `.eyebrow` — the monospace `// section label`
- `.section-title`, `.section-sub` — section headings
- `.stack-item`, `.project-card`, `.contact-method`, `.social-link` — component styles

**Keyframes used:** `StageIn`, `BootLine`, `PhotoIn`, `PhotoGlitch`, `AboutBgIn`,
`AboutGlitch`, `Blink`, `Dots`, `GlitchTop`, `GlitchBottom`, `Float`, `KeyPulse`,
`CardFloat`, `MapPan`, `MapSweep`, `PinDrop`, `PinPing`.

---

## Editing content (where to change things)

| What you want to change                                                  | File                                                                                   |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Name, tagline, buttons on the home page                                  | `src/pages/Intro.jsx`                                                                  |
| Bio text, tech stack list                                                | `src/pages/About.jsx`                                                                  |
| Photo                                                                    | `src/assets/mypic-nobg.png` (About bg) and `src/assets/mypic-face.png` (laptop screen) |
| **Projects** (names, descriptions, tags, status, rating, repo/live URLs) | `PROJECTS` array in `src/pages/Projects.jsx`                                           |
| **Email / WhatsApp**                                                     | `EMAIL`, `WHATSAPP`, `WHATSAPP_LINK` in `src/pages/Contact.jsx`                        |
| **Social links**                                                         | `SOCIALS` array in `src/pages/Contact.jsx`                                             |
| Colours / theme                                                          | `:root` in `src/App.css`                                                               |
| Intro step timings (boot 1.4 s, welcome 2.6 s, map 3.6 s)                | `Intro.jsx`, `Welcome.jsx`, `MapSearch.jsx`                                            |
| Typewriter speed                                                         | `useTypewriter(..., { speed })` call in `Intro.jsx`                                    |

### ⚠ Placeholders to replace before going live

These are still sample values:

- **Projects** — all `repo` URLs point at `https://github.com/yourdevlebo` and all
  `live` URLs at `https://yourdevlebo.vercel.app`. Project names/stats are examples.
- **Social links** — TikTok, Facebook, GitHub and LinkedIn use the `@yourdevlebo`
  placeholder handles.
- `src/assets/react.svg` and `src/assets/vite.svg` are template leftovers and are
  not used.

---

## Accessibility

- Semantic landmarks: `<main>`, `<section aria-label>`, headings in order.
- Interactive controls are real `<button>` / `<a>` elements — no clickable `<div>`s.
- Keyboard: every control is focusable with a visible `outline` on `:focus-visible`.
- `Esc` on the About section scrolls back to the top.
- Icon-only controls carry `aria-label` / `sr-only` text (`.sr-only` utility in CSS).
- Decorative elements (photo glitch copies, backgrounds, scanlines, vignettes) are
  `aria-hidden="true"`.
- **`prefers-reduced-motion: reduce`** turns off the tilt, glitches, floating cards,
  key pulses, radar sweep and entrance animations.

---

## Performance notes

- **No runtime dependencies beyond React** — the bundle is small and there is nothing
  to fetch at runtime (no fonts, no icon packs, no image sprites).
- **Tilt writes CSS variables instead of state**, so pointer movement never re-renders
  React — it stays smooth.
- **Animations use `transform` / `opacity` / `filter`** so the browser can composite
  them on the GPU.
- **React Compiler** is enabled (`vite.config.js`), so components are auto-memoised.
- The Rolldown `PLUGIN_TIMINGS` warning is disabled in `vite.config.js`
  (`checks: { pluginTimings: false }`) because the React Compiler plugin is
  intentionally slower — the build is unaffected.
- `prefers-reduced-motion` also removes the heaviest effects for low-power devices.

---

## Deployment

The output is a static `dist/` folder — no server code.

```bash
npm run build     # produces dist/
npm run preview   # sanity-check the built site locally
```

**Vercel** (recommended, matches the "View on Vercel" buttons):

1. Import the repository, set **Framework preset: Vite**.
2. Build command `npm run build`, output directory `dist`.
3. Deploy — no environment variables needed.

**Netlify / GitHub Pages / any static host:** same build command and `dist` output.
There are no client-side routes, so no SPA rewrite rules are required.

---

## Troubleshooting

**`npm run dev` takes a long time to start.**
Make sure the Babel peer dependencies are installed — `@babel/plugin-transform-runtime`
and `@babel/runtime` — they are required by `@rolldown/plugin-babel`. If they are
missing, plugin resolution stalls. They are listed in `devDependencies`; run
`npm install` to restore them.

**The build prints `[PLUGIN_TIMINGS]` and PowerShell shows `NativeCommandError`.**
That's an informational Rolldown warning (the React Compiler plugin is slow), not a
failure — the build exits `0`. It's already switched off in `vite.config.js`; if it
reappears, check that `build.rolldownOptions.checks.pluginTimings` is still `false`.

**Vite prints `➜` as `âžœ`.**
Console code-page issue on Windows PowerShell, not an error. Run `chcp 65001` first,
or use Windows Terminal.

**Port 5173 already in use.**
An old dev server is still running. Stop it (Ctrl+C) or let Vite pick the next port.

**The page doesn't scroll with the mouse wheel.**
That's intentional — navigation is button-driven (see _The scroll flow_).
