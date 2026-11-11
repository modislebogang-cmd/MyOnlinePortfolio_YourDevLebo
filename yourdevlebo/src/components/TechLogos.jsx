/**
 * Inline brand marks for the About page.
 *
 * Kept as components (not <img src="*.svg">) so the logos inherit the page's
 * sizing and can be styled/animated with CSS. Each one is the official mark
 * drawn in its own brand colour.
 */

export function JavaScriptLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 630 630"
      role="img"
      aria-label="JavaScript"
    >
      <path
        fill="#f7df1e"
        d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.07-41-71.07-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.4zm-210.55 4.78c9.4 16.68 17.95 30.77 38.5 30.77 19.65 0 32.04-7.69 32.04-37.6V266.6h59.2v224.3c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.86-24.53-88.8-54.06z"
      />
    </svg>
  )
}

export function ReactLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      role="img"
      aria-label="React"
    >
      <circle r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function ViteLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 410 404"
      role="img"
      aria-label="Vite"
    >
      <defs>
        <linearGradient id="vite-a" x1="6" y1="33" x2="235" y2="344" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41d1ff" />
          <stop offset="1" stopColor="#bd34fe" />
        </linearGradient>
        <linearGradient id="vite-b" x1="195" y1="9" x2="236" y2="352" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffea83" />
          <stop offset="0.083" stopColor="#ffdd35" />
          <stop offset="1" stopColor="#ffa800" />
        </linearGradient>
      </defs>
      <path
        fill="url(#vite-a)"
        d="M399.641 59.524 215.643 388.545c-3.515 6.28-12.55 6.29-16.075.015L10.36 59.546c-3.83-6.83 2.05-14.9 9.6-13.19l189.01 42.179c.94.21 1.91.21 2.85 0l178.48-42.16c7.53-1.78 13.44 6.24 9.34 13.16Z"
      />
      <path
        fill="url(#vite-b)"
        d="M292.965 1.574 156.801 28.255a5 5 0 0 0-4.01 4.56l-8.36 141.1a5 5 0 0 0 6.11 5.24l37.9-8.75a5 5 0 0 1 6.05 5.9l-11.26 55.15a5 5 0 0 0 6.36 5.85l23.4-7.12a5 5 0 0 1 6.36 5.86l-17.9 86.6c-.7 3.4 3.5 5.6 5.9 3.1l1.3-1.6 110.9-221.2a5 5 0 0 0-5.4-7.1l-39 7.5a5 5 0 0 1-5.8-6.3l25.4-88.1a5 5 0 0 0-5.8-6.3Z"
      />
    </svg>
  )
}

export function GitHubLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role="img"
      aria-label="GitHub"
    >
      <path
        fill="#eafff2"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  )
}

export function GitLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role="img"
      aria-label="Git"
    >
      <path
        fill="#f05032"
        d="M15.7 7.3 8.7.3a1 1 0 0 0-1.4 0L5.6 2 7.4 3.8a1.2 1.2 0 0 1 1.5 1.5l1.7 1.7a1.2 1.2 0 1 1-.7.7L8.2 6v4.3a1.2 1.2 0 1 1-1-.1V5.9a1.2 1.2 0 0 1-.7-1.6L4.8 2.6.3 7.1a1 1 0 0 0 0 1.4l7 7a1 1 0 0 0 1.4 0l7-7a1 1 0 0 0 0-1.2Z"
      />
    </svg>
  )
}

export function NpmLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 7"
      role="img"
      aria-label="npm"
    >
      <path fill="#cb3837" d="M0 0h18v6H9v1H5V6H0V0Zm1 5h2V2h1v3h1V1H1v4Zm5-4v5h2V5h1V1H6Zm2 1h1v2H8V2Zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6Z" />
    </svg>
  )
}

export function FirebaseLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Firebase"
    >
      <path
        fill="#ffa000"
        d="M5.8 24.6 8.1 3.2c0-.2.2-.4.4-.4.1 0 .3.1.3.2l3.1 5.8-5.9 15.8Z"
      />
      <path
        fill="#f57c00"
        d="M19.1 9.4 16.3 4c-.1-.2-.3-.3-.5-.2-.1 0-.2.1-.2.2L5.8 24.6l6.6-3.8 6.7-11.4Z"
      />
      <path
        fill="#ffca28"
        d="M26.2 24.6 23.6 8.9c0-.2-.2-.3-.4-.3-.1 0-.2.1-.3.2L5.8 24.6l9.4 5.2c.4.2.8.2 1.2 0l9.8-5.2Z"
      />
      <path
        fill="#fff"
        fillOpacity=".2"
        d="M19.1 9.4 16.3 4c-.1-.2-.3-.3-.5-.2-.1 0-.2.1-.2.2L5.8 24.6l6.6-3.8 6.7-11.4Z"
      />
      <path
        fill="#a52714"
        fillOpacity=".2"
        d="M15.2 29.8c.4.2.8.2 1.2 0l9.8-5.2L23.6 8.9c0-.2-.2-.3-.4-.3-.1 0-.2.1-.3.2l-7.7 21Z"
      />
    </svg>
  )
}

export function NodeLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Node.js"
    >
      <path
        fill="#83cd29"
        d="M16 1.6c-.4 0-.8.1-1.1.3L3.4 8.5c-.7.4-1.1 1.1-1.1 1.9v13.2c0 .8.4 1.5 1.1 1.9l11.5 6.6c.7.4 1.5.4 2.2 0l11.5-6.6c.7-.4 1.1-1.1 1.1-1.9V10.4c0-.8-.4-1.5-1.1-1.9L17.1 1.9c-.3-.2-.7-.3-1.1-.3Z"
      />
      <path
        fill="#fff"
        d="M16 4.1c-.1 0-.2 0-.3.1L5.2 10.5c-.2.1-.3.3-.3.5v11.8c0 .2.1.4.3.5l10.5 6.1c.2.1.4.1.6 0l10.5-6.1c.2-.1.3-.3.3-.5V11c0-.2-.1-.4-.3-.5L16.3 4.2c-.1-.1-.2-.1-.3-.1Z"
      />
      <path
        fill="#83cd29"
        d="M16 6.2 7.1 11.3v10.2l8.9 5.1 8.9-5.1V11.3L16 6.2Zm0 2.3 6.9 4v7.9l-6.9 4-6.9-4v-7.9l6.9-4Z"
      />
    </svg>
  )
}
