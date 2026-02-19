import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import Link from "next/link";
import Image from "next/image";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Strategische Planung ─── */
function StrategischePlanung() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Strategische Planung" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
                Bevor wir planen, verstehen wir die Situation.
              </h2>
            </FadeIn>
            <FadeIn delay={60}>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-muted">
                <p>
                  Am Anfang jeder Entwicklung steht eine grundlegende Frage. Was ist
                  der richtige Weg für dieses Grundstück, dieses Gebäude, diese
                  Situation? Sanieren oder neu bauen? Verdichten oder verkaufen?
                  Selbst nutzen oder vermieten?
                </p>
                <p>
                  Jeder Pfad hat Konsequenzen. Finanziell, zeitlich, persönlich. In
                  der strategischen Planung analysieren wir Ihre Ausgangslage
                  objektiv und datenbasiert.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <ul className="mt-8 space-y-3 text-[16px] leading-[1.6] text-muted">
                {[
                  "Bestandesanalyse: Zustand, Potenziale, regulatorische Rahmenbedingungen",
                  "Marktanalyse: Standortentwicklung, Nachfrage, Wettbewerb",
                  "Variantenvergleich: Entwicklungspfade mit Wirtschaftlichkeitsbetrachtung",
                  "Entscheidungsgrundlage: Welcher Weg passt zu Ihrer Situation?",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={160}>
              <p className="mt-8 text-[16px] leading-[1.6] text-muted">
                Das Ergebnis ist eine fundierte Entscheidungsbasis mit klaren
                nächsten Schritten. Bevor Sie sich festlegen. Bevor Planungskosten
                entstehen.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <Link
                href="/kontakt"
                className="mt-8 inline-flex items-center gap-1 text-[14px] font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                Strategische Planung anfragen <span className="ml-1">→</span>
              </Link>
            </FadeIn>
          </div>
          {/* Image placeholder */}
          <FadeIn delay={120}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/illustration-placeholder.png"
                alt="Illustration Strategische Planung"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Planungsleistungen — 3 vertical cards side by side ─── */
function Planungsleistungen() {
  const services = [
    {
      title: "Vorprojekt bis Baubewilligung",
      body: "Vom ersten Entwurf bis zur Baueingabe entwickeln wir das Projekt mit Simulation und Optimierung. Wir koordinieren mit Fachplanern und Behörden.",
      items: [
        "Entwurf und Vorprojekt mit Varianten",
        "Optimierung von Ausnutzung und Wirtschaftlichkeit",
        "Koordination mit Fachplanern und Behörden",
        "Bewilligungsreife Planunterlagen",
        "Entscheidungsprotokoll und Risikoregister",
      ],
    },
    {
      title: "Ausschreibung und Ausführung",
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
                    src="/images/illustration-placeholder.png"
                    alt="Illustration"
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-muted min-h-[52px]">
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2 text-[14px] leading-[1.6] text-muted">
                    {Array.from({ length: maxBullets }).map((_, bi) => {
                      const item = s.items[bi];
                      return (
                        <li
                          key={bi}
                          className={`flex items-start gap-3 ${!item ? "invisible" : ""}`}
                        >
                          <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
      emoji: "🏗️",
      title: "Bauherrenvertretung",
      body: "Als Bauherrenvertreter treffen wir alle planerischen Entscheidungen und koordinieren in Ihrem Auftrag.",
    },
    {
      emoji: "📋",
      title: "Projektleitung",
      body: "Als Projektleitung begleiten wir Ihr Projekt und arbeiten mit Ihrem Architekten zusammen.",
    },
    {
      emoji: "🧊",
      title: "Modellierung",
      body: "Als Modellierer bauen wir digitale Strukturen auf, die als Grundlage für alle Beteiligten dienen.",
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
                <span className="text-[32px] leading-none">{r.emoji}</span>
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
      body: "Sie entscheiden auf Basis von Daten und Analysen. Nicht auf Basis von Empfehlungen, die fremde Interessen verfolgen.",
    },
    {
      num: "02",
      title: "Weniger Reibungsverluste",
      body: "Strukturierte Abläufe verhindern, dass Informationen verloren gehen. Dokumentierte Entscheidungen halten Aufgaben im Fluss.",
    },
    {
      num: "03",
      title: "Planbarer Projektverlauf",
      body: "Klare Verantwortlichkeiten und regelmässige Abstimmungen schaffen Planbarkeit. Durchdachtes Risikomanagement reduziert Überraschungen.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Vorteile" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="flex gap-8 lg:gap-12">
          {/* Illustration placeholder — 1/3 width on desktop */}
          <div className="hidden lg:block lg:w-1/3 shrink-0 rounded-xl overflow-hidden min-h-[400px] relative">
            <Image
              src="/images/illustration-placeholder.png"
              alt="Illustration Vorteile"
              fill
              loading="lazy"
              className="object-cover"
            />
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
                    <p className="mt-3 text-[14px] leading-[1.6] text-muted">
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
                Wo steht Ihr Projekt?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                Erzählen Sie uns, was Sie vorhaben. In einem kurzen Erstgespräch klären wir, welche Unterstützung sinnvoll wäre.
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
          bgImage="/images/illustration-placeholder.png"
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
