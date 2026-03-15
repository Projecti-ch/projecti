import Image from "next/image";
import FadeIn from "./FadeIn";
import HeroVideo from "./HeroVideo";

export default function SubpageHero({
  tag,
  headline,
  subheadline,
  cta,
  ctaHref = "/kontakt",
  bgImage,
  bgImageAlt,
  heroVideoPlaybackId,
  heroVideoPoster,
}: {
  tag?: string;
  headline: string;
  subheadline?: string;
  cta?: string;
  ctaHref?: string;
  bgImage?: string;
  bgImageAlt?: string;
  heroVideoPlaybackId?: string;
  heroVideoPoster?: string;
}) {
  return (
    <section className="relative overflow-hidden flex min-h-[80vh] flex-col justify-end">
      {/* Optional hero video */}
      {heroVideoPlaybackId && (
        <>
          <HeroVideo playbackId={heroVideoPlaybackId} poster={heroVideoPoster} />
          <div className="absolute inset-0 bg-[#191919]/70" />
        </>
      )}

      {/* Optional background image with dark tint */}
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt={bgImageAlt ?? ""}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#191919]/70" />
        </>
      )}

      <div
        className="relative z-10 w-full mx-auto max-w-300 px-6 md:px-10 lg:px-20 pb-20 pt-40"
      >
        {tag && (
          <FadeIn>
            <p className="mb-4 text-[12px] font-normal uppercase tracking-widest text-accent leading-[1.5]">
              {tag}
            </p>
          </FadeIn>
        )}
        <FadeIn delay={60}>
          <h1 className="max-w-[800px] text-[26px] leading-[1.15] tracking-[-0.01em] md:text-[26px] md:leading-[1.1] font-bold">
            {headline}
          </h1>
        </FadeIn>
        {subheadline && (
          <FadeIn delay={140}>
            <p className="mt-8 max-w-[640px] text-[16px] leading-[1.6] text-white/80">
              {subheadline}
            </p>
          </FadeIn>
        )}
        {cta && (
          <FadeIn delay={220}>
            <a
              href={ctaHref}
              {...(ctaHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-10 inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            >
              {cta}
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
