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

    // Tracked so an unmount mid-delay (route change during the fade) doesn't
    // leave a timer writing to a detached node.
    let timer: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      timer = setTimeout(() => {
        el.classList.add("visible");
      }, delay);
    };

    // Anything already in the first screen fades in on load rather than
    // waiting for a scroll. The rootMargin below pulls the trigger line 10%
    // up from the viewport bottom, so a block sitting in that last 10% — the
    // client logos on a 16:9 desktop — would stay at opacity 0 until the user
    // nudges the page. Above the fold there is no scroll to wait for, so
    // reveal straight away and keep the CSS transition as the entrance.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      reveal();
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
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
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}
