import Link from "next/link";
import Image from "next/image";
import SectionDivider from "./SectionDivider";

export default function Footer() {
  return (
    <footer className="pb-12 md:pb-16">
      <SectionDivider />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20 pt-12 md:pt-16">
        {/* 4-column grid with vertical dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {/* Column 1 — Brand */}
          <div className="lg:pr-8">
            {/* Same height as the yellow labels in other columns so text rows align */}
            <div className="flex items-center h-[18px]">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/projecti-logo.svg"
                  alt="Projecti"
                  width={100}
                  height={14}
                  className="h-3.5 w-auto"
                />
              </Link>
            </div>
            <div className="mt-4 space-y-0 text-[14px] leading-[1.8] text-muted">
              <p>&copy; 2026 Projecti</p>
              <p>Alle Rechte vorbehalten</p>
              <Link
                href="/rechtliches"
                className="block text-white/60 transition-colors duration-200 hover:text-white"
              >
                Rechtliches
              </Link>
            </div>
          </div>

          {/* Column 2 — Location */}
          <div className="lg:border-l lg:border-border lg:pl-8 lg:pr-8">
            <p className="text-[12px] font-normal uppercase tracking-widest text-accent leading-[1.5]">
              Wo wir sind
            </p>
            <div className="mt-4 space-y-0 text-[14px] leading-[1.8] text-muted">
              <p>Bahnhofstrasse 11</p>
              <p>7302 Landquart</p>
              <p>Graubünden, Schweiz</p>
            </div>
          </div>

          {/* Column 3 — Office hours */}
          <div className="lg:border-l lg:border-border lg:pl-8 lg:pr-8">
            <p className="text-[12px] font-normal uppercase tracking-widest text-accent leading-[1.5]">
              Bürozeiten
            </p>
            <div className="mt-4 space-y-0 text-[14px] leading-[1.8] text-muted">
              <p>Montag – Freitag</p>
              <p>08:00 – 16:00</p>
              <p>Wochenende offline</p>
            </div>
          </div>

          {/* Column 4 — Contact */}
          <div className="lg:border-l lg:border-border lg:pl-8">
            <p className="text-[12px] font-normal uppercase tracking-widest text-accent leading-[1.5]">
              Kontakt
            </p>
            <div className="mt-4 space-y-0 text-[14px] leading-[1.8]">
              <a
                href="mailto:luka@projecti.ch"
                className="block text-muted transition-colors duration-200 hover:text-white"
              >
                E-Mail Luka
              </a>
              <a
                href="https://www.linkedin.com/in/lukadosen/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted transition-colors duration-200 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://cal.com/luka-dosen/projecti"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted transition-colors duration-200 hover:text-white"
              >
                Call buchen
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
