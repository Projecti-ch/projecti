import { getProjects, getUpdates } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI
// services. Project and resource lists come from the CMS, so new entries
// appear without a code change. Regenerated with the same 60 s ISR window
// as the CMS fetches.
export const revalidate = 60;

// VORLÄUFIG: Kurzbeschrieb ist die bestehende Seitenbeschreibung der
// Startseite. Wird mit dem Core Offering 2027 ersetzt (Technik-Briefing A5).
const SUMMARY =
  "Viele Projekte verlieren Zeit und Geld durch fragmentierte Informationen und unklare Entscheidungen. Projecti arbeitet anders. Wir strukturieren Planungsphasen, digitalisieren Abläufe und dokumentieren jede wichtige Entscheidung.";

/** First sentence of a CMS description, as a one-line summary. */
function oneLine(text: string | null | undefined): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  const match = clean.match(/^.+?[.!?](?=\s|$)/);
  return match ? match[0] : clean;
}

function link(title: string, path: string, note?: string): string {
  return `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
}

export async function GET() {
  const [{ docs: projects }, { docs: updates }] = await Promise.all([
    getProjects({ limit: 100, depth: 0 }),
    getUpdates({ limit: 100, depth: 0 }),
  ]);

  const body = [
    "# Projecti",
    "",
    `> ${SUMMARY}`,
    "",
    "Projecti GmbH, Bahnhofstrasse 11, 7302 Landquart, Schweiz. Architekturplanung und digitale Lösungen für Immobilienprojekte in der Deutschschweiz.",
    "",
    "## Leistungen",
    "",
    link("Planung", "/planung", "Strukturierte Architekturplanung von der Machbarkeitsstudie bis zur Ausführung."),
    link("Digitale Lösungen", "/digitale-loesungen", "GIS-Analysen, Projektmanagement und AI-Workflows für Immobilienprojekte."),
    "",
    "## Projekte",
    "",
    ...projects.map((p) => link(p.title, `/projekte/${p.slug}`, oneLine(p.metaDescription))),
    "",
    "## Ressourcen",
    "",
    ...updates.map((u) => link(u.title, `/ressourcen/${u.slug}`, oneLine(u.metaDescription))),
    "",
    "## Kontakt",
    "",
    link("Kontakt", "/kontakt", "Erstgespräch vereinbaren, E-Mail oder LinkedIn."),
    link("Über Projecti", "/ueber", "Luka Došen und die Idee hinter Projecti."),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
