// Скриншоты главной через Playwright: desktop 1440px и mobile 390px.
// Снимаем в reduced-motion — страница в финальном состоянии (без прелоадера,
// без скрытого до скролла текста), это честная картинка композиции.
// Запуск: node scripts/shot.mjs  (dev-сервер должен быть поднят на :3000)

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SHOT_URL || "http://localhost:3000";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  // дать шрифтам и layout устаканиться
  await page.waitForTimeout(1200);
  const file = `${OUT}/${s.name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log("✓", file, `(${s.width}px)`);
  await ctx.close();
}

await browser.close();
console.log("Готово. Скриншоты в ./screenshots");
