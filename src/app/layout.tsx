import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projecti — Planung und digitale Lösungen für Immobilienentwickler",
  description:
    "Strukturierte Planungsphasen, digitale Workflows, dokumentierte Entscheidungen. Das Ergebnis sind planbare Projektverläufe und fundierte Grundlagen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
