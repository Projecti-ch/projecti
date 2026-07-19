"use client";

import { useEffect, useRef } from "react";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      // Reveal as soon as the block's top edge crosses ~10% up from the
      // viewport bottom, independent of block height. threshold: 0.1 fires
      // only once 10% of the ELEMENT is on screen — for a tall resource
      // article that's hundreds of px of blank space scrolling by before the
      // fade starts, which reads as content appearing far too late. Using
      // threshold 0 + a viewport-relative rootMargin decouples the trigger
      // from content height.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}
