// qa-shots.mjs — screenshot each step of the gate flow + verify home bg.
export default async function run(page, ui) {
  const out = {};

  await page.setViewportSize({ width: 1280, height: 800 });

  // step 1
  await page.waitForSelector(".gate-question", { timeout: 10000 });
  await page.screenshot({ path: "qa-step1-name.png" });

  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  // step 2
  await page.waitForSelector(".welcome-line", { timeout: 10000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: "qa-step2-welcome.png" });

  // step 3
  await page.waitForSelector(".map-pin", { timeout: 12000 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "qa-step3-map.png" });

  // step 4 — home page. Confirm .intro itself still paints a background now
  // that App no longer nests it (regression check on the refactor).
  await page.waitForSelector(".laptop", { timeout: 10000 });
  await page.waitForSelector(".intro-copy.is-visible", { timeout: 12000 });
  out.homeIntroBackground = await page.evaluate(() => {
    const bg = getComputedStyle(
      document.querySelector(".intro"),
    ).backgroundImage;
    return bg && bg !== "none" ? "painted" : "none";
  });
  await page.screenshot({ path: "qa-step4-home.png" });

  return out;
}
