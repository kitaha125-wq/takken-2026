import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "/tmp/kyomeshi-smoke";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("console", (msg) => console.log("CONSOLE", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("PAGEERROR", err.message));

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForSelector("text=きょうめし");
await page.screenshot({ path: `${outDir}/01-hero.png`, fullPage: false });

await page.locator("#planner").scrollIntoViewIfNeeded();
for (const item of ["卵", "キャベツ", "豚肉", "味噌"]) {
  const chip = page.getByRole("button", { name: `+ ${item}` });
  if (await chip.count()) await chip.click();
}
await page.getByRole("button", { name: "味噌バター炒め" }).click();
await page.screenshot({ path: `${outDir}/02-planner.png`, fullPage: true });

await page.getByRole("button", { name: "今日のレシピを提案" }).click();
await page.waitForSelector("text=保存する", { timeout: 15000 });
await page.screenshot({ path: `${outDir}/03-suggestions.png`, fullPage: true });

await page.getByRole("button", { name: "手順を見る" }).first().click();
await page.waitForSelector("text=料理モード");
await page.screenshot({ path: `${outDir}/04-cook.png`, fullPage: false });
await page.getByRole("button", { name: "できた・次へ" }).click();
await page.screenshot({ path: `${outDir}/05-cook-next.png`, fullPage: false });
await page.getByRole("button", { name: "閉じる" }).click();

const [saveRes] = await Promise.all([
  page.waitForResponse(
    (r) => r.url().includes("/api/recipes") && r.request().method() === "POST",
  ),
  page.getByRole("button", { name: "保存する" }).first().click(),
]);
const saved = await saveRes.json();
await page.waitForSelector("text=を保存しました");
await page.goto("http://127.0.0.1:3000/saved", { waitUntil: "networkidle" });
await page.waitForSelector(`text=${saved.recipe.title}`, { timeout: 15000 });
await page.screenshot({ path: `${outDir}/06-saved.png`, fullPage: true });
await page.goto(`http://127.0.0.1:3000/cook/${saved.recipe.id}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector('button:has-text("できた・次へ")', { timeout: 15000 });
await page.screenshot({ path: `${outDir}/07-cook-saved.png`, fullPage: false });

console.log("SMOKE_OK", outDir);
await browser.close();
