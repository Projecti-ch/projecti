import { test, expect, type Page } from "@playwright/test";

/**
 * Technik-Briefing Block B (Barrierefreiheit). Before this the stylesheet had
 * no focus rule, there was no skip link and no <header>, the menu button had
 * no aria-expanded, the testimonial dots were "Testimonial 1"…, the strip ran
 * on with keyboard focus inside it, every quote was read twice, and fade-in,
 * autoscroll, smooth scroll, silk and hero video ignored reduced motion.
 */

const JADE = "rgb(28, 124, 84)";
const MINT = "rgb(115, 226, 167)";

async function dismissConsent(page: Page) {
  const decline = page.getByRole("button", { name: "Ablehnen" });
  if (await decline.isVisible().catch(() => false)) await decline.click();
}

test("first Tab shows the skip link; Enter moves focus into main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Zum Inhalt springen" });
  await expect(skip).toBeFocused();
  const box = await skip.boundingBox();
  expect(box!.width, "skip link visible while focused").toBeGreaterThan(40);

  await page.keyboard.press("Enter");
  await expect(page.locator("main#inhalt")).toBeFocused();
});

test("skip link is hidden until focused", async ({ page }) => {
  await page.goto("/");
  const box = await page.getByRole("link", { name: "Zum Inhalt springen" }).boundingBox();
  expect(box!.width).toBeLessThanOrEqual(1);
});

for (const path of ["/", "/projekte", "/ressourcen", "/kontakt", "/rechtliches"]) {
  test(`${path}: header with navigation and a main#inhalt`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("header nav[aria-label='Hauptnavigation']")).toHaveCount(1);
    await expect(page.locator("main#inhalt")).toHaveCount(1);
  });
}

test("detail pages have a main#inhalt too", async ({ page, request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const detail = [...xml.matchAll(/<loc>[^<]+(\/ressourcen\/[^<]+)<\/loc>/g)][0][1];
  await page.goto(detail);
  await expect(page.locator("main#inhalt")).toHaveCount(1);
});

test("focus ring: jade on light surfaces, mint on dark ones", async ({ page }) => {
  await page.goto("/");
  await dismissConsent(page);

  const ring = () =>
    page.evaluate(() => {
      const el = document.activeElement!;
      const s = getComputedStyle(el);
      return {
        dark: !!el.closest(".bg-surface-dark, [data-surface='dark']"),
        style: s.outlineStyle,
        width: s.outlineWidth,
        color: s.outlineColor,
        offset: s.outlineOffset,
      };
    });

  // Keyboard focus (not element.focus()) so :focus-visible matches.
  let sawLight = false;
  let sawDark = false;
  for (let i = 0; i < 80 && !(sawLight && sawDark); i++) {
    await page.keyboard.press("Tab");
    const r = await ring();
    expect(r.style, `tab stop ${i}`).toBe("solid");
    expect(r.width).toBe("2px");
    expect(r.offset).toBe("2px");
    // Links with transition-colors fade the outline colour in over ~200ms,
    // so poll for the settled value.
    await expect.poll(async () => (await ring()).color, { timeout: 1000 }).toBe(r.dark ? MINT : JADE);
    if (r.dark) sawDark = true;
    else sawLight = true;
  }
  expect(sawLight && sawDark, "reached focusables on both surfaces").toBe(true);
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("aria-expanded follows the state, Escape closes and returns focus", async ({ page }) => {
    await page.goto("/");
    await dismissConsent(page);
    const button = page.getByRole("button", { name: "Menü" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    const menuId = await button.getAttribute("aria-controls");
    const menu = page.locator(`#${menuId}`);
    await expect(menu).toHaveCount(1);

    // Closed: links are out of the tab order.
    await expect(menu).toHaveAttribute("inert", "");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(menu).not.toHaveAttribute("inert", "");
    await expect(menu.getByRole("link", { name: "Projekte" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
  });
});

test.describe("testimonials", () => {
  test("dots are German, numbered, and mark the active one", async ({ page }) => {
    await page.goto("/");
    const dots = page.getByRole("button", { name: /^Kundenstimme \d von 6$/ });
    await expect(dots).toHaveCount(6);
    await expect(page.locator('button[aria-current="true"][aria-label^="Kundenstimme"]')).toHaveCount(1);
  });

  test("each quote is exposed once; the loop copies are hidden and inert", async ({ page }) => {
    await page.goto("/");
    const scroller = page.locator(".testimonial-scroll");
    await expect(scroller.locator(":scope > div")).toHaveCount(12);
    await expect(scroller.locator(':scope > div[aria-hidden="true"][inert]')).toHaveCount(6);
    await expect(scroller.locator(':scope > div:not([aria-hidden="true"])')).toHaveCount(6);
  });

  test("autoscroll stops while keyboard focus is in the strip", async ({ page }) => {
    await page.goto("/");
    await dismissConsent(page);
    const scroller = page.locator(".testimonial-scroll");
    await scroller.scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Kundenstimme 1 von 6" }).focus();
    await page.waitForTimeout(600);
    const before = await scroller.evaluate((n) => n.scrollLeft);
    await page.waitForTimeout(3600);
    expect(await scroller.evaluate((n) => n.scrollLeft)).toBe(before);
  });

  test("autoscroll runs when nothing holds it (guards the pause test)", async ({ page }) => {
    await page.goto("/");
    await dismissConsent(page);
    const scroller = page.locator(".testimonial-scroll");
    await page.mouse.move(0, 0);
    await page.waitForTimeout(3800);
    expect(await scroller.evaluate((n) => n.scrollLeft)).toBeGreaterThan(0);
  });
});

test.describe("reduced motion", () => {
  test("nothing moves by itself on the homepage and nothing stays hidden", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await dismissConsent(page);

    // Below-the-fold content is fully visible without scrolling.
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll(".fade-in")].filter((n) => getComputedStyle(n).opacity !== "1").length
    );
    expect(hidden).toBe(0);

    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");

    const scroller = page.locator(".testimonial-scroll");
    await page.waitForTimeout(3800);
    expect(await scroller.evaluate((n) => n.scrollLeft)).toBe(0);

    // Hero video keeps its poster instead of autoplaying.
    await expect(page.locator("mux-player").first()).not.toHaveAttribute("autoplay", /.*/);
  });
});
