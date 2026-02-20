import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Ressourcen & Insights",
  description:
    "Ratgeber, Updates und Einblicke zu Immobilienentwicklung. Von Bauvorschriften über Planungsprozesse bis zu digitalen Werkzeugen. Transparent und praxisnah.",
  openGraph: {
    title: "Ressourcen & Insights",
    description:
      "Ratgeber, Updates und Einblicke zu Immobilienentwicklung. Von Bauvorschriften über Planungsprozesse bis zu digitalen Werkzeugen. Transparent und praxisnah.",
    url: "https://www.projecti.ch/ressourcen",
  },
};
import Image from "next/image";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

/* ─── Resource Grid — 2 per row with image placeholders ─── */
function ResourceGrid() {
  const resources = [
    { title: "Beitrag A", tag: "Ratgeber" },
    { title: "Beitrag B", tag: "Template" },
    { title: "Beitrag C", tag: "Update" },
    { title: "Beitrag D", tag: "Ratgeber" },
    { title: "Beitrag E", tag: "Checkliste" },
    { title: "Beitrag F", tag: "Update" },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <div className={`${cx} mt-16 md:mt-20`}>
        <div className="grid gap-6 sm:grid-cols-2">
          {resources.map((r, i) => (
            <FadeIn key={r.title} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-xl bg-card aspect-[16/9] border border-border transition-colors duration-300 hover:border-accent">
                {/* Background image placeholder + tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[12px] font-medium uppercase tracking-widest text-accent leading-[1.5]">
                    {r.tag}
                  </p>
                  <h3 className="mt-2 text-[18px] font-semibold">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-muted">
                    Platzhalter für den Beitragsinhalt. Hier kommt eine kurze
                    Beschreibung des Beitrags.
                  </p>
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
function RessourcenCta() {
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
                Lust auf einen Austausch?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#191919]/70">
                Ob Kooperation, fachlicher Austausch oder einfach Interesse an einem Gespräch. Ich freue mich, von dir zu hören.
              </p>
              <a
                href="https://cal.com/luka-dosen/projecti"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full bg-[#191919] px-5 py-2 text-[14px] font-light text-accent transition-colors duration-200 hover:bg-[#2a2a2a]"
              >
                Gespräch abmachen
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function RessourcenPage() {
  return (
    <>
      <Nav />
      <main>
        <SubpageHero
          tag="Ressourcen"
          headline="Wissen teilen. Transparenz schaffen. Gemeinsam bauen."
          bgImage="/images/illustration-placeholder.png"
        />
        <ResourceGrid />
        <RessourcenCta />
      </main>
      <Footer />
    </>
  );
}
