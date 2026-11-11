// qa-no-matrix.mjs — home + about with the matrix rain removed.
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

  out.homeCanvas = await page.evaluate(
    () => document.querySelectorAll(".matrix-canvas").length,
  );
  out.homeBg = await page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector(".intro"));
    return cs.backgroundImage !== "none" ? "painted" : "none";
  });
  await page.screenshot({ path: "qa-home-nomatrix.png" });

  await page.getByRole("button", { name: "About me" }).click({ force: true });
  await page.waitForSelector(".about-card", { timeout: 10000 });
  await page.waitForTimeout(1400);

  out.aboutCanvas = await page.evaluate(
    () => document.querySelectorAll(".matrix-canvas").length,
  );
  out.aboutBgVisible = await page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector(".about-bg"));
    return cs.backgroundImage.includes("mypic");
  });
  await page.screenshot({ path: "qa-about-nomatrix.png" });

  return out;
}
