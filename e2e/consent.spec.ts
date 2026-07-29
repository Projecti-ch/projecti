import { test, expect } from "@playwright/test";

/**
 * Analytics must not run until the visitor has actively chosen. Previously GA4
 * loaded unconditionally and _ga, _ga_* and muxData were all present on first
 * paint with no choice offered, which is the Swiss revDSG / GDPR problem.
 *
 * Each test gets a fresh browser context, so "no cookies yet" is real rather
 * than an artifact of leftover local state.
 */

const analytics = (names: string[]) =>
  names.filter((n) => n.startsWith("_ga") || n === "_gid" || n === "muxData");

async function cookieNames(context: import("@playwright/test").BrowserContext) {
  return (await context.cookies()).map((c) => c.name);
}

test("a first-time visitor gets no analytics cookies and sees the banner", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await expect(page.getByRole("dialog", { name: /cookie/i })).toBeVisible();

  // Give any stray script a chance to fire before asserting absence.
  await page.waitForTimeout(1500);

  expect(analytics(await cookieNames(context))).toEqual([]);
  expect(await page.evaluate(() => typeof (window as never as { gtag?: unknown }).gtag)).toBe(
    "undefined"
  );
});

test("accepting loads analytics and dismisses the banner", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Akzeptieren" }).click();

  await expect(page.getByRole("dialog", { name: /cookie/i })).toBeHidden();
  await expect
    .poll(async () => analytics(await cookieNames(context)).length, {
      timeout: 10_000,
    })
    .toBeGreaterThan(0);
});

test("declining sets no analytics cookies and the banner stays dismissed", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ablehnen" }).click();

  await expect(page.getByRole("dialog", { name: /cookie/i })).toBeHidden();
  await page.waitForTimeout(1500);
  expect(analytics(await cookieNames(context))).toEqual([]);

  // The choice must survive a reload, or the banner nags on every page view.
  await page.reload();
  await expect(page.getByRole("dialog", { name: /cookie/i })).toBeHidden();
  expect(analytics(await cookieNames(context))).toEqual([]);
});

test("withdrawing consent clears cookies that were already set", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Akzeptieren" }).click();
  await expect
    .poll(async () => analytics(await cookieNames(context)).length, {
      timeout: 10_000,
    })
    .toBeGreaterThan(0);

  // Withdraw. Stopping future tracking is not enough on its own: the visitor
  // would still be carrying the _ga client id they were assigned.
  await page.evaluate(() => localStorage.removeItem("projecti-consent"));
  await page.reload();
  await page.getByRole("button", { name: "Ablehnen" }).click();

  await expect
    .poll(async () => analytics(await cookieNames(context)).length, {
      timeout: 10_000,
    })
    .toBe(0);
});

test("the consent banner does not cover the client logos", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");

  // The banner is deliberately a single compact row so it sits below the logo
  // strip rather than hiding the thing we put above the fold on purpose.
  const banner = page.getByRole("dialog", { name: /cookie/i });
  await expect(banner).toBeVisible();

  const img = await page
    .locator(".logo-marquee__track > div img")
    .first()
    .boundingBox();
  const bar = await banner.boundingBox();

  expect(img).not.toBeNull();
  expect(bar).not.toBeNull();
  expect(img!.y + img!.height).toBeLessThanOrEqual(bar!.y);
});
