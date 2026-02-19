"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/planung", label: "Planung" },
  { href: "/digitale-loesungen", label: "Digitale Lösungen" },
  { href: "/projekte", label: "Projekte" },
  { href: "/ressourcen", label: "Ressourcen" },
  { href: "/ueber", label: "Über" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  // Measure the inner menu height for the slide animation
  useEffect(() => {
    if (open && menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#191919]/60 backdrop-blur-md border-b border-white/5">
      <div className="flex h-16 items-center justify-between mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">
        <Link href="/" className="shrink-0">
          <Image
            src="/projecti-logo.svg"
            alt="Projecti"
            width={120}
            height={32}
            className="h-5 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-light leading-none text-white/60 transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://cal.com/luka-dosen/projecti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
          >
            Austausch buchen
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menü"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu — slides down from navbar */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: menuHeight }}
      >
        <div
          ref={menuRef}
          className="border-t border-border bg-[#191919]/90 backdrop-blur-md px-6 md:px-10 pb-8 pt-4"
        >
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg font-light text-white/70 transition-all hover:text-white"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(-8px)",
                transition: `opacity 0.3s ease ${i * 50 + 100}ms, transform 0.3s ease ${i * 50 + 100}ms, color 0.2s`,
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://cal.com/luka-dosen/projecti"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[14px] font-light text-[#191919] transition-colors duration-200 hover:bg-accent-hover"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-8px)",
              transition: `opacity 0.3s ease ${links.length * 50 + 100}ms, transform 0.3s ease ${links.length * 50 + 100}ms`,
            }}
          >
            Austausch buchen
          </a>
        </div>
      </div>
    </nav>
  );
}
