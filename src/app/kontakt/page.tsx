import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu Projecti aufnehmen. Erstgespräch vereinbaren, E-Mail senden oder auf LinkedIn vernetzen. Standort: Landquart, Graubünden. Für Projekte in der Deutschschweiz.",
  openGraph: {
    title: "Kontakt",
    description:
      "Kontakt zu Projecti aufnehmen. Erstgespräch vereinbaren, E-Mail senden oder auf LinkedIn vernetzen. Standort: Landquart, Graubünden. Für Projekte in der Deutschschweiz.",
    url: "https://www.projecti.ch/kontakt",
  },
};

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Kontakt — 3 equal-height cards ─── */
function Kontakt() {
  const channels = [
    {
      title: "Gespräch vereinbaren",
      body: "Der direkteste Weg. Buchen Sie ein kurzes Erstgespräch. Unverbindlich und direkt.",
      linkLabel: "Erstgespräch vereinbaren",
      linkHref: "https://cal.com/luka-dosen/projecti",
      external: true,
    },
    {
      title: "E-Mail",
      body: "Für Anfragen, Unterlagen oder erste Informationen.",
      linkLabel: "luka@projecti.ch",
      linkHref: "mailto:luka@projecti.ch",
      external: false,
    },
    {
      title: "LinkedIn",
      body: "Für den fachlichen Austausch und aktuelle Einblicke.",
      linkLabel: "linkedin.com/in/lukadosen",
      linkHref: "https://www.linkedin.com/in/lukadosen/",
      external: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Kontakt" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
            So erreichen Sie uns
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
          {channels.map((c, i) => (
            <FadeIn key={c.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-accent flex flex-col">
                <h3 className="text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                  {c.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted flex-1">
                  {c.body}
                </p>
                <a
                  href={c.linkHref}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
                >
                  {c.linkLabel} <span className="ml-1">→</span>
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Standort — Google Maps embed with dark/grayscale style ─── */
function Standort() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Standort" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl border border-border">
            {/* Grayscale + dark tint overlay for the map */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://maps.google.com/maps?q=Bahnhofstrasse+11,+7302+Landquart,+Switzerland&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) brightness(0.6) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Projecti Standort — Bahnhofstrasse 11, 7302 Landquart"
              />
              {/* Yellow accent tint overlay at 60% */}
              <div className="absolute inset-0 bg-accent/60 pointer-events-none mix-blend-multiply" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function KontaktPage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Kontakt"
          headline="Kontakt"
          subheadline="Sie haben ein Projekt im Kopf oder Fragen? Wir tauschen uns gerne mit Ihnen darüber aus. Per Gespräch, E-Mail oder LinkedIn."
          bgImage="/images/illustration-placeholder.png"
        />
        <Kontakt />
        <Standort />
      </main>
      <Footer />
    </>
  );
}
