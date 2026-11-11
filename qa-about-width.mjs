// qa-about-width.mjs — measure the about card at phone width.
export default async function run(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForSelector(".gate-question", { timeout: 15000 });
  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  const t0 = Date.now();
  while (Date.now() - t0 < 40000) {
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
  await page.waitForTimeout(400);

  return page.evaluate(() => {
    const r = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { left: b.left, right: b.right, width: b.width };
    };
    return {
      innerWidth: window.innerWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      gate: r(".about-gate"),
      card: r(".about-card"),
      grid: r(".about-grid"),
      copy: r(".about-copy"),
      summary: r(".about-summary"),
      stack: r(".about-stack"),
      gateOverflowY: getComputedStyle(document.querySelector(".about-gate"))
        .overflowY,
      gateDisplay: getComputedStyle(document.querySelector(".about-gate"))
        .display,
    };
  });
}
