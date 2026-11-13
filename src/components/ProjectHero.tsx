import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";

interface ProjectHeroProps {
  imageUrl: string | null;
  imageAlt?: string;
  breadcrumb: string; // e.g., "Projekte | Planung | Entwicklung MFH"
  /** Full title of the entry, rendered as the page's only h1. */
  title: string;
}

export default function ProjectHero({
  imageUrl,
  imageAlt = "",
  breadcrumb,
  title,
}: ProjectHeroProps) {
  // Parse breadcrumb into parts
  const parts = breadcrumb.split("|").map((p) => p.trim());

  // Determine base path from first breadcrumb part
  const basePath = parts[0]?.toLowerCase() === "ressourcen" ? "/ressourcen" : "/projekte";

  return (
    <section data-surface="dark" className="relative h-[70vh] min-h-[280px] w-full overflow-hidden">
      {/* Background Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-dark" />
      )}

      {/* Evergreen scrim — matches SubpageHero tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,24,16,.3) 0%, rgba(10,24,16,.45) 36%, rgba(10,24,16,.75) 64%, rgba(10,24,16,.96) 100%)",
        }}
      />

      {/* Breadcrumb + title */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20 pb-6 md:pb-8">
          <FadeIn>
            <nav aria-label="Brotkrumen">
              <p className="text-[18px] md:text-[22px] lg:text-[26px] font-light text-mint">
                {parts.map((part, i) => (
                  <span key={i}>
                    {i === 0 ? (
                      <Link
                        href={basePath}
                        className="hover:underline underline-offset-4 transition-colors"
                      >
                        {part}
                      </Link>
                    ) : (
                      <span aria-current={i === parts.length - 1 ? "page" : undefined}>
                        {part}
                      </span>
                    )}
                    {i < parts.length - 1 && (
                      <span className="mx-2" aria-hidden="true">|</span>
                    )}
                  </span>
                ))}
              </p>
            </nav>
            {/* Interim placement (Technik-Briefing A2): full title directly under
                the breadcrumb in the site's existing hero title size. The final
                position comes with the redesign. */}
            <h1 className="mt-3 max-w-[900px] text-[28px] md:text-[38px] leading-[1.18] tracking-[-0.005em] font-light text-[#f7faf4]">
              {title}
            </h1>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
