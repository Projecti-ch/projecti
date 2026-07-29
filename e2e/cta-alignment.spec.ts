import { test, expect } from "@playwright/test";

/**
 * The closing call-to-action inside the green card is centered on mobile and
 * left-aligned from md up. It is a deliberate split, so both halves are pinned.
 *
 * The button is identified by its computed style (mint background + the px-5
 * on-dark padding) rather than by text, because the label differs per page
 * ("Austausch buchen", "Erstgespräch vereinbaren", "Gespräch abmachen").
 */

const PAGES = ["/", "/planung", "/projekte", "/ressourcen"];

async function ctaGaps(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const el = [...document.querySelectorAll("a")].find(
      (a) =>
        getComputedStyle(a).backgroundColor === "rgb(115, 226, 167)" &&
        getComputedStyle(a).paddingLeft === "20px"
    );
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      left: Math.round(r.left),
      right: Math.round(window.innerWidth - r.right),
    };
  });
}

for (const path of PAGES) {
  test(`${path} centers the green-card CTA on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);

    const gaps = await ctaGaps(page);
    expect(gaps, `no green-card CTA found on ${path}`).not.toBeNull();
    // Equal gutters either side is what "centered" means here. 2px of slack
    // absorbs sub-pixel rounding.
    expect(Math.abs(gaps!.left - gaps!.right)).toBeLessThanOrEqual(2);
  });
}

test("the green-card CTA stays left-aligned on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const gaps = await ctaGaps(page);
  expect(gaps).not.toBeNull();
  // Well off-center: the button sits against the left edge of the card.
  expect(gaps!.right).toBeGreaterThan(gaps!.left * 1.5);
});
