import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";

interface ProjectHeroProps {
  imageUrl: string | null;
  imageAlt?: string;
  breadcrumb: string; // e.g., "Projekte | Planung | Entwicklung MFH"
}

export default function ProjectHero({
  imageUrl,
  imageAlt = "Project hero image",
  breadcrumb,
}: ProjectHeroProps) {
  // Parse breadcrumb into parts
  const parts = breadcrumb.split("|").map((p) => p.trim());
  
  // Determine base path from first breadcrumb part
  const basePath = parts[0]?.toLowerCase() === "ressourcen" ? "/ressourcen" : "/projekte";

  return (
    <section className="relative h-[70vh] min-h-[280px] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]" />
      )}

      {/* Dark Overlay — matches SubpageHero tint */}
      <div className="absolute inset-0 bg-[#191919]/70" />

      {/* Breadcrumb */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20 pb-6 md:pb-8">
          <FadeIn>
            <p className="text-[18px] md:text-[22px] lg:text-[26px] font-light text-accent">
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
                    <span>{part}</span>
                  )}
                  {i < parts.length - 1 && <span className="mx-2">|</span>}
                </span>
              ))}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
