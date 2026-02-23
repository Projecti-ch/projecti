import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ProjectHero from "@/components/ProjectHero";
import ContentSection from "@/components/ContentSection";
import GalleryCarousel from "@/components/GalleryCarousel";
import Image from "next/image";
import Link from "next/link";
import {
  getProjectBySlug,
  getProjects,
  getProjectsByCategory,
  getMediaUrl,
  formatDate,
  categoryLabels,
} from "@/lib/cms";
import type { Media, Project } from "@/types/cms";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  const { docs: projects } = await getProjects({ limit: 100 });
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projekt nicht gefunden",
    };
  }

  return {
    title: project.title,
    description: project.metaDescription || `${project.title} - Projecti`,
    openGraph: {
      title: project.title,
      description: project.metaDescription || `${project.title} - Projecti`,
      url: `https://www.projecti.ch/projekte/${project.slug}`,
      images: project.heroImage
        ? [{ url: getMediaUrl(project.heroImage, "hero") || "" }]
        : undefined,
    },
  };
}

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Gallery Section ─── */
function GallerySection({
  images,
}: {
  images: { image: number | Media; id?: string | null }[] | null | undefined;
}) {
  if (!images || images.length === 0) return null;

  // Transform images for carousel
  const carouselImages = images
    .map((item, index) => {
      const imageUrl = getMediaUrl(item.image as Media, "hero");
      if (!imageUrl) return null;
      const mediaObj = item.image as Media;
      return {
        url: imageUrl,
        alt: mediaObj?.alt || `Gallery image ${index + 1}`,
      };
    })
    .filter((img): img is { url: string; alt: string } => img !== null);

  if (carouselImages.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className={cx}>
        <FadeIn>
          <GalleryCarousel images={carouselImages} />
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Related Projects Section ─── */
async function RelatedProjects({
  category,
  currentSlug,
}: {
  category: Project["category"];
  currentSlug: string;
}) {
  // Fetch projects from same category, limit to 5 to ensure we have 4 after excluding current
  // Use depth: 1 since we only need heroImage populated, not full sections
  const { docs: projects } = await getProjectsByCategory(category, { limit: 5, depth: 1 });

  // Filter out current project and limit to 4
  const relatedProjects = projects
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (relatedProjects.length === 0) return null;

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={cx}>
        <FadeIn>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-foreground mb-8 md:mb-12">
            Ähnliche Projekte
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {relatedProjects.map((project, index) => {
            const imageUrl = getMediaUrl(project.heroImage, "hero");
            const date = formatDate(project.date);

            return (
              <FadeIn key={project.id} delay={index * 80}>
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
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[12px] font-medium uppercase tracking-widest text-accent leading-[1.5]">
                        {categoryLabels[project.category]}
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

        <FadeIn delay={400}>
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

/* ─── CTA Section ─── */
function ProjektCta() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={cx}>
        <FadeIn>
          <div className="rounded-xl bg-accent p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] shrink-0 rounded-xl overflow-hidden">
              <Image
                src="/images/portrait-luka-grau.jpg"
                alt="Portrait von Luka Došen, Gründer von Projecti"
                width={160}
                height={160}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#191919]">
                Bereit für dein Projekt?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                Erzähl uns, was du vorhast. Wir klären im Gespräch, wie wir dich
                unterstützen können.
              </p>
              <a
                href="https://cal.com/luka-dosen/projecti"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full bg-[#191919] px-5 py-2 text-[14px] font-light text-accent transition-colors duration-200 hover:bg-[#2a2a2a]"
              >
                Erstgespräch vereinbaren
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroImageUrl = getMediaUrl(project.heroImage, "hero");
  const heroImageAlt =
    typeof project.heroImage === "object" && project.heroImage?.alt
      ? project.heroImage.alt
      : project.title;

  // Build breadcrumb: "Projekte | Category | SlugTitle"
  const categoryLabel = categoryLabels[project.category];
  const breadcrumb = `Projekte | ${categoryLabel} | ${project.slugTitle}`;

  // Helper to get media URL from section images
  const getSectionImageUrl = (
    image: (number | null) | Media | undefined
  ): string | null => {
    if (!image || typeof image === "number") return null;
    return getMediaUrl(image, "hero");
  };

  return (
    <>
      <Nav />
      <main>
        {/* Hero with full-width image and breadcrumb */}
        <ProjectHero
          imageUrl={heroImageUrl}
          imageAlt={heroImageAlt}
          breadcrumb={breadcrumb}
        />

        {/* Section One */}
        <ContentSection
          label={project.sectionOne?.title}
          body={project.sectionOne?.body}
          image={getSectionImageUrl(project.sectionOne?.image)}
          imageAlt="Section one image"
        />

        {/* Section Two */}
        <ContentSection
          label={project.sectionTwo?.title}
          body={project.sectionTwo?.body}
          image={getSectionImageUrl(project.sectionTwo?.image)}
          imageAlt="Section two image"
          image2={getSectionImageUrl(project.sectionTwo?.image2)}
          image2Alt="Section two image 2"
        />

        {/* Section Three */}
        <ContentSection
          label={project.sectionThree?.title}
          body={project.sectionThree?.body}
        />

        {/* Gallery */}
        <GallerySection images={project.gallery} />

        {/* Related Projects */}
        <RelatedProjects
          category={project.category}
          currentSlug={project.slug}
        />

        {/* CTA */}
        <ProjektCta />
      </main>
      <Footer />
    </>
  );
}
