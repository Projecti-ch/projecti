import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import { getFeaturedProjects, getMediaUrl, formatDate, categoryLabels } from "@/lib/cms";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects(4);

  // Fallback if no featured projects
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projekte" className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Ausgewählte Projekte" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => {
            const imageUrl = getMediaUrl(project.heroImage, "hero");
            const categoryLabel = categoryLabels[project.category];
            const date = formatDate(project.date);

            return (
              <FadeIn key={project.id} delay={i * 100}>
                <Link href={`/projekte/${project.slug}`} className="block">
                  <div className="group relative overflow-hidden rounded-xl bg-card h-[280px] border border-border transition-colors duration-300 hover:border-accent">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        loading="lazy"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]" />
                    )}

                    {/* Solid tint overlay for text readability */}
                    <div className="absolute inset-0 bg-[#191919]/80" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[12px] font-medium uppercase tracking-widest text-accent leading-[1.5]">
                        {categoryLabel}
                      </p>
                      <h3 className="mt-2 text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-white">
                        {project.title}
                      </h3>
                      {date && (
                        <p className="mt-1 text-[12px] text-white/60">{date}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={500}>
          <div className="mt-10 text-center">
            <Link
              href="/projekte"
              className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            >
              Alle Projekte ansehen
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
