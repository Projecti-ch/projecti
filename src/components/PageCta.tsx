import FadeIn from "./FadeIn";
import Link from "next/link";

export default function PageCta({
  headline,
  body,
  primaryCta,
  primaryHref = "/kontakt",
  secondaryCta,
  secondaryHref = "/projekte",
}: {
  headline: string;
  body?: string;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-16 md:py-20 lg:py-[160px] px-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px] flex flex-col items-center text-center">
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
            {headline}
          </h2>
        </FadeIn>
        {body && (
          <FadeIn delay={80}>
            <p className="mt-6 max-w-[640px] text-[16px] leading-[1.6] text-muted">
              {body}
            </p>
          </FadeIn>
        )}
        <FadeIn delay={160}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            >
              {primaryCta}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center rounded-full border border-white px-4 py-1.5 text-[14px] font-light text-white transition-colors duration-200 hover:bg-white/10"
              >
                {secondaryCta}
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
