// qa-about-bw.mjs — open About me and screenshot desktop + mobile.
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
    await page.waitForTimeout(1600);
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  await openAbout();
  out.bg = await page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector(".about-bg"));
    return {
      hasImage: cs.backgroundImage.includes("mypic"),
      filter: cs.filter,
      opacity: cs.opacity,
    };
  });
  out.overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  await page.screenshot({ path: "qa-about-bw.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "qa-about-bw-mobile.png", fullPage: true });

  return out;
}
