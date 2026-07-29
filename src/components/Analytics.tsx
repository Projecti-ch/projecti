"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

/**
 * Google Analytics, gated on consent. The scripts are not rendered at all until
 * the visitor has actively granted it, so no _ga cookie exists before that.
 */
export default function Analytics({ gaId }: { gaId: string }) {
  const consent = useConsent();

  if (consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
