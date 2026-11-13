import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Technik-Briefing Block A (Auffindbarkeit). Before this, the sitemap listed
 * only the 7 static pages, no detail page had an h1, no page had a canonical
 * or JSON-LD, /llms.txt was a 404 and CMS sections rendered images with
 * alt="Section 1 image". These tests walk every sitemap URL so a new CMS
 * entry is covered without touching the test.
 */

const SITE = "https://www.projecti.ch";
const STATIC = ["/", "/ueber", "/planung", "/digitale-loesungen", "/projekte", "/ressourcen", "/kontakt"];

async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const path = m[1].replace(SITE, "");
    return path === "" ? "/" : path;
  });
}

test("sitemap lists static pages plus every CMS detail page, not /rechtliches", async ({ request }) => {
  const paths = await sitemapPaths(request);
  for (const p of STATIC) expect(paths).toContain(p);
  expect(paths).not.toContain("/rechtliches");

  const details = paths.filter((p) => /^\/(projekte|ressourcen)\/.+/.test(p));
  expect(details.length, "detail pages from the CMS").toBeGreaterThan(0);

  // Same set as llms.txt, which is also built from the CMS.
  const llms = await (await request.get("/llms.txt")).text();
  for (const d of details) expect(llms).toContain(`${SITE}${d})`);

  const xml = await (await request.get("/sitemap.xml")).text();
  expect((xml.match(/<lastmod>/g) || []).length).toBe(paths.length);
});

test("llms.txt is plain text with summary block and sections", async ({ request }) => {
  const res = await request.get("/llms.txt");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("text/plain");
  const body = await res.text();
  expect(body.startsWith("# Projecti\n\n> ")).toBe(true);
  for (const h of ["## Leistungen", "## Projekte", "## Ressourcen", "## Kontakt"]) {
    expect(body).toContain(h);
  }
});

test("robots.txt no longer blocks /rechtliches, which keeps noindex", async ({ request, page }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).not.toContain("Disallow");
  expect(robots).toContain("Sitemap: https://www.projecti.ch/sitemap.xml");

  await page.goto("/rechtliches");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${SITE}/rechtliches`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/rechtliches`);
});

test("every sitemap page: one h1, no skipped heading level, canonical, JSON-LD, length limits, real alt text", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const paths = await sitemapPaths(request);

  for (const path of paths) {
    await page.goto(path);

    const info = await page.evaluate(() => {
      const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent || "");
      return {
        levels,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
        jsonLd,
        alts: [...document.querySelectorAll("img")].map((i) => i.getAttribute("alt")),
      };
    });

    expect(info.levels.filter((l) => l === 1).length, `${path}: h1 count`).toBe(1);
    for (let i = 1; i < info.levels.length; i++) {
      expect(info.levels[i], `${path}: heading ${i} after h${info.levels[i - 1]}`).toBeLessThanOrEqual(info.levels[i - 1] + 1);
    }

    expect(info.canonical, `${path}: canonical`).toBe(path === "/" ? SITE : `${SITE}${path}`);

    expect(info.jsonLd.length, `${path}: JSON-LD`).toBeGreaterThan(0);
    for (const raw of info.jsonLd) expect(() => JSON.parse(raw), `${path}: JSON-LD parses`).not.toThrow();

    expect(info.title.length, `${path}: title «${info.title}»`).toBeLessThanOrEqual(60);
    expect(info.description.length, `${path}: description`).toBeLessThanOrEqual(160);

    for (const alt of info.alts) {
      expect(alt, `${path}: every img has an alt attribute`).not.toBeNull();
      expect(alt!, `${path}: placeholder alt`).not.toMatch(/image( \d+)?$/i);
    }
  }
});

test("detail page: h1 carries the full title, breadcrumb is a labelled nav, Article + BreadcrumbList", async ({
  page,
  request,
}) => {
  const paths = await sitemapPaths(request);
  const project = paths.find((p) => p.startsWith("/projekte/"))!;
  const resource = paths.find((p) => p.startsWith("/ressourcen/"))!;

  for (const path of [project, resource]) {
    await page.goto(path);
    await expect(page.getByRole("navigation", { name: "Brotkrumen" })).toBeVisible();

    const graph = await page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
        (s) => JSON.parse(s.textContent || "{}")["@graph"] || []
      )
    );
    const article = graph.find((n: { "@type": string }) => n["@type"] === "Article");
    expect(article, `${path}: Article`).toBeTruthy();
    expect(graph.some((n: { "@type": string }) => n["@type"] === "BreadcrumbList")).toBe(true);
    for (const f of ["headline", "datePublished", "dateModified", "author"]) {
      expect(article[f], `${path}: Article.${f}`).toBeTruthy();
    }

    // The h1 is the article headline, not the short breadcrumb title.
    await expect(page.locator("h1")).toHaveText(article.headline);
  }
});

test("homepage has Organization and WebSite, /ueber has Person", async ({ page }) => {
  const types = async (path: string) => {
    await page.goto(path);
    return page.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) =>
        (JSON.parse(s.textContent || "{}")["@graph"] || []).map((n: { "@type": string }) => n["@type"])
      )
    );
  };
  expect(await types("/")).toEqual(expect.arrayContaining(["ProfessionalService", "WebSite"]));
  expect(await types("/ueber")).toEqual(expect.arrayContaining(["Person"]));
});
