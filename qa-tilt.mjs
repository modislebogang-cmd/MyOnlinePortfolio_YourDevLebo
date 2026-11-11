export default async function run(page, ui) {
  const read = () =>
    page.evaluate(() => {
      const el = document.querySelector('.stage')
      const cs = getComputedStyle(el)
      return {
        tiltX: cs.getPropertyValue('--tilt-x').trim(),
        tiltY: cs.getPropertyValue('--tilt-y').trim(),
        transform: cs.transform,
        glareX: cs.getPropertyValue('--glare-x').trim(),
        glareY: cs.getPropertyValue('--glare-y').trim(),
      }
    })

  // Resting state (no pointer movement yet).
  const rest = await read()

  // Move the pointer to the top-right corner and let the rAF loop ease in.
  await page.mouse.move(1200, 120)
  await page.waitForTimeout(900)
  const topRight = await read()

  // Move to the bottom-left corner.
  await page.mouse.move(120, 700)
  await page.waitForTimeout(900)
  const bottomLeft = await read()

  return { rest, topRight, bottomLeft }
}