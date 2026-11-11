// qa-debug2.mjs — poll for the home page and report what is there.
export default async function run(page) {
  const out = {};
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForSelector(".gate-question", { timeout: 15000 });
  await page.fill(".gate-input", "Lebo");
  await page.click("button[type=submit]");

  const t0 = Date.now();
  let found = false;
  while (Date.now() - t0 < 30000) {
    found = await page.evaluate(() => !!document.querySelector(".laptop"));
    if (found) break;
    await page.waitForTimeout(250);
  }
  out.msToLaptop = Date.now() - t0;
  out.found = found;
  out.state = await page.evaluate(() => ({
    copy: document.querySelector(".intro-copy")?.className ?? null,
    boot: !!document.querySelector(".boot"),
    body: document.body.innerText.slice(0, 200),
  }));
  await page.screenshot({ path: "qa-debug2.png" });
  return out;
}
