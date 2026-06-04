import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import SectionDivider from '@/components/SectionDivider';
import SilkBackground from '@/components/SilkBackground';

export const metadata: Metadata = {
  title: 'Silk Background Preview',
  robots: { index: false, follow: false },
};

const cx = 'mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20';

type CompositionVariant = 'stacked-circles' | 'stacked-diamonds' | 'stacked-hexagons';

interface Benefit {
  num: string;
  title: string;
  body: string;
}

/** Real copy from each production page, so the preview reads true to scale. */
const PAGES: {
  route: string;
  label: string;
  composition: CompositionVariant;
  benefits: Benefit[];
}[] = [
  {
    route: '/ (Startseite)',
    label: 'Deine Vorteile',
    composition: 'stacked-circles',
    benefits: [
      {
        num: '01',
        title: 'Risiken früh erkennen, nicht erst auf der Baustelle',
        body: 'Frühe Simulation im digitalen Modell zeigt Probleme, bevor sie teuer werden. Dokumentierte Entscheidungen verhindern Missverständnisse.',
      },
      {
        num: '02',
        title: 'Schnellere Abläufe durch Systematik statt Improvisation',
        body: 'Systematische Prozesse statt individuelle Lösungen. Klare Verantwortlichkeiten verkürzen Entscheidungswege.',
      },
      {
        num: '03',
        title: 'Datenbasierte Entscheidungen statt Bauchgefühl',
        body: 'Objektive Analysen statt interessengeleiteter Empfehlungen. Datenbasierte Variantenvergleiche.',
      },
    ],
  },
  {
    route: '/planung',
    label: 'Vorteile',
    composition: 'stacked-diamonds',
    benefits: [
      {
        num: '01',
        title: 'Planungssicherheit von Anfang an',
        body: 'Klare Strukturen und dokumentierte Entscheidungen geben dir Sicherheit über den gesamten Projektverlauf.',
      },
      {
        num: '02',
        title: 'Weniger Reibung zwischen den Gewerken',
        body: 'Koordinierte Planung reduziert Konflikte auf der Baustelle und hält den Zeitplan stabil.',
      },
      {
        num: '03',
        title: 'Kosten im Blick behalten',
        body: 'Transparente Grundlagen machen Budgetabweichungen früh sichtbar — bevor sie zum Problem werden.',
      },
    ],
  },
  {
    route: '/digitale-loesungen',
    label: 'Vorteile',
    composition: 'stacked-hexagons',
    benefits: [
      {
        num: '01',
        title: 'Daten statt verstreuter Dokumente',
        body: 'Ein zentrales digitales Modell als verlässliche Quelle für alle Beteiligten.',
      },
      {
        num: '02',
        title: 'Automatisierung wiederkehrender Aufgaben',
        body: 'Digitale Werkzeuge übernehmen Routine — du gewinnst Zeit für die wichtigen Entscheidungen.',
      },
      {
        num: '03',
        title: 'Skalierbar mit deinem Projekt',
        body: 'Lösungen, die mitwachsen, statt Insellösungen, die du später ersetzen musst.',
      },
    ],
  },
];

function BenefitsBlock({
  label,
  composition,
  benefits,
}: {
  label: string;
  composition: CompositionVariant;
  benefits: Benefit[];
}) {
  return (
    <section className="py-12 md:py-16">
      <SectionDivider label={label} />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="flex gap-8 lg:gap-12">
          {/* Silk visual — 1/3 width on desktop (drop-in for AnimatedVisual) */}
          <div className="hidden lg:block lg:w-1/3 shrink-0 rounded-xl overflow-hidden min-h-[400px] relative border border-[#333333]">
            <SilkBackground composition={composition} size={288} />
          </div>

          {/* Benefits list */}
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
                    <p className="mt-3 text-[16px] leading-[1.6] text-muted">{b.body}</p>
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

export default function SilkPreviewPage() {
  return (
    <>
      <Nav />
      <main className="py-12 md:py-16">
        <div className={`${cx} mb-4`}>
          <p className="text-[13px] text-muted font-light tracking-wide">
            Preview-only route (nicht indexiert). Klick auf die linken Blöcke
            erzeugt einen Impuls. Mobile: der Block ist wie in Produktion
            ab&nbsp;lg sichtbar.
          </p>
        </div>

        {PAGES.map((p) => (
          <div key={p.route}>
            <div className={`${cx} mt-8`}>
              <span className="inline-block rounded-full border border-border px-3 py-1 text-[12px] font-light tracking-wide text-muted">
                {p.route}
              </span>
            </div>
            <BenefitsBlock
              label={p.label}
              composition={p.composition}
              benefits={p.benefits}
            />
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
