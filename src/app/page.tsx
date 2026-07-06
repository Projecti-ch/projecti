import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import HeroVideo from "@/components/HeroVideo";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import Image from "next/image";
import SilkBackground from "@/components/SilkBackground";
import ShapeIcon from "@/components/shapes/ShapeIcon";

export const metadata: Metadata = {
  title: "Projecti | Planung und digitale Lösungen für Immobilienentwickler",
  description:
    "Viele Projekte verlieren Zeit und Geld durch fragmentierte Informationen und unklare Entscheidungen. Projecti arbeitet anders. Wir strukturieren Planungsphasen, digitalisieren Abläufe und dokumentieren jede wichtige Entscheidung.",
  openGraph: {
    title: "Projecti | Planung und digitale Lösungen für Immobilienentwickler",
    description:
      "Wir strukturieren Planungsphasen, digitalisieren Abläufe und dokumentieren jede wichtige Entscheidung für planbare Projektverläufe.",
    url: "https://www.projecti.ch",
    images: [
      {
        url: "/images/projecti-social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Projecti — Architekturplanung & Digitale Lösungen",
      },
    ],
  },
};

/* ─── Container helper ─── */
const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── 1. HERO ─── */
function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden bg-surface-dark">
      <HeroVideo
        playbackId="dW2PUtb023Lcn971b1QpTXR821FtbrSbLLFoVHw1BYjg"
        poster="https://image.mux.com/dW2PUtb023Lcn971b1QpTXR821FtbrSbLLFoVHw1BYjg/thumbnail.webp?width=1920&height=1080&time=0"
      />

      {/* Evergreen scrim for readability (top-light → bottom-dark) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,24,16,.3) 0%, rgba(10,24,16,.45) 36%, rgba(10,24,16,.75) 64%, rgba(10,24,16,.96) 100%)",
        }}
      />

      <div className={`relative z-10 w-full ${cx} pb-20 pt-40`}>
        <FadeIn>
          <h1 className="max-w-[640px] text-[28px] md:text-[38px] leading-[1.18] tracking-[-0.005em] font-light text-[#f7faf4]">
            Planung und digitale Lösungen für Immobilienentwickler.
          </h1>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-8 max-w-[640px] text-[16px] leading-[1.6] text-on-dark/80">
            Viele Projekte verlieren Zeit und Geld durch fragmentierte
            Informationen und unklare Entscheidungen. Projecti arbeitet anders.
            Wir strukturieren Planungsphasen, digitalisieren Abläufe und
            dokumentieren jede wichtige Entscheidung für planbare Projektverläufe.
          </p>
        </FadeIn>

        <FadeIn delay={240}>
          <a
            href="https://cal.com/luka-dosen/projecti"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center rounded-full bg-mint px-4 py-1.5 text-[14px] font-light text-foreground transition-colors duration-200 hover:bg-mint-hover"
          >
            Austausch buchen
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── 2. CLIENT LOGOS ─── */
function ClientLogos() {
  const logos = [
    { name: "Julius Bär Real Estate", src: "/images/logo-julius-baer.png" },
    { name: "Swiss Prime Site Solutions", src: "/images/logo-spss.png" },
    { name: "Allreal", src: "/images/logo-allreal.png" },
    { name: "Axalo Immobilien", src: "/images/logo-axalo-immobilien.png" },
    { name: "Ritter Schumacher", src: "/images/logo-ritter-schumacher.png" },
    { name: "SR Baumanagement", src: "/images/logo-sr-baumanagement.png" },
  ];

  // Two identical copies make the marquee loop seamlessly.
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-12 md:py-16">
      <SectionDivider label="Kunden, die uns vertrauen" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <div className="logo-marquee">
            <div className="logo-marquee__track gap-4 md:gap-6">
              {marqueeLogos.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  aria-hidden={i >= logos.length}
                  className="flex w-[160px] md:w-[200px] shrink-0 items-center justify-center rounded-xl border border-border bg-card px-4 py-6 md:px-6 md:py-8"
                >
                  <Image
                    src={logo.src}
                    alt={`${logo.name} Logo`}
                    width={120}
                    height={40}
                    loading="lazy"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── 3. SERVICES ─── */
function Services() {
  const services = [
    {
      title: "Architekturplanung",
      icon: 'nested-squares' as const,
      description:
        "Wir begleiten Immobilienentwickler mit strukturierten Abläufen und einem digitalen Gebäudemodell. Alle Beteiligten wissen jederzeit, wo das Projekt steht. Von der Analyse bis zur Ausführung.",
      bullets: [
        "Strategische Planung und Entwurfssimulationen",
        "Vorprojekt bis Baubewilligung",
        "Ausschreibung und Modellauswertungen",
        "Ausführungsplanung und Koordination",
      ],
      linkLabel: "Zur Planung",
      linkHref: "/planung",
    },
    {
      title: "Digitale Lösungen",
      icon: 'grid-2x2' as const,
      description:
        "Wir entwickeln digitale Lösungen für effizientere Projektarbeit. Pragmatisch, projektbezogen und selbständig weiterführbar. Weniger manuelle Arbeit, schnellere Umsetzung.",
      bullets: [
        "GIS basierte Markt und Standortanalysen",
        "Projektverwaltung mit Risikomanagement",
        "AI gestützte Workflows für Optimierungen",
        "Visualisierung und digitale Vermarktung",
      ],
      linkLabel: "Digitale Lösungen",
      linkHref: "/digitale-loesungen",
    },
  ];

  // Find the max bullet count so both lists start at the same height
  const maxBullets = Math.max(...services.map((s) => s.bullets.length));

  return (
    <section id="leistungen" className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Unsere Leistungen" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
          {services.map((s, si) => (
            <FadeIn key={s.title} delay={si * 150}>
              <div className="h-full rounded-xl border border-border bg-card overflow-hidden transition-colors duration-300 hover:border-jade flex flex-col">
                {/* Icon panel */}
                <div className="h-[200px] bg-card flex items-center justify-center">
                  <ShapeIcon shape={s.icon} size={80} fillColor="#fdfefb" />
                </div>
                {/* Content — bottom 2/3 */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-[16px] leading-[1.6] text-muted min-h-[78px]">
                    {s.description}
                  </p>
                  {/* Bullet list — padded to max count so links align */}
                  <ul className="mt-6 space-y-2 text-[16px] leading-[1.6] text-muted">
                    {Array.from({ length: maxBullets }).map((_, bi) => {
                      const item = s.bullets[bi];
                      return (
                        <li
                          key={bi}
                          className={`flex items-start gap-3 ${!item ? "invisible" : ""}`}
                        >
                          <span className="mt-[9px] block h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                          {item || "\u00A0"}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href={s.linkHref}
                      className="inline-flex items-center gap-1 text-[14px] font-medium text-jade transition-colors duration-200 hover:text-evergreen"
                    >
                      {s.linkLabel} <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. BENEFITS ─── */
function Benefits() {
  const benefits = [
    {
      num: "01",
      title: "Risiken früh erkennen, nicht erst auf der Baustelle",
      body: "Frühe Simulation im digitalen Modell zeigt Probleme, bevor sie teuer werden. Dokumentierte Entscheidungen verhindern Missverständnisse. Strukturierte Ausschreibungen reduzieren Nachträge. Weniger Überraschungen, planbare Umsetzung.",
    },
    {
      num: "02",
      title: "Schnellere Abläufe durch Systematik statt Improvisation",
      body: "Systematische Prozesse statt individuelle Lösungen. Klare Verantwortlichkeiten verkürzen Entscheidungswege. Digitale Werkzeuge reduzieren Abstimmungsaufwand. Deine Zeit wird effizienter genutzt.",
    },
    {
      num: "03",
      title: "Datenbasierte Entscheidungen statt Bauchgefühl",
      body: "Objektive Analysen statt interessengeleiteter Empfehlungen. Datenbasierte Variantenvergleiche. Dokumentierte Entscheidungsgrundlagen. Du entscheidest fundiert, nicht auf Basis von Absichten anderer.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Deine Vorteile" />
      <div className={`${cx} mt-8 md:mt-12`}>
        {/* Desktop: horizontal layout with illustration area on left */}
        <div className="flex gap-8 lg:gap-12">
          {/* Animated visual — 1/3 width on desktop */}
          <div className="hidden lg:block lg:w-1/3 shrink-0 rounded-xl overflow-hidden min-h-[400px] relative border border-border">
            <SilkBackground composition="stacked-circles" size={288} />
          </div>

          {/* Benefits list — 2/3 width on desktop, full on mobile */}
          <div className="flex-1 space-y-6">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 100}>
                <div className="flex gap-6 rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-jade">
                  <span className="text-[22px] font-semibold text-jade leading-none shrink-0 pt-1">
                    {b.num}
                  </span>
                  <div>
                    <h3 className="text-[22px] leading-[1.3] font-semibold tracking-[-0.02em] min-h-[58px]">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-[1.6] text-muted">
                      {b.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. FINAL CTA ─── */
function FinalCta() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={cx}>
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl bg-surface-dark p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Mint shimmer, bottom-right */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(70% 120% at 90% 120%, rgba(115,226,167,.28), rgba(28,124,84,.10) 45%, transparent 75%)",
              }}
            />
            {/* Portrait */}
            <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] shrink-0 rounded-xl overflow-hidden">
              <Image
                src="/images/2026-portrait-luka.jpg"
                alt="Portrait von Luka Došen, Gründer von Projecti"
                width={160}
                height={160}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text + button */}
            <div className="relative flex flex-col items-start">
              <h2 className="text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold text-on-dark">
                Bereit für ein Projekt ohne Umwege?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-on-dark/70">
                Lass uns in einem kurzen Gespräch herausfinden, wie wir dein
                Vorhaben gemeinsam voranbringen.
              </p>
              <a
                href="https://cal.com/luka-dosen/projecti"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full bg-mint px-5 py-2 text-[14px] font-light text-foreground transition-colors duration-200 hover:bg-mint-hover"
              >
                Austausch buchen
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <Benefits />
        <FeaturedProjects />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
