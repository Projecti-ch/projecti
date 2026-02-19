import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

function UeberMich() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Über mich" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div>
            <FadeIn>
              <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
                Über mich
              </h2>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-muted">
                <p>
                  Ich bin Luka Došen, Gründer von Projecti. Seit über neun
                  Jahren plane und koordiniere ich Wohnbauprojekte in der
                  Deutschschweiz. Von der ersten Machbarkeitsstudie bis zur
                  Ausführungsplanung. Insgesamt war ich an über 100 Projekten
                  beteiligt. Institutionelle Partner, Generalunternehmer, private
                  Bauherren.
                </p>
                <p>
                  Was mich dabei immer beschäftigt hat. Viele Projekte verlieren
                  Zeit und Geld nicht wegen fehlender Kompetenz. Sondern wegen
                  unklarer Abläufe, fragmentierter Informationen und
                  Entscheidungen, die zu spät oder gar nicht dokumentiert werden.
                  2025 habe ich Projecti gegründet.
                </p>
                <p>
                  Mein Ansatz. Strukturierte Planung mit einem digitalen
                  Workflow. Dokumentierte Entscheidungen. Klare
                  Verantwortlichkeiten. Nicht weil Technologie Selbstzweck ist.
                  Sondern weil sie hilft, Projekte planbarer zu machen und
                  Risiken zu reduzieren.
                </p>
              </div>
            </FadeIn>
          </div>
          {/* Portrait */}
          <FadeIn delay={120}>
            <div className="aspect-[3/4] rounded-xl overflow-hidden">
              <Image
                src="/images/portrait-luka-grau.jpg"
                alt="Portrait von Luka Došen, Gründer von Projecti"
                width={600}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WieIchArbeite() {
  const methods = [
    {
      title: "Modellbasierte Planung",
      body: "Ein digitales Gebäudemodell dient als zentrale Arbeitsgrundlage. Das schafft Übersicht und reduziert Abstimmungsaufwand.",
    },
    {
      title: "Klare Schnittstellen",
      body: "Ich definiere, wer was bis wann liefert. Das gilt für die Zusammenarbeit mit Bauherren, Fachplanern und ausführenden Unternehmen.",
    },
    {
      title: "Dokumentierte Entscheidungen",
      body: "Wichtige Entscheidungen werden festgehalten. Mit Begründung, Datum und Verantwortlichkeit. Das verhindert Missverständnisse und erleichtert Übergaben.",
    },
    {
      title: "Digitale Werkzeuge",
      body: "Wo es sinnvoll ist, setze ich auf digitale Lösungen. Von Projektmanagement-Systemen bis zu AI gestützten Workflows. Nicht als Spielerei. Sondern weil sie Zeit sparen und Fehler reduzieren.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Arbeitsweise" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <FadeIn>
          <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
            Wie ich arbeite
          </h2>
        </FadeIn>
        <FadeIn delay={60}>
          <p className="mt-4 max-w-[640px] text-[16px] leading-[1.6] text-muted">
            Ich arbeite nicht wie ein klassisches Architekturbüro. Mein Fokus
            liegt auf Struktur, Nachvollziehbarkeit und Effizienz. Das bedeutet
            konkret.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {methods.map((m, i) => (
            <FadeIn key={m.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-card p-6 md:p-8 transition-colors duration-300 hover:border-accent flex flex-col">
                <h3 className="text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">
                  {m.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-muted flex-1">
                  {m.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WofuerProjectiSteht() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Vision" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-12 lg:gap-20 items-center">
          {/* Text + CTA */}
          <div>
            <FadeIn>
              <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
                Wofür Projecti steht
              </h2>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-muted">
                <p>
                  Immobilienentwicklung ist komplex. Viele Beteiligte, lange
                  Zeithorizonte, hohe Summen. Umso wichtiger ist ein
                  Planungsprozess, der Klarheit schafft statt Verwirrung.
                </p>
                <p>
                  Meine Vision für Projecti. Eine Agentur, die Bauherren und
                  Entwicklern hilft, ihre Projekte strukturiert zu realisieren. Mit
                  transparenten Prozessen. Mit nachvollziehbaren Entscheidungen. Mit
                  digitalen Werkzeugen, die den Alltag einfacher machen.
                </p>
                <p className="text-white font-medium">
                  Nicht grösser. Sondern besser.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <a
                href="https://cal.com/luka-dosen/projecti"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
              >
                Erstgespräch vereinbaren
              </a>
            </FadeIn>
          </div>

          {/* Image placeholder */}
          <FadeIn delay={120}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/illustration-placeholder.png"
                alt="Illustration Vision"
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

export default function UeberPage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Über"
          headline="Über"
          subheadline="Eine Agentur für Architekturplanung und digitale Lösungen in der Deutschschweiz. Gegründet mit dem Ziel, Immobilienprojekte strukturierter und effizienter zu machen."
          bgImage="/images/illustration-placeholder.png"
        />
        <UeberMich />
        <WieIchArbeite />
        <WofuerProjectiSteht />
      </main>
      <Footer />
    </>
  );
}
