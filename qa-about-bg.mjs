// qa-about-bg.mjs — open About me and screenshot desktop + mobile.
export default async function run(page) {
  const out = {};

  async function openAbout() {
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
    await page.waitForTimeout(600);
    await page.getByRole("button", { name: "About me" }).click({ force: true });
    await page.waitForSelector(".about-card", { timeout: 10000 });
    await page.waitForTimeout(1400);
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  await openAbout();
  out.bg = await page.evaluate(() => {
    const el = document.querySelector(".about-bg");
    const cs = getComputedStyle(el);
    return {
      hasImage: cs.backgroundImage.includes("mypic"),
      size: cs.backgroundSize,
      opacity: cs.opacity,
      zIndex: cs.zIndex,
    };
  });
  out.overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  await page.screenshot({ path: "qa-about-bg.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "qa-about-bg-mobile.png", fullPage: true });

  return out;
}
