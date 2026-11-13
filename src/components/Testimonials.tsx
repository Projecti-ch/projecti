"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionDivider from "./SectionDivider";
import { scrollBehavior, useReducedMotion } from "@/lib/motion";

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
    role: "Allreal",
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
  const regionRef = useRef<HTMLDivElement>(null);
  // Paused while the pointer, a finger or keyboard focus is on the strip.
  const isHovered = useRef(false);
  const isFocused = useRef(false);
  const reduceMotion = useReducedMotion();
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

  // Autoscroll every 3s — continuous loop. Pauses on hover, touch and
  // keyboard focus; never starts when the visitor prefers reduced motion.
  useEffect(() => {
    const el = scrollRef.current;
    const region = regionRef.current;
    if (!el || !region || reduceMotion) return;

    const interval = setInterval(() => {
      if (isHovered.current || isFocused.current) return;
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
          el.scrollTo({ left: (resetIdx + 1) * step, behavior: scrollBehavior() });
          setActive((resetIdx + 1) % count);
          setTimeout(() => {
            isAutoScrolling.current = false;
          }, 500);
        });
      } else {
        el.scrollTo({ left: nextScrollIdx * step, behavior: scrollBehavior() });
        setActive(nextScrollIdx % count);
        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 500);
      }
    }, 3000);

    const pause = () => {
      isHovered.current = true;
    };
    const resume = () => {
      isHovered.current = false;
    };
    const focusIn = () => {
      isFocused.current = true;
    };
    const focusOut = (e: FocusEvent) => {
      if (!region.contains(e.relatedTarget as Node | null)) isFocused.current = false;
    };

    region.addEventListener("mouseenter", pause);
    region.addEventListener("mouseleave", resume);
    region.addEventListener("touchstart", pause, { passive: true });
    region.addEventListener("touchend", resume);
    region.addEventListener("focusin", focusIn);
    region.addEventListener("focusout", focusOut);

    return () => {
      clearInterval(interval);
      region.removeEventListener("mouseenter", pause);
      region.removeEventListener("mouseleave", resume);
      region.removeEventListener("touchstart", pause);
      region.removeEventListener("touchend", resume);
      region.removeEventListener("focusin", focusIn);
      region.removeEventListener("focusout", focusOut);
    };
  }, [count, reduceMotion]);

  const scrollTo = (idx: number) => {
    const step = getCardStep();
    if (step === 0) return;
    isAutoScrolling.current = true;
    scrollRef.current?.scrollTo({ left: idx * step, behavior: scrollBehavior() });
    setActive(idx);
    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 500);
  };

  return (
    <section className="py-16 md:py-20 lg:py-[120px]">
      <SectionDivider label="Was Kunden sagten" />
      <div ref={regionRef} className={`${cx} mt-8 md:mt-12`}>
        {/* Horizontal scroll — cards sized so ~2.5 are visible */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto testimonial-scroll items-stretch"
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              // The second copy only exists for the seamless loop: hidden from
              // screen readers and the tab order so each quote is read once.
              aria-hidden={i >= count ? true : undefined}
              inert={i >= count}
              className="w-[calc((100%-48px)/2.5)] min-w-[280px] shrink-0 rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col"
            >
              {/* Quote text — flex-1 pushes the person block to the bottom */}
              <p className="text-[16px] leading-[1.6] text-muted flex-1">
                «{t.quote}»
              </p>
              {/* Person */}
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
                <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-pistachio">
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
                  <p className="text-[14px] text-tertiary">{t.role}</p>
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
                i === active ? "bg-jade" : "bg-border"
              }`}
              aria-label={`Kundenstimme ${i + 1} von ${count}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
