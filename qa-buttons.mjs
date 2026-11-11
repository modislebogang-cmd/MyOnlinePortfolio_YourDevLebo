// qa-buttons.mjs — home shows only About me + scroll down; about shows Hire me + back to top.
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

  out.homeButtons = await page.evaluate(() =>
    [...document.querySelectorAll(".intro-copy button")].map((b) =>
      b.innerText.trim(),
    ),
  );
  await page.screenshot({ path: "qa-buttons-home.png" });

  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1200);

  out.aboutButtons = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        ".about-section button, .about-section a.btn",
      ),
    ].map((b) => b.innerText.trim()),
  );
  await page.screenshot({ path: "qa-buttons-about.png" });

  // back to top works
  await page.click(".about-back");
  await page.waitForTimeout(1200);
  out.scrollTopAfterBack = await page.evaluate(
    () => document.querySelector(".intro-scroll").scrollTop,
  );

  return out;
}
