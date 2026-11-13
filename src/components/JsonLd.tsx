/**
 * Renders schema.org data as a JSON-LD script. Several nodes are wrapped in
 * one @graph so they can reference each other by @id.
 *
 * "<" is escaped so CMS text can never close the script tag early.
 */
export default function JsonLd({ data }: { data: Record<string, unknown>[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": data,
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
