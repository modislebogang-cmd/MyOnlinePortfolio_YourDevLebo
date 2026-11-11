// qa-home-bw.mjs — reach the home page and screenshot the laptop photo.
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
  await page.waitForTimeout(1200);

  out.photo = await page.evaluate(() => {
    const img = document.querySelector(".screen-photo");
    if (!img) return null;
    return {
      loaded: img.complete && img.naturalWidth > 0,
      filter: getComputedStyle(img).filter,
    };
  });
  await page.screenshot({ path: "qa-home-bw.png" });
  return out;
}
