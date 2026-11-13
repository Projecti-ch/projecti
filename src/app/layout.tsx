import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, organizationSchema, pageDescription } from "@/lib/seo";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Projecti | Architekturplanung & Digitale Lösungen",
    template: "%s | Projecti",
  },
  description: pageDescription(
    "Strukturierte Architekturplanung und digitale Lösungen für Immobilienprojekte in der Deutschschweiz. Über 9 Jahre Erfahrung, 100+ Projekte. Jetzt Erstgespräch vereinbaren."
  ),
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
        url: "/images/projecti-social-preview.jpg",
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
    images: ["/images/projecti-social-preview.jpg"],
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
        {/* The organization is on every page so each page's JSON-LD can
            reference it by @id (publisher, worksFor). */}
        <JsonLd data={[organizationSchema()]} />
        {children}
        {/* Analytics only renders once consent is granted, so no _ga cookie
            exists before the visitor has chosen. */}
        <Analytics gaId="G-33WXHN1F1Y" />
        <ConsentBanner />
      </body>
    </html>
  );
}
