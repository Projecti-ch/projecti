import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";

export const metadata: Metadata = {
  title: "Über Projecti & Luka Došen",
  description:
    "Agentur für Architekturplanung und digitale Lösungen in der Deutschschweiz. Gegründet mit dem Ziel, Immobilienprojekte strukturierter zu machen. Über 9 Jahre Erfahrung.",
  openGraph: {
    title: "Über Projecti & Luka Došen",
    description:
      "Agentur für Architekturplanung und digitale Lösungen in der Deutschschweiz. Gegründet mit dem Ziel, Immobilienprojekte strukturierter zu machen. Über 9 Jahre Erfahrung.",
    url: "https://www.projecti.ch/ueber",
  },
};

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
                Hoi, Luka hier.
              </h2>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-muted">
                <p>
                  Seit über neun Jahren plane und koordiniere ich Wohnbauprojekte in der
                  Deutschschweiz. Von der ersten Machbarkeitsstudie bis zur
                  Ausführungsplanung. Insgesamt war ich an über 100 Projekten
                  beteiligt. Dabei durfte ich mit institutionellen Partnern,
                  Generalunternehmern und private Bauherren arbeiten.
                </p>
                <p>
                  In diesen Jahren habe ich eines immer wieder beobachtet. Viele
                  Projekte verlieren Zeit und Geld nicht wegen fehlender Kompetenz.
                  Sie scheitern an unklaren Abläufen, fragmentierten Informationen
                  und Entscheidungen, die zu spät oder gar nicht dokumentiert werden.
                  Das hat mich beschäftigt. Und 2025 habe ich darauf eine Antwort
                  gegeben: Projecti.
                </p>
                <p>
                  Mein Ansatz ist klar. Strukturierte Planung mit einem digitalen
                  Workflow. Dokumentierte Entscheidungen. Klare Verantwortlichkeiten.
                  Nicht weil Technologie Selbstzweck ist. Sondern weil sie hilft,
                  Projekte planbarer zu machen, Risiken früh zu erkennen und
                  Nacharbeit zu reduzieren. Damit Immobilienentwickler effizienter
                  bauen können.
                </p>
              </div>
            </FadeIn>
          </div>
          {/* Portrait */}
          <FadeIn delay={120} className="h-full">
            <div className="h-full min-h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/portrait-luka.jpg"
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

function Vision() {
  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Vision" />
      <div className={`${cx} mt-8 md:mt-12`}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-12 lg:gap-20 items-stretch">
          {/* Text + CTA */}
          <div>
            <FadeIn>
              <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold">
                Räume schaffen für die nächste Generation
              </h2>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-muted">
                <p>
                  Die Baubranche muss sich verändern. Die Schweiz braucht mehr
                  Wohnraum. Dringend. Aber Projekte dauern zu lange, kosten zu viel
                  und werden zu oft ineffizient umgesetzt. Das muss besser werden.
                </p>
                <p>
                  Meine Vision für Projecti ist klar. Eine Agentur, die
                  Immobilienentwickler dabei unterstützt, effizienter zu bauen. Mit
                  strukturierten Prozessen, digitalen Werkzeugen und transparenten
                  Abläufen. Damit die Schweiz den Wohnraum erhält, den sie braucht.
                </p>
                <p>
                  Nicht nur schneller. Sondern besser. Mit einem nachhaltigen
                  Fundament für die nächste Generation. Das ist mein Anspruch. Das
                  ist Projecti.
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
                Sag mir hallo
              </a>
            </FadeIn>
          </div>

          {/* Vision video */}
          <FadeIn delay={120} className="h-full">
            <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden">
              <HeroVideo playbackId="xQRRwSq3EtiXHwXhfzMIPxnyZpSY8aGUF56Mzv4DBtk" />
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
          headline="Die Baubranche braucht neue Ansätze"
          subheadline="Die Schweiz braucht mehr Wohnraum. Gleichzeitig verlieren zu viele Projekte Zeit und Geld durch fragmentierte Informationen und unklare Abläufe. Projecti verbindet strukturierte Planungsprozesse mit digitalen Workflows, damit Immobilienentwickler effizienter bauen können. Für Wohnraum, den wir dringend benötigen."
          bgImage="/images/projecti-hero-ueber.jpg"
          bgImageAlt="Offenes Büro mit moderner Raumgestaltung und Pflanzen"
        />
        <UeberMich />
        <Vision />
      </main>
      <Footer />
    </>
  );
}
