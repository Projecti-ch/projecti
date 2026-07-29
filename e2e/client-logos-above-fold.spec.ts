import { test, expect } from "@playwright/test";

/**
 * The client-logo strip ("Kunden, die uns vertrauen") must be fully visible in
 * the opening viewport on desktop, with no scroll. Two independent things can
 * break that, so both are asserted:
 *
 *   1. The FadeIn wrapper must already carry `.visible`. Its IntersectionObserver
 *      uses a -10% bottom rootMargin, so a block landing in the last 10% of the
 *      viewport never fires without a scroll.
 *   2. The tile must physically clear the fold. The hero is a vh percentage
 *      while the strip below it is a fixed pixel height, so growing the hero
 *      pushes the logos under the fold even when the fade fires correctly.
 */

// Real desktop resolutions the site is expected to open cleanly on.
const DESKTOP_VIEWPORTS = [
  { name: "1920x1080 (16:9)", width: 1920, height: 1080 },
  { name: "2560x1440 (16:9)", width: 2560, height: 1440 },
  { name: "1600x900 (16:9)", width: 1600, height: 900 },
  { name: "1440x900 (16:10)", width: 1440, height: 900 },
  { name: "1366x768 (16:9)", width: 1366, height: 768 },
  { name: "1280x720 (16:9)", width: 1280, height: 720 },
];

for (const vp of DESKTOP_VIEWPORTS) {
  test(`client logos are fully visible without scrolling at ${vp.name}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");

    const tile = page.locator(".logo-marquee__track > div").first();
    await expect(tile).toBeVisible();

    // Nothing below may have scrolled the page.
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    // 1. The fade must have fired on load, not on scroll.
    const faded = page.locator(".logo-marquee").locator("xpath=ancestor::div[contains(@class,'fade-in')][1]");
    await expect(faded).toHaveClass(/\bvisible\b/);
    await expect(faded).toHaveCSS("opacity", "1");

    // 2. The whole tile, not just its top edge, must sit above the fold.
    const box = await tile.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(vp.height);

    // The logo image inside the tile must clear the fold too.
    const imgBox = await tile.locator("img").boundingBox();
    expect(imgBox).not.toBeNull();
    expect(imgBox!.y + imgBox!.height).toBeLessThanOrEqual(vp.height);
  });
}

test("below-the-fold sections still wait for a scroll to fade in", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  // Guards against "fix the fold bug by revealing everything at once", which
  // would silently delete the scroll animation across the whole page.
  const hiddenBelowFold = await page.evaluate(() => {
    const all = [...document.querySelectorAll(".fade-in")];
    const below = all.filter(
      (el) => el.getBoundingClientRect().top >= window.innerHeight
    );
    return {
      count: below.length,
      allHidden: below.every((el) => !el.classList.contains("visible")),
    };
  });

  expect(hiddenBelowFold.count).toBeGreaterThan(0);
  expect(hiddenBelowFold.allHidden).toBe(true);
});

test("below-the-fold sections do fade in once scrolled to", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  // The mount-time reveal must not have cost us the scroll animation itself.
  // Pick the first block that starts below the fold, scroll it into view, and
  // require that its IntersectionObserver actually fires.
  // Index against the same unfiltered node list the browser sees, so the
  // locator and the evaluated index can never drift apart.
  const targetIndex = await page.evaluate(() =>
    [...document.querySelectorAll(".fade-in")].findIndex(
      (el) => el.getBoundingClientRect().top >= window.innerHeight
    )
  );
  expect(targetIndex).toBeGreaterThanOrEqual(0);

  const target = page.locator(".fade-in").nth(targetIndex);

  await expect(target).not.toHaveClass(/\bvisible\b/);

  await target.scrollIntoViewIfNeeded();

  await expect(target).toHaveClass(/\bvisible\b/, { timeout: 5_000 });
  await expect(target).toHaveCSS("opacity", "1");
});

test("the first logo copy loads eagerly and the duplicate stays lazy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  // The marquee renders two identical copies. The first sits in the opening
  // viewport on desktop so it must not wait on the lazy-load threshold; the
  // aria-hidden duplicate exists only to make the loop seamless.
  const loading = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement>(".logo-marquee__track img")].map(
      (img) => img.getAttribute("loading")
    )
  );

  // Derived, not hardcoded, so adding a client logo doesn't fail this test
  // with a misleading "expected 12" message.
  expect(loading.length % 2).toBe(0);
  const half = loading.length / 2;
  expect(half).toBeGreaterThan(0);
  expect(loading.slice(0, half)).toEqual(Array(half).fill("eager"));
  expect(loading.slice(half)).toEqual(Array(half).fill("lazy"));
});
