import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const siteUrl = "https://www.projecti.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Projecti | Architekturplanung & Digitale Lösungen",
    template: "%s | Projecti",
  },
  description:
    "Strukturierte Architekturplanung und digitale Lösungen für Immobilienprojekte in der Deutschschweiz. Über 9 Jahre Erfahrung, 100+ Projekte. Jetzt Erstgespräch vereinbaren.",
  icons: {
    icon: "/images/projecti-favicon.svg",
    apple: "/images/projecti-apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: siteUrl,
    siteName: "Projecti",
    title: "Projecti | Architekturplanung & Digitale Lösungen",
    description:
      "Strukturierte Architekturplanung und digitale Lösungen für Immobilienprojekte in der Deutschschweiz. Über 9 Jahre Erfahrung, 100+ Projekte. Jetzt Erstgespräch vereinbaren.",
    images: [
      {
        url: "/images/projecti-social-preview.png",
        width: 1200,
        height: 630,
        alt: "Projecti — Architekturplanung & Digitale Lösungen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projecti | Architekturplanung & Digitale Lösungen",
    description:
      "Strukturierte Architekturplanung und digitale Lösungen für Immobilienprojekte in der Deutschschweiz. Über 9 Jahre Erfahrung, 100+ Projekte.",
    images: ["/images/projecti-social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0H9CFNFR81"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0H9CFNFR81');
          `}
        </Script>
      </body>
    </html>
  );
}
