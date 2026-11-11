// qa-about.mjs — walk the gate flow, open About me, screenshot it.
export default async function run(page) {
  const out = {};
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.waitForSelector(".gate-question", { timeout: 15000 });
  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  // The typing animation is slow in headless, so poll instead of waiting on
  // the class that only lands when it finishes.
  const t0 = Date.now();
  while (Date.now() - t0 < 40000) {
    const ready = await page.evaluate(
      () => !!document.querySelector(".intro-copy.is-visible"),
    );
    if (ready) break;
    await page.waitForTimeout(250);
  }
  out.msToHome = Date.now() - t0;
  await page.waitForTimeout(800);

  await page.getByRole("button", { name: "About me" }).click({ force: true });
  await page.waitForSelector(".about-card", { timeout: 10000 });
  await page.waitForTimeout(700);

  out.logos = await page.evaluate(() =>
    [...document.querySelectorAll(".stack-logos svg")].map((s) =>
      s.getAttribute("aria-label"),
    ),
  );
  out.photoLoaded = await page.evaluate(() => {
    const img = document.querySelector(".about-photo");
    return img ? img.complete && img.naturalWidth > 0 : false;
  });
  out.overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  await page.screenshot({ path: "qa-about.png" });

  // back button returns home
  await page.click(".about-back");
  await page.waitForSelector(".laptop", { timeout: 10000 });
  out.backToHome = true;

  // mobile view
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "About me" }).click({ force: true });
  await page.waitForSelector(".about-card", { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "qa-about-mobile.png", fullPage: true });

  return out;
}
