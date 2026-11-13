import type { MetadataRoute } from "next";
import { getProjects, getUpdates } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

// Static routes. /rechtliches is left out on purpose: it is noindex.
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/ueber", changeFrequency: "monthly", priority: 0.8 },
  { path: "/planung", changeFrequency: "monthly", priority: 0.9 },
  { path: "/digitale-loesungen", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projekte", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ressourcen", changeFrequency: "weekly", priority: 0.7 },
  { path: "/kontakt", changeFrequency: "yearly", priority: 0.6 },
];

// Built from the same CMS queries as generateStaticParams of the detail
// pages, so every published project and resource is listed without a code
// change. lastModified comes from the CMS entry itself.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ docs: projects }, { docs: updates }] = await Promise.all([
    getProjects({ limit: 100, depth: 0 }),
    getUpdates({ limit: 100, depth: 0 }),
  ]);

  const newest = [...projects, ...updates]
    .map((d) => d.updatedAt)
    .sort()
    .at(-1);

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      // Static pages have no CMS timestamp; the listing pages change whenever
      // an entry changes, the rest use the build time.
      lastModified:
        (r.path === "/projekte" || r.path === "/ressourcen") && newest
          ? new Date(newest)
          : new Date(),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projekte/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...updates.map((u) => ({
      url: absoluteUrl(`/ressourcen/${u.slug}`),
      lastModified: new Date(u.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
