import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Strukturierte Architekturplanung Schweiz",
  description:
    "Von der Machbarkeitsstudie bis zur Ausführungsplanung – strukturierte Planungsprozesse mit klaren Verantwortlichkeiten. Aus Landquart, Schweiz.",
  openGraph: {
    title: "Strukturierte Architekturplanung Schweiz",
    description:
      "Von der Machbarkeitsstudie bis zur Ausführungsplanung – strukturierte Planungsprozesse mit klaren Verantwortlichkeiten. Aus Landquart, Schweiz.",
    url: "https://www.projecti.ch/planung",
  },
};
import Link from "next/link";
import Image from "next/image";
import ShapeIcon from "@/components/shapes/ShapeIcon";
import AnimatedVisual from "@/components/AnimatedVisual";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Strategische Planung ─── */
function StrategischePlanung() {
  const boxes = [
    {
      title: "Bestandesanalyse",
      body: "Was ist heute möglich? Zustand, Potenziale und regulatorische Rahmenbedingungen deines Grundstücks.",
    },
    {
      title: "Marktanalyse",
      body: "Wie entwickelt sich die Lage? Standortentwicklung, Nachfrage und Wettbewerb in deiner Region.",
    },
    {
      title: "Variantenvergleich",
      body: "Welche Wege gibt es? Entwicklungspfade mit transparenter Wirtschaftlichkeitsbetrachtung.",
    },
    {
      title: "Entscheidungsgrundlage",
      body: "Welcher Weg passt zu dir? Klare Empfehlung basierend auf Daten, Markt und deiner Situation.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Strategische Planung" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold max-w-[700px]">
            Der richtige Entwicklungspfad für dein Grundstück
          </h2>
        </FadeIn>
        <FadeIn delay={60}>
          <div className="mt-6 max-w-[700px] space-y-4 text-[16px] leading-[1.6] text-muted">
            <p>
              Du hast ein Grundstück mit Potenzial. Aber welcher Weg ist der richtige?
              Sanieren, neu bauen, verdichten oder verkaufen? In der strategischen
              Planung analysieren wir deine Ausgangslage objektiv und zeigen dir alle
              Optionen transparent auf.
            </p>
            <p>
              Das Ergebnis ist eine fundierte Entscheidungsbasis. Mit klaren nächsten
              Schritten. Bevor du dich festlegst, bevor grosse Planungskosten entstehen.
              Dieser Workshop ist ideal für private Grundeigentümer, die eine unabhängige
              Analyse ihrer Entwicklungsmöglichkeiten möchten.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {boxes.map((box, i) => (
            <FadeIn key={box.title} delay={i * 80}>
              <div className="h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-accent flex flex-col">
                <h3 className="text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                  {box.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted">
                  {box.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={360}>
          <div className="mt-10 text-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            >
              Strategische Planung anfragen
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Planungsleistungen — 3 vertical cards side by side ─── */
function Planungsleistungen() {
  const services = [
    {
      title: "Vorprojekt bis Baubewilligung",
      image: "/images/planungsleistungen-vorprojekt-baubewilligung.jpg",
      imageAlt: "Architekt erstellt Planunterlagen für ein Bauprojekt",
      body: "Vom ersten Entwurf bis zur Baueingabe entwickeln wir das Projekt mit Simulation und Optimierung. Wir koordinieren mit Fachplanern und Behörden.",
      items: [
        "Entwurf und Vorprojekt mit Varianten",
        "Optimierung von Ausnutzung und Wirtschaftlichkeit",
        "Koordination mit Fachplanern und Behörden",
        "Bewilligungsreife Planunterlagen",
      ],
    },
    {
      title: "Ausschreibung und Ausführung",
      image: "/images/planungsleistungen-ausschreibung-ausfuehrung.jpg",
      imageAlt: "Bauunternehmer prüft Ausschreibungsunterlagen auf der Baustelle",
      body: "Nach der Bewilligung steigt die Koordinationskomplexität. Wir erstellen strukturierte Ausschreibungsunterlagen mit dokumentierter Mengenermittlung.",
      items: [
        "Ausschreibungspläne und Leistungsverzeichnisse",
        "Begleitung der Vergabe und Offertvergleiche",
        "Ausführungsplanung gemäss definiertem Umfang",
        "Koordination und Pendenzenmanagement",
      ],
    },
    {
      title: "Digitalisierung und Visualisierung",
      image: "/images/planungsleistungen-digitalisierung-visualisierung.jpg",
      imageAlt: "3D-Visualisierung eines Gebäudes am Bildschirm",
      body: "Nicht jedes Projekt braucht vollständige Planungsbegleitung. Manchmal fehlt ein spezifischer Baustein wie digitale Daten oder Visualisierungen.",
      items: [
        "Digitalisierung von Bestandsgebäuden (2D/3D)",
        "Koordination zwischen Planungsbeteiligten",
        "Visualisierungen für Kommunikation und Verkauf",
        "Modellbasierte Kollisionsprüfungen",
      ],
    },
  ];

  const maxBullets = Math.max(...services.map((s) => s.items.length));

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Planungsleistungen" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 items-stretch">
          {services.map((s, si) => (
            <FadeIn key={s.title} delay={si * 100}>
              <div className="h-full rounded-xl border border-border bg-card overflow-hidden transition-colors duration-300 hover:border-accent flex flex-col">
                {/* Image placeholder */}
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-[20px] leading-[1.3] font-semibold tracking-[-0.02em] min-h-[52px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-muted min-h-[52px]">
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2 text-[16px] leading-[1.6] text-muted">
                    {Array.from({ length: maxBullets }).map((_, bi) => {
                      const item = s.items[bi];
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
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Rollen ─── */
function Rollen() {
  const roles = [
    {
      shape: "circle" as const,
      title: "Bauherrenvertretung",
      body: "Vollumfängliche Projektführung. Wir treffen Entscheidungen, koordinieren Beteiligte und liefern Ergebnisse.",
    },
    {
      shape: "triangle" as const,
      title: "Projektleitung",
      body: "Koordination zwischen Bauherr, Architekten und Fachplanern. Wir halten das Projekt auf Kurs.",
    },
    {
      shape: "square" as const,
      title: "Modellierung",
      body: "Wir digitalisieren Bestandsgebäude und bauen 3D Modelle. Als Grundlage für Planung und Koordination.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Rollen" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
            Unsere Rollen im Projekt
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-3 items-stretch">
          {roles.map((r, i) => (
            <FadeIn key={r.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-accent flex flex-col">
                <ShapeIcon shape={r.shape} size={40} fillColor="#222222" />
                <h3 className="mt-4 text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                  {r.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted flex-1">
                  {r.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={400}>
          <div className="mt-10 text-center">
            <Link
              href="/projekte"
              className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            >
              Projekte ansehen
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Vorteile — same design as homepage ─── */
function Vorteile() {
  const benefits = [
    {
      num: "01",
      title: "Fundierte Entscheidungen",
      body: "Durchdachte Planung statt interessengeleiteter Empfehlungen. Du entscheidest fundiert auf Basis von Fakten. Wir liefern die Grundlagen für ein durchdachtes Projekt.",
    },
    {
      num: "02",
      title: "Weniger Reibungsverluste",
      body: "Klare Prozesse, dokumentierte Entscheidungen, definierte Verantwortlichkeiten. Du sparst Zeit durch weniger Abstimmungsschleifen.",
    },
    {
      num: "03",
      title: "Planbarer Projektverlauf",
      body: "Systematisches Risikomanagement und klare Verantwortlichkeiten machen den Projektverlauf planbarer. Weniger Überraschungen, weniger Stress.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Vorteile" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="flex gap-8 lg:gap-12">
          {/* Animated visual — 1/3 width on desktop */}
          <div className="hidden lg:block lg:w-1/3 shrink-0 rounded-xl overflow-hidden min-h-[400px] relative border border-[#333333]">
            <AnimatedVisual composition="stacked-diamonds" size={288} />
          </div>

          {/* Benefits list — 2/3 width on desktop, full on mobile */}
          <div className="flex-1 space-y-6">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 100}>
                <div className="flex gap-6 rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-accent">
                  <span className="text-[22px] font-semibold text-accent leading-none shrink-0 pt-1">
                    {b.num}
                  </span>
                  <div>
                    <h3 className="text-[22px] leading-[1.3] font-semibold tracking-[-0.02em]">
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

/* ─── CTA — same lime-box design as homepage ─── */
function PlanungCta() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={cx}>
        <FadeIn>
          <div className="rounded-xl bg-accent p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Portrait */}
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] shrink-0 rounded-xl overflow-hidden">
              <Image
                src="/images/portrait-luka.jpg"
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
                Wo steht dein Projekt?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                In einem kurzen Gespräch klären wir, wo du stehst und wie wir dich unterstützen können.
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

export default function PlanungPage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Planung"
          headline="Architekturplanung für moderne Immobilienentwickler."
          subheadline="Immobilienprojekte werden anspruchsvoller. Mehr Normen, strengere Auflagen, komplexere Koordination. Gleichzeitig steigt der Druck, Entscheidungen früh zu treffen und Projekte effizient umzusetzen. Projecti strukturiert diese Komplexität."
          bgImage="/images/projecti-hero-planung.jpg"
          bgImageAlt="Architekt beim Zeichnen von Planunterlagen auf dem Arbeitstisch"
          cta="Projekt einreichen"
          ctaHref="https://lukadosen.notion.site/294d18b25563811d84d1e14c62459229?pvs=105"
        />
        <StrategischePlanung />
        <Planungsleistungen />
        <Rollen />
        <Vorteile />
        <PlanungCta />
      </main>
      <Footer />
    </>
  );
}
