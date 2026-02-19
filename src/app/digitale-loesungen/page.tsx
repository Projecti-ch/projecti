import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import Link from "next/link";
import Image from "next/image";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Schwerpunkte — alternating text/image layout ─── */
function Schwerpunkte() {
  const areas = [
    {
      title: "Markt und Potenzial verstehen",
      sub: "Datenbasierte Grundlagen für bessere Entscheidungen.",
      body: "Gute Entscheidungen beginnen mit einem klaren Bild der Ausgangslage. Wir nutzen digitale Werkzeuge, um Markt und Standortdaten strukturiert aufzubereiten. Das Ergebnis sind konkrete, handlungsrelevante Informationen. Keine Datenmengen, die interpretiert werden müssen.",
      items: [
        "Standortanalysen mit GIS Daten und automatisierter Auswertung",
        "Identifikation von Grundstücken mit Verdichtungspotenzial",
        "Marktrecherchen für spezifische Nutzersegmente",
        "Aufbereitung von Entscheidungsgrundlagen für Investitionen",
      ],
    },
    {
      title: "Projekte strukturiert führen",
      sub: "Systeme für effizientere Zusammenarbeit.",
      body: "Komplexe Projekte scheitern selten an fehlendem Wissen. Sie scheitern an unklaren Abläufen, verlorenen Informationen und Entscheidungen, die niemand dokumentiert hat. Wir implementieren Systeme, die das verhindern.",
      items: [
        "Projektverwaltung mit klaren Verantwortlichkeiten und Terminen",
        "Entscheidungs und Risikomanagement-Strukturen",
        "Meeting Workflows, die zu konkreten Ergebnissen führen",
        "Informationsmanagement mit eindeutigen Versionen",
        "AI gestützte Workflows für wiederkehrende Aufgaben",
      ],
      mirrored: true,
    },
    {
      title: "Projekte überzeugend kommunizieren",
      sub: "Visualisierung und Vermarktung, die überzeugt.",
      body: "Ein gutes Projekt verkauft sich nicht von selbst. Es braucht Darstellungen, die das Potenzial sichtbar machen. Für Käufer, Mieter, Investoren oder Behörden. Der Fokus liegt auf Klarheit und Wirkung. Nicht auf technischer Spielerei.",
      items: [
        "Visualisierungen für Verkauf, Vermietung und Kommunikation",
        "Projektwebseiten und digitale Exposés",
        "Aufbereitung von Unterlagen für Investorengespräche",
        "Kampagnenunterstützung für Vermarktungsphasen",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Schwerpunkte" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
            Unsere Schwerpunkte
          </h2>
        </FadeIn>
        <FadeIn delay={60}>
          <p className="mt-4 text-[16px] leading-[1.6] text-muted">
            Je nach Bedarf unterstützen wir in einem oder mehreren Bereichen.
            Die Lösungen werden auf Ihre Situation zugeschnitten.
          </p>
        </FadeIn>

        <div className="mt-12 space-y-8">
          {areas.map((a, i) => (
            <FadeIn key={a.title} delay={i * 80}>
              <div className="rounded-xl border border-border bg-card overflow-hidden transition-colors duration-300 hover:border-accent h-full">
                <div
                  className={`flex flex-col h-full ${
                    a.mirrored ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  {/* Text content */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col">
                    <h3 className="text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-[1.5] text-muted">
                      {a.sub}
                    </p>
                    <p className="mt-6 text-[16px] leading-[1.6] text-muted">
                      {a.body}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3 text-[16px] leading-[1.6] text-muted">
                      {a.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image placeholder */}
                  <div className="hidden lg:block lg:w-[400px] shrink-0 relative overflow-hidden">
                    <Image
                      src="/images/illustration-placeholder.png"
                      alt="Illustration"
                      fill
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={320}>
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

/* ─── Wie wir arbeiten — equal-height step cards ─── */
function WieWirArbeiten() {
  const steps = [
    {
      title: "Verstehen",
      body: "Wir analysieren, wie Sie heute arbeiten und wo die grössten Reibungsverluste liegen.",
    },
    {
      title: "Konzipieren",
      body: "Wir entwickeln eine Lösung, die zu Ihren Werkzeugen, Ihrem Team und Ihren Projekten passt.",
    },
    {
      title: "Implementieren",
      body: "Wir setzen die Lösung um und begleiten die Einführung, bis sie läuft.",
    },
    {
      title: "Übergeben",
      body: "Wir dokumentieren das System und schulen Ihr Team. Sie bleiben unabhängig.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Wie wir arbeiten" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
            Wie wir arbeiten
          </h2>
        </FadeIn>
        <FadeIn delay={60}>
          <p className="mt-4 max-w-[640px] text-[16px] leading-[1.6] text-muted">
            Digitale Lösungen sind nur nützlich, wenn sie im Alltag
            funktionieren. Deshalb arbeiten wir nicht mit Standardpaketen. Wir
            passen Lösungen an Ihre Situation an.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-accent flex flex-col">
                <span className="text-[14px] font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted flex-1">
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Vorteile — same design as homepage and planung ─── */
function Vorteile() {
  const benefits = [
    {
      num: "01",
      title: "Zeit gewinnen",
      body: "Automatisierte Workflows und strukturierte Prozesse reduzieren manuelle Arbeit und Abstimmungsaufwand.",
    },
    {
      num: "02",
      title: "Fehler vermeiden",
      body: "Klare Informationsstrukturen und dokumentierte Entscheidungen verhindern, dass wichtige Details verloren gehen oder falsch verstanden werden.",
    },
    {
      num: "03",
      title: "Unabhängig bleiben",
      body: "Wir liefern Systeme, die Ihr Team selbst weiterführen kann. Keine Abhängigkeit von externen Spezialisten. Schulung und Übergabe inklusive.",
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

/* ─── CTA — same lime-box design as homepage and planung ─── */
function DigitaleCta() {
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
                Welche Herausforderung möchten Sie lösen?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                Beschreiben Sie uns, wo es in Ihren Projekten oder Prozessen
                hakt. In einem kurzen Erstgespräch klären wir, ob und wie eine
                digitale Lösung helfen kann.
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

export default function DigitaleLoesungenPage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Digitale Lösungen"
          headline="Digitale Lösungen mit konkretem Nutzen."
          subheadline="Viele Unternehmen in der Immobilienbranche arbeiten mit fragmentierten Informationen, manuellen Prozessen und Werkzeugen, die nicht zusammenspielen. Das kostet Zeit, erzeugt Fehler und erschwert die Zusammenarbeit. Wir entwickeln digitale Lösungen, die diese Probleme pragmatisch adressieren."
          bgImage="/images/illustration-placeholder.png"
          cta="Erstgespräch vereinbaren"
          ctaHref="https://cal.com/luka-dosen/projecti"
        />
        <Schwerpunkte />
        <WieWirArbeiten />
        <Vorteile />
        <DigitaleCta />
      </main>
      <Footer />
    </>
  );
}
