import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 — Seite nicht gefunden",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-[120px] md:text-[180px] lg:text-[240px] font-semibold leading-none tracking-[-0.04em] text-jade">
          404
        </p>
        <p className="mt-6 text-[18px] leading-[1.6] text-muted max-w-[480px]">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center rounded-full bg-mint px-5 py-2 text-[14px] font-light text-foreground transition-colors duration-200 hover:bg-mint-hover"
        >
          Zur Startseite
        </Link>
      </main>
      <Footer />
    </>
  );
}
