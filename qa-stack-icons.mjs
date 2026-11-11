// qa-stack-icons.mjs — scroll to the about section and inspect the stack.
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

  out.stack = await page.evaluate(() => {
    const items = [...document.querySelectorAll(".stack-item")];
    return {
      count: items.length,
      labels: items.map((li) =>
        li.querySelector("svg")?.getAttribute("aria-label"),
      ),
      textNodes: items.map((li) => li.innerText.trim()),
      cardBg: getComputedStyle(document.querySelector(".about-card"))
        .backgroundColor,
      cardBorder: getComputedStyle(document.querySelector(".about-card"))
        .borderTopWidth,
      itemBg: getComputedStyle(items[0]).backgroundColor,
      itemBorder: getComputedStyle(items[0]).borderTopWidth,
    };
  });
  await page.screenshot({ path: "qa-stack-icons.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.mouse.move(195, 500);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "qa-stack-icons-mobile.png" });

  return out;
}
