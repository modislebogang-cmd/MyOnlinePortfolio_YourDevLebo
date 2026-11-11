// qa-about-mobile.mjs — open About me at phone width and screenshot it.
export default async function run(page) {
  const out = {};
  await page.setViewportSize({ width: 390, height: 844 });

  await page.waitForSelector(".gate-question", { timeout: 15000 });
  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  const t0 = Date.now();
  while (Date.now() - t0 < 40000) {
    const ready = await page.evaluate(
      () => !!document.querySelector(".intro-copy.is-visible"),
    );
    if (ready) break;
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(600);

  await page.getByRole("button", { name: "About me" }).click({ force: true });
  await page.waitForSelector(".about-card", { timeout: 10000 });
  await page.waitForTimeout(600);

  out.overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  out.cardHeight = await page.evaluate(
    () => document.querySelector(".about-card").getBoundingClientRect().height,
  );
  await page.screenshot({ path: "qa-about-mobile.png", fullPage: true });
  return out;
}
