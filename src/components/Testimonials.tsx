"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionDivider from "./SectionDivider";

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

const testimonials = [
  {
    quote:
      "Wir wollten auf unserem Grundstück neu bauen. Luka orchestrierte die Projektentwicklung, beriet uns bei der Finanzierung und verknüpfte uns mit dem passenden Entwickler. Nun setzen wir es alle gemeinsam um.",
    name: "Carlo Gambon",
    role: "Privater Bauherr",
    portrait: "/images/testimonial-carlo-gambon.jpg",
  },
  {
    quote:
      "Herr Došen hat uns innert kürzester Zeit eine spezifische Zusammenstellung von GIS Daten erstellt, die für den weiteren Projektverlauf von sehr wichtiger Bedeutung waren.",
    name: "Christian Kuhlen",
    role: "Swiss Prime Site Solutions",
    portrait: "/images/testimonial-christian-kuhlen.jpg",
  },
  {
    quote:
      "Unkomplizierte Zusammenarbeit, unsere Anforderungen wurden bestens verstanden und die Ergebnisse verständlich erklärt. Ein empfehlenswerter Service, den wir jederzeit wieder nutzen würden.",
    name: "Jonas Haas",
    role: "Allreal Generalunternehmung",
    portrait: "/images/testimonial-jonas-haas.jpg",
  },
  {
    quote:
      "Die Zusammenarbeit mit Luka von Projecti war unkompliziert, erfrischend kreativ und äusserst professionell. Ich bin sowohl mit dem Prozess wie dem Ergebnis sehr zufrieden.",
    name: "Matthias Frieden",
    role: "Privater Bauherr",
    portrait: "/images/testimonial-matthias-frieden.jpg",
  },
  {
    quote:
      "Ich brauchte eine Lösung zur Bauland Recherche und diese wurde mir so geliefert, wie ich es brauchte. Preis Leistung stimmt. Werde ich in Zukunft öfter nutzen.",
    name: "Stefan Guderian",
    role: "Guderian Immobilien",
    portrait: "/images/testimonial-stefan-guderian.jpg",
  },
  {
    quote:
      "Luka hat für mich einen alten Grundrissplan digitalisiert. Der Ablauf verlief unkompliziert und speditiv. Ich bin sehr zufrieden mit dem Prozess wie dem Ergebnis.",
    name: "Mathias Juric",
    role: "LKE Haustechnik",
    portrait: "/images/testimonial-mathias-juric.jpg",
  },
];

export default function Testimonials() {
  const GAP = 24; // gap-6 = 24px
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isAutoScrolling = useRef(false);

  // Doubled list for seamless infinite scroll
  const doubled = [...testimonials, ...testimonials];

  // Get single card width (including gap) from the first card element
  const getCardStep = () => {
    const el = scrollRef.current;
    if (!el || !el.children[0]) return 0;
    return (el.children[0] as HTMLElement).offsetWidth + GAP;
  };

  // Sync active dot with scroll position (from manual scrolling)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (isAutoScrolling.current) return;
      const step = getCardStep();
      if (step === 0) return;
      const idx = Math.round(el.scrollLeft / step) % count;
      setActive(idx);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [count]);

  // Ensure scroll starts at position 0 on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = 0;
  }, []);

  // Autoscroll every 3s — continuous loop, pauses on hover
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (isPaused.current) return;
      const step = getCardStep();
      if (step === 0) return;

      const currentScrollIdx = Math.round(el.scrollLeft / step);
      const nextScrollIdx = currentScrollIdx + 1;

      isAutoScrolling.current = true;

      // If we've scrolled past the first set, silently reset to the
      // equivalent position in the first set before scrolling forward
      if (nextScrollIdx >= count) {
        const resetIdx = nextScrollIdx - count;
        el.scrollTo({ left: resetIdx * step, behavior: "instant" });
        // Now smooth-scroll to the next card
        requestAnimationFrame(() => {
          el.scrollTo({ left: (resetIdx + 1) * step, behavior: "smooth" });
          setActive((resetIdx + 1) % count);
          setTimeout(() => {
            isAutoScrolling.current = false;
          }, 500);
        });
      } else {
        el.scrollTo({ left: nextScrollIdx * step, behavior: "smooth" });
        setActive(nextScrollIdx % count);
        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 500);
      }
    }, 3000);

    const pause = () => {
      isPaused.current = true;
    };
    const resume = () => {
      isPaused.current = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [count]);

  const scrollTo = (idx: number) => {
    const step = getCardStep();
    if (step === 0) return;
    isAutoScrolling.current = true;
    scrollRef.current?.scrollTo({ left: idx * step, behavior: "smooth" });
    setActive(idx);
    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 500);
  };

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Was Kunden sagten" />
      <div className={`${cx} mt-8 md:mt-12`}>
        {/* Horizontal scroll — cards sized so ~2.5 are visible */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto testimonial-scroll items-stretch"
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[calc((100%-48px)/2.5)] min-w-[280px] shrink-0 rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col"
            >
              {/* Quote text — flex-1 pushes the person block to the bottom */}
              <p className="text-[16px] leading-[1.6] text-white/80 flex-1">
                «{t.quote}»
              </p>
              {/* Person */}
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
                <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#333] to-[#222]">
                  <Image
                    src={t.portrait}
                    alt={`Portrait von ${t.name}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[16px] font-semibold">{t.name}</p>
                  <p className="text-[14px] text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                i === active ? "bg-accent" : "bg-border"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
