// qa-debug.mjs — what is on screen after the name step?
export default async function run(page) {
  const out = {};
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForSelector(".gate-question", { timeout: 15000 });
  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  for (const t of [1000, 3000, 6000, 9000]) {
    await page.waitForTimeout(t === 1000 ? 1000 : 2000);
    out[`t${t}`] = await page.evaluate(() => ({
      laptop: !!document.querySelector(".laptop"),
      copy: document.querySelector(".intro-copy")?.className ?? null,
      boot: !!document.querySelector(".boot"),
      welcome: !!document.querySelector(".welcome-line"),
      map: !!document.querySelector(".map-card"),
      body: document.body.innerText.slice(0, 120),
    }));
  }
  await page.screenshot({ path: "qa-debug.png" });
  return out;
}
