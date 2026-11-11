// qa-hire-me.mjs — scroll to the about section and check the Hire me button.
export default async function run(page) {
  const out = {};
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.waitForSelector(".gate-question", { timeout: 20000 });
  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  const t0 = Date.now();
  while (Date.now() - t0 < 45000) {
    if (
      await page.evaluate(
        () => !!document.querySelector(".intro-copy.is-visible"),
      )
    )
      break;
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(1000);

  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1200);

  out.cta = await page.evaluate(() => {
    const a = document.querySelector(".about-cta .btn");
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return {
      text: a.innerText.trim(),
      href: a.getAttribute("href"),
      visible: r.width > 0 && r.height > 0 && r.top < window.innerHeight,
      top: Math.round(r.top),
    };
  });
  await page.screenshot({ path: "qa-hire-me.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.mouse.move(195, 500);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "qa-hire-me-mobile.png" });

  return out;
}
