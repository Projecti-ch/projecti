"use client";

import dynamic from "next/dynamic";
import { useConsent } from "@/lib/consent";

/**
 * MuxPlayer is ~283KB brotli / 1.0MB decoded, which was 60% of all JavaScript
 * on the site. A static import pulls it into the bundle of every page that
 * imports this file, whether or not a video renders. SubpageHero imports it
 * unconditionally, so pages with no playbackId (/rechtliches, /kontakt) were
 * downloading a video player that drew nothing.
 *
 * Loading it dynamically means the chunk is fetched only where a video is
 * actually rendered. Video resolution and the poster are untouched.
 */
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

const HeroVideo = ({
  playbackId,
  poster,
}: {
  playbackId?: string;
  poster?: string;
}) => {
  const consent = useConsent();

  // No playbackId means no video on this page, so the player chunk is never
  // requested. This is the guard that keeps it off /rechtliches and /kontakt.
  if (!playbackId) return null;

  return (
    <MuxPlayer
      streamType="on-demand"
      playsInline
      playbackId={playbackId}
      poster={poster}
      className="absolute inset-0 h-full w-full border-0"
      autoPlay
      muted
      loop
      nohotkeys
      minResolution="720p"
      maxResolution="720p"
      preload="auto"
      // Mux sets a `muxData` cookie for playback analytics. Withhold it until
      // the visitor consents; playback itself is unaffected.
      disableCookies={consent !== "granted"}
    />
  );
};

export default HeroVideo;
