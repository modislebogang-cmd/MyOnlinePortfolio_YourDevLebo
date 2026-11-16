// qa-check.mjs — quick pass over the home page fixes.
export default async function run(page) {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForSelector('.gate-question', { timeout: 15000 })
  await page.fill('.gate-input', 'Lebo')
  await page.click('button[type=submit]')

  const deadline = Date.now() + 30000
  while (Date.now() < deadline) {
    if (await page.evaluate(() => !!document.querySelector('.intro-copy.is-visible')))
      break
    await page.waitForTimeout(200)
  }
  await page.waitForTimeout(1200)

  const info = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.intro-copy .cta-row button')]
    const tag = document.querySelector('.tagline')
    return {
      buttons: btns.map((b) => ({
        text: b.innerText.trim(),
        cls: b.className,
        top: Math.round(b.getBoundingClientRect().top),
      })),
      tagline: tag.innerText.trim(),
      font: getComputedStyle(tag).fontFamily,
      nameCls: document.querySelector('.intro-copy h1').className,
      photo: document.querySelector('.screen-photo').getAttribute('src'),
      copies: document.querySelectorAll('.screen-photo-glitch').length,
      scrollTop: document.querySelector('.intro-scroll').scrollTop,
    }
  })
  await page.screenshot({ path: 'qa-check.png' })
  return info
}
