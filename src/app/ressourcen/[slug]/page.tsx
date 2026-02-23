import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import Link from "next/link";
import ProjectHero from "@/components/ProjectHero";
import SectionDivider from "@/components/SectionDivider";
import RichText from "@/components/RichText";
import { getUpdates, getUpdateBySlug, getMediaUrl, formatDate } from "@/lib/cms";
import type { Update } from "@/types/cms";

/* ─── Static Params ─── */
export async function generateStaticParams() {
  const { docs } = await getUpdates({ limit: 100 });
  return docs.map((update) => ({ slug: update.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);

  if (!update) {
    return { title: "Update nicht gefunden" };
  }

  return {
    title: update.title,
    description: update.metaDescription || undefined,
    openGraph: {
      title: update.title,
      description: update.metaDescription || undefined,
      url: `https://www.projecti.ch/ressourcen/${update.slug}`,
      images: update.featuredImage
        ? [{ url: getMediaUrl(update.featuredImage, "hero") || "" }]
        : undefined,
    },
  };
}

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Related Resources ─── */
async function RelatedResources({ currentSlug }: { currentSlug: string }) {
  const { docs: updates } = await getUpdates({ limit: 5 });

  const relatedUpdates = updates
    .filter((u) => u.slug !== currentSlug)
    .slice(0, 4);

  if (relatedUpdates.length === 0) return null;

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={cx}>
        <FadeIn>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-foreground mb-8 md:mb-12">
            Weitere Ressourcen
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {relatedUpdates.map((update, index) => {
            const imageUrl = getMediaUrl(update.featuredImage, "hero");
            const date = formatDate(update.date);

            return (
              <FadeIn key={update.id} delay={index * 80}>
                <Link href={`/ressourcen/${update.slug}`} className="block">
                  <div className="group relative overflow-hidden rounded-xl bg-card h-[280px] border border-border transition-colors duration-300 hover:border-accent">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={update.title}
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
                        Update
                      </p>
                      <h3 className="mt-2 text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-white">
                        {update.title}
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
              href="/ressourcen"
              className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            >
              Alle Ressourcen ansehen
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  const heroImage = getMediaUrl(update.featuredImage, "hero");
  const breadcrumb = `Ressourcen | Update | ${update.slugTitle}`;

  return (
    <>
      <Nav />

      {/* Hero */}
      <ProjectHero
        imageUrl={heroImage}
        imageAlt={update.title}
        breadcrumb={breadcrumb}
      />

      {/* Article Content */}
      <section className="py-12 md:py-16">
        {/* Date as SectionDivider */}
        {update.date && <SectionDivider label={formatDate(update.date)} />}

        <div className={`${cx} mt-8 md:mt-12`}>
          <FadeIn delay={80}>
            <div className="max-w-[800px] text-[16px] leading-[1.6] text-white">
              <RichText content={update.content} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedResources currentSlug={update.slug} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-[120px]">
        <div className={cx}>
          <FadeIn>
            <div className="rounded-xl bg-accent p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
              {/* Portrait */}
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

              {/* Text + button */}
              <div className="flex flex-col items-start">
                <h2 className="text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#191919]">
                  Fragen zu diesem Update?
                </h2>
                <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                  Ich freue mich über dein Feedback oder einen fachlichen Austausch zu diesem Thema.
                </p>
                <a
                  href="https://cal.com/luka-dosen/projecti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-[#191919] px-5 py-2 text-[14px] font-light text-accent transition-colors duration-200 hover:bg-[#2a2a2a]"
                >
                  Gespräch abmachen
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
