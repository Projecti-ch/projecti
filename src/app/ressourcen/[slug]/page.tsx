import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import Link from "next/link";
import ProjectHero from "@/components/ProjectHero";
import RichText from "@/components/RichText";
import { getUpdates, getUpdateBySlug, getMediaUrl, formatDate } from "@/lib/cms";

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
        ? [{ url: getMediaUrl(update.featuredImage, "card") || "" }]
        : undefined,
    },
  };
}

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

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
      <article className="py-16 md:py-20 lg:py-[120px]">
        <div className={cx}>
          {/* Header */}
          <FadeIn>
            <header className="max-w-[800px]">
              {/* Date */}
              {update.date && (
                <p className="text-[12px] font-medium uppercase tracking-widest text-accent leading-[1.5] mb-4">
                  {formatDate(update.date)}
                </p>
              )}
              {/* Title */}
              <h1 className="font-sans text-[32px] md:text-[40px] lg:text-[48px] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-foreground">
                {update.title}
              </h1>
              {/* Meta description as subtitle */}
              {update.metaDescription && (
                <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-muted">
                  {update.metaDescription}
                </p>
              )}
            </header>
          </FadeIn>

          {/* Divider */}
          <FadeIn delay={100}>
            <div className="my-12 md:my-16 h-px bg-border" />
          </FadeIn>

          {/* Content */}
          <FadeIn delay={200}>
            <div className="max-w-[800px] prose prose-invert prose-lg">
              <RichText content={update.content} />
            </div>
          </FadeIn>
        </div>
      </article>

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

      {/* Back Link */}
      <section className="pb-16 md:pb-20 lg:pb-[120px]">
        <div className={cx}>
          <FadeIn>
            <Link
              href="/ressourcen"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-foreground transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Zurück zu Ressourcen
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
