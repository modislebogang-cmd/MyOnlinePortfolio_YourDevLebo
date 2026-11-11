// qa-cta-row.mjs — Hire me + back to top side by side in the about section.
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

  out.layout = await page.evaluate(() => {
    const hire = document.querySelector(".about-cta .btn");
    const back = document.querySelector(".about-back");
    const h = hire.getBoundingClientRect();
    const b = back.getBoundingClientRect();
    const cs = getComputedStyle(back);
    return {
      hire: { top: Math.round(h.top), left: Math.round(h.left) },
      back: { top: Math.round(b.top), left: Math.round(b.left) },
      sameRow: Math.abs(h.top - b.top) < 12,
      backStyle: {
        radius: cs.borderRadius,
        border: cs.borderTopWidth,
        bg: cs.backgroundColor,
        font: cs.fontSize,
      },
      backInCard: !!document.querySelector(".about-card > .about-back"),
    };
  });
  await page.screenshot({ path: "qa-cta-row.png" });

  await page.click(".about-back");
  await page.waitForTimeout(1200);
  out.scrollTopAfterBack = await page.evaluate(
    () => document.querySelector(".intro-scroll").scrollTop,
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.mouse.move(195, 500);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "qa-cta-row-mobile.png" });

  return out;
}
