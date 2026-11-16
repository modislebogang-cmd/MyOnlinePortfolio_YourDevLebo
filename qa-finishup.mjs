// qa-finishup.mjs — verify the home page fixes.
export default async function run(page) {
  const out = {}
  await page.setViewportSize({ width: 1280, height: 800 })

  await page.waitForSelector('.gate-question', { timeout: 20000 })
  await page.fill('.gate-input', 'Lebo')
  await page.click('button[type=submit]')

  const t0 = Date.now()
  while (Date.now() - t0 < 45000) {
    if (
      await page.evaluate(
        () => !!document.querySelector('.intro-copy.is-visible'),
      )
    )
      break
    await page.waitForTimeout(250)
  }
  await page.waitForTimeout(1500)

  out.home = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.intro-copy .cta-row button')]
    const h1 = document.querySelector('.intro-copy h1')
    const tag = document.querySelector('.tagline')
    const photo = document.querySelector('.screen-photo')
    return {
      buttons: btns.map((b) => ({
        text: b.innerText.trim(),
        cls: b.className,
        top: Math.round(b.getBoundingClientRect().top),
      })),
      nameGlitch: h1.className,
      nameDataText: h1.getAttribute('data-text'),
      taglineClass: tag.className,
      taglineFont: getComputedStyle(tag).fontFamily,
      taglineText: tag.innerText.trim(),
      photoSrc: photo.getAttribute('src'),
      photoFit: getComputedStyle(photo).objectFit,
      glitchCopies: document.querySelectorAll('.screen-photo-glitch').length,
    }
  })
  await page.screenshot({ path: 'qa-finishup-home.png' })

  // wheel must not scroll
  const before = await page.evaluate(
    () => document.querySelector('.intro-scroll').scrollTop,
  )
  await page.mouse.move(640, 400)
  await page.mouse.wheel(0, 900)
  await page.waitForTimeout(900)
  const after = await page.evaluate(
    () => document.querySelector('.intro-scroll').scrollTop,
  )
  out.wheel = { before, after, blocked: before === after }

  // the scroll down button still works
  await page.getByRole('button', { name: /scroll down/i }).click({ force: true })
  await page.waitForTimeout(1400)
  out.afterScrollButton = await page.evaluate(
    () => document.querySelector('.intro-scroll').scrollTop,
  )

  return out
}
