// Shared SEO helpers: one source for the site URL, title/description limits
// and the schema.org objects every page builds its JSON-LD from.

export const SITE_URL = "https://www.projecti.ch";
export const SITE_NAME = "Projecti";
export const TITLE_SUFFIX = ` | ${SITE_NAME}`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/lukadosen/";

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/ueber#luka-dosen`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for a site path ("/projekte" → "https://www.projecti.ch/projekte"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Shorten text to at most `max` characters, cutting at the last word
 * boundary and appending "…". Text that already fits is returned unchanged.
 */
export function truncateAtWord(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const room = clean.slice(0, max - 1); // leave space for the ellipsis
  const lastSpace = room.lastIndexOf(" ");
  const cut = lastSpace > 0 ? room.slice(0, lastSpace) : room;
  // Drop dangling punctuation such as "Studie:" or "Bauland –" before the ellipsis.
  return `${cut.replace(/[\s,;:.–—-]+$/u, "")}…`;
}

/**
 * Title segment for the root template "%s | Projecti". The full <title>
 * (segment + suffix) stays within TITLE_MAX characters.
 */
export function pageTitle(title: string): string {
  return truncateAtWord(title, TITLE_MAX - TITLE_SUFFIX.length);
}

/** Meta description limited to DESCRIPTION_MAX characters. */
export function pageDescription(description: string): string {
  return truncateAtWord(description, DESCRIPTION_MAX);
}

/* ─── schema.org builders ─── */

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: "Projecti GmbH",
    url: SITE_URL,
    logo: absoluteUrl("/projecti-logo-canvas.svg"),
    image: absoluteUrl("/images/projecti-social-preview.jpg"),
    email: "luka@projecti.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bahnhofstrasse 11",
      postalCode: "7302",
      addressLocality: "Landquart",
      addressCountry: "CH",
    },
    sameAs: [LINKEDIN_URL],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "de-CH",
    publisher: { "@id": ORG_ID },
  };
}

export function personSchema(): Json {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Luka Došen",
    jobTitle: "Gründer",
    url: absoluteUrl("/ueber"),
    image: absoluteUrl("/images/2026-portrait-luka.jpg"),
    sameAs: [LINKEDIN_URL],
    worksFor: { "@id": ORG_ID },
  };
}

export function articleSchema(input: {
  url: string;
  headline: string;
  description?: string | null;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
}): Json {
  return {
    "@type": "Article",
    mainEntityOfPage: input.url,
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: [input.image] } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    inLanguage: "de-CH",
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Luka Došen",
      url: absoluteUrl("/ueber"),
    },
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
