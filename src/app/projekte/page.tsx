import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Project Grid ─── */
function ProjectGrid() {
  const projects = [
    {
      category: "Planung",
      title: "Neubau Duplex Maienfeld",
      date: "Juni 2025",
    },
    {
      category: "Digitale Lösungen",
      title: "GIS Analyse Zürich",
      date: "Mai 2025",
    },
    {
      category: "Planung",
      title: "Sanierung MFH Chur",
      date: "April 2025",
    },
    {
      category: "Digitale Lösungen",
      title: "Projektportal Graubünden",
      date: "März 2025",
    },
    {
      category: "Planung",
      title: "Verdichtungsstudie Landquart",
      date: "Februar 2025",
    },
    {
      category: "Digitale Lösungen",
      title: "Marktanalyse Engadin",
      date: "Januar 2025",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={`${cx} mt-16 md:mt-20`}>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-xl bg-card aspect-[4/3] border border-border transition-colors duration-300 hover:border-accent">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[12px] font-medium uppercase tracking-widest text-accent leading-[1.5]">
                    {p.category}
                  </p>
                  <p className="mt-2 text-[18px] font-semibold">{p.title}</p>
                  <p className="mt-1 text-[12px] text-muted">{p.date}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA — same lime-box design as other subpages ─── */
function ProjekteCta() {
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
                Bereit für dein Projekt?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                Erzähl uns, was du vorhast. Wir klären im Gespräch, wie wir dich unterstützen können. Unverbindlich und direkt.
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

export default function ProjektePage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Projekte"
          headline="Wie wir Projekte strukturiert umsetzen."
          subheadline="Jedes Projekt ist massgeschneidert. Unterschiedliche Ausgangssituationen, unterschiedliche Herausforderungen, unterschiedliche Ziele. Was bleibt, ist unser Ansatz. Strukturierte Planung, dokumentierte Entscheidungen und digitale Workflows. Das Ergebnis sind planbare Projektverläufe."
          bgImage="/images/illustration-placeholder.png"
          cta="Erstgespräch vereinbaren"
          ctaHref="https://cal.com/luka-dosen/projecti"
        />
        <ProjectGrid />
        <ProjekteCta />
      </main>
      <Footer />
    </>
  );
}
