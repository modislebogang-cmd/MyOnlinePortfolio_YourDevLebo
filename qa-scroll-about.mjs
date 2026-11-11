// qa-scroll-about.mjs — home page, then scroll down to the about section.
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

  out.scroller = await page.evaluate(() => {
    const el = document.querySelector(".intro-scroll");
    return {
      exists: !!el,
      scrollHeight: el?.scrollHeight,
      clientHeight: el?.clientHeight,
      scrollTop: el?.scrollTop,
    };
  });
  await page.screenshot({ path: "qa-scroll-home.png" });

  // scroll down with the wheel, like a user
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1200);

  out.afterWheel = await page.evaluate(() => {
    const el = document.querySelector(".intro-scroll");
    const card = document.querySelector(".about-card");
    const r = card?.getBoundingClientRect();
    return {
      scrollTop: el?.scrollTop,
      cardTop: r?.top,
      cardVisible: !!r && r.top < window.innerHeight && r.bottom > 0,
    };
  });
  await page.screenshot({ path: "qa-scroll-about.png" });

  // back to top button
  await page.click(".about-back");
  await page.waitForTimeout(1200);
  out.afterBack = await page.evaluate(
    () => document.querySelector(".intro-scroll").scrollTop,
  );

  // About me button scrolls down too
  await page.getByRole("button", { name: "About me" }).click({ force: true });
  await page.waitForTimeout(1200);
  out.afterButton = await page.evaluate(
    () => document.querySelector(".intro-scroll").scrollTop,
  );

  return out;
}
