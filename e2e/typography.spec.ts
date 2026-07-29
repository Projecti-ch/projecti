import { test, expect } from "@playwright/test";

/**
 * The site uses Swiss Standard German quotation marks («…») throughout.
 *
 * The Datenschutz page previously opened with „ (U+201E) and closed with a
 * plain ASCII " (U+0022), which rendered as a mismatched pair. Straight quotes
 * in prose are the tell, so they are what these tests forbid.
 */

const PAGES = [
  "/",
  "/planung",
  "/digitale-loesungen",
  "/projekte",
  "/ressourcen",
  "/ueber",
  "/kontakt",
  "/rechtliches",
];

for (const path of PAGES) {
  test(`${path} uses Swiss guillemets and no straight or low quotes`, async ({
    page,
  }) => {
    await page.goto(path);

    const counts = await page.evaluate(() => {
      const text = document.body.innerText;
      const count = (re: RegExp) => (text.match(re) || []).length;
      return {
        straight: count(/"/g),
        low: count(/„/g),
        curlyClose: count(/“/g),
        open: count(/«/g),
        close: count(/»/g),
      };
    });

    expect(counts.straight, "straight ASCII quotes in rendered prose").toBe(0);
    expect(counts.low, "German low quotes („) in rendered prose").toBe(0);
    expect(counts.curlyClose, "curly quotes (“) in rendered prose").toBe(0);
    // Guillemets must be balanced wherever they are used.
    expect(counts.open).toBe(counts.close);
  });
}

test("the Datenschutz page renders its four guillemet pairs", async ({
  page,
}) => {
  await page.goto("/rechtliches");

  const quoted = await page.evaluate(() =>
    (document.body.innerText.match(/«[^»]{0,30}»/g) || [])
  );

  expect(quoted).toEqual(["«wir»", "«uns»", "«Cookies»", "«Browser Add-on»"]);
});
