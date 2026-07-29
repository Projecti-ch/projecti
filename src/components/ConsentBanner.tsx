"use client";

import Link from "next/link";
import { useConsent, writeConsent } from "@/lib/consent";

/**
 * Kept to a single compact row so it sits below the client-logo strip rather
 * than covering it. The strip clears the fold by 41-60px on desktop (see
 * e2e/client-logos-above-fold.spec.ts), so this bar must stay short.
 *
 * Declining is exactly as easy as accepting, which is the part of the Swiss
 * revDSG and the GDPR that "accept or leave" banners get wrong.
 */
export default function ConsentBanner() {
  const consent = useConsent();

  // `undefined` = not read yet. Rendering on it would flash the bar for
  // visitors who already chose.
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10 lg:px-20">
        <p className="text-[13px] leading-[1.5] text-muted">
          Wir verwenden Analyse-Cookies, um die Website zu verbessern. Nur mit
          deiner Zustimmung.{" "}
          <Link
            href="/rechtliches"
            className="text-jade underline underline-offset-2 transition-colors duration-200 hover:text-evergreen"
          >
            Mehr erfahren
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => writeConsent("denied")}
            className="rounded-full border border-border px-4 py-1.5 text-[13px] font-light text-foreground transition-colors duration-200 hover:bg-background"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={() => writeConsent("granted")}
            className="rounded-full bg-mint px-4 py-1.5 text-[13px] font-light text-foreground transition-colors duration-200 hover:bg-mint-hover"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
