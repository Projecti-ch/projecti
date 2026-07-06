/**
 * Animated brand motifs for the "Schwerpunkte" section on /digitale-loesungen.
 * Pure inline SVG; all loop animations live in globals.css under `.sp-visual`
 * inside a `@media (prefers-reduced-motion: no-preference)` block, so reduced
 * motion shows a sensible static end-state (parcel filled, results visible,
 * travelling dots stay hidden). IDs are prefixed per motif so multiple SVGs on
 * one page never collide.
 */

/* 01 · Analyse — iso parcel grid, marker drops, parcel fills radially */
export function MotifAnalyse() {
  return (
    <svg viewBox="0 0 400 640" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <path id="m1-tile" d="M0 -25 L48 0 L0 25 L-48 0 Z" />
        <clipPath id="m1-pclip">
          <path d="M200 257 L248 282 L200 307 L152 282 Z" />
        </clipPath>
        <radialGradient id="m1-waterGrad">
          <stop offset="0" stopColor="#73E2A7" stopOpacity="0.5" />
          <stop offset="1" stopColor="#73E2A7" stopOpacity="0.12" />
        </radialGradient>
      </defs>
      {/* Parcel grid, iso depth (back rows darker) */}
      <g stroke="#3A7150" strokeWidth="1.5">
        <use href="#m1-tile" transform="translate(200,230)" />
        <use href="#m1-tile" transform="translate(249,256)" />
        <use href="#m1-tile" transform="translate(298,282)" />
        <use href="#m1-tile" transform="translate(347,308)" />
        <use href="#m1-tile" transform="translate(151,256)" />
        <use href="#m1-tile" transform="translate(249,308)" />
        <use href="#m1-tile" transform="translate(298,334)" />
      </g>
      <g stroke="#4C8F63" strokeWidth="1.5">
        <use href="#m1-tile" transform="translate(102,282)" />
        <use href="#m1-tile" transform="translate(151,308)" />
        <use href="#m1-tile" transform="translate(200,334)" />
        <use href="#m1-tile" transform="translate(249,360)" />
        <use href="#m1-tile" transform="translate(53,308)" />
        <use href="#m1-tile" transform="translate(102,334)" />
        <use href="#m1-tile" transform="translate(151,360)" />
        <use href="#m1-tile" transform="translate(200,386)" />
      </g>
      {/* Radial fill from marker point */}
      <g clipPath="url(#m1-pclip)">
        <circle className="m1-fill" cx="200" cy="282" r="54" fill="url(#m1-waterGrad)" />
      </g>
      {/* Selected parcel */}
      <path className="m1-sel" d="M200 257 L248 282 L200 307 L152 282 Z" stroke="#73E2A7" strokeWidth="2" />
      {/* Marker */}
      <g className="m1-pin">
        <line x1="200" y1="276" x2="200" y2="236" stroke="#73E2A7" strokeWidth="2" />
        <circle cx="200" cy="224" r="10" stroke="#73E2A7" strokeWidth="2" />
        <circle cx="200" cy="224" r="3.5" fill="#73E2A7" />
      </g>
    </svg>
  );
}

/* 02 · Struktur — waterfall bars, one dot travels forward to the milestone */
export function MotifStruktur() {
  return (
    <svg viewBox="0 0 400 640" preserveAspectRatio="xMidYMid meet" fill="none">
      <rect x="30" y="150" width="120" height="30" rx="15" stroke="#4C8F63" strokeWidth="1.5" />
      <rect x="130" y="250" width="140" height="30" rx="15" stroke="#4C8F63" strokeWidth="1.5" />
      <rect x="250" y="350" width="120" height="30" rx="15" fill="rgba(115,226,167,0.14)" stroke="#73E2A7" strokeWidth="2" />
      <g stroke="#4C8F63" strokeWidth="1.5">
        <line x1="140" y1="180" x2="140" y2="250" />
        <line x1="260" y1="280" x2="260" y2="350" />
        <line x1="350" y1="380" x2="350" y2="452" />
      </g>
      <g className="m2-mile">
        <rect x="338" y="458" width="24" height="24" rx="5" transform="rotate(45 350 470)" fill="#12351F" stroke="#73E2A7" strokeWidth="2" />
      </g>
      <circle className="dot m2-dot" r="4" fill="#73E2A7" />
    </svg>
  );
}

/* 03 · Vermarktung — project webpage/exposé, windows light up, dots reach target groups */
export function MotifVermarktung() {
  return (
    <svg viewBox="0 0 400 640" preserveAspectRatio="xMidYMid meet" fill="none">
      {/* Project webpage frame + browser dots + title lines */}
      <g stroke="#4C8F63" strokeWidth="1.5" fill="none">
        <rect x="100" y="60" width="200" height="260" rx="16" />
        <line x1="100" y1="92" x2="300" y2="92" />
      </g>
      <g fill="#8FD4AE">
        <circle cx="118" cy="76" r="2.5" />
        <circle cx="128" cy="76" r="2.5" />
        <circle cx="138" cy="76" r="2.5" />
      </g>
      <g stroke="#8FD4AE" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <line x1="120" y1="114" x2="212" y2="114" />
        <line x1="120" y1="128" x2="172" y2="128" />
      </g>
      {/* New building — two volumes */}
      <g stroke="#8FD4AE" strokeWidth="1.5" fill="none">
        <rect x="136" y="150" width="56" height="130" />
        <rect x="204" y="182" width="62" height="98" />
        <line x1="118" y1="280" x2="282" y2="280" />
      </g>
      {/* Window grid */}
      <g stroke="#8FD4AE" strokeWidth="1" strokeOpacity="0.7" fill="none">
        <rect x="146" y="160" width="12" height="14" />
        <rect x="168" y="160" width="12" height="14" />
        <rect x="146" y="182" width="12" height="14" />
        <rect x="168" y="182" width="12" height="14" />
        <rect x="146" y="204" width="12" height="14" />
        <rect x="168" y="204" width="12" height="14" />
        <rect x="146" y="226" width="12" height="14" />
        <rect x="168" y="226" width="12" height="14" />
        <rect x="146" y="248" width="12" height="14" />
        <rect x="168" y="248" width="12" height="14" />
        <rect x="214" y="192" width="12" height="14" />
        <rect x="238" y="192" width="12" height="14" />
        <rect x="214" y="214" width="12" height="14" />
        <rect x="238" y="214" width="12" height="14" />
        <rect x="214" y="236" width="12" height="14" />
        <rect x="238" y="236" width="12" height="14" />
        <rect x="214" y="258" width="12" height="14" />
        <rect x="238" y="258" width="12" height="14" />
      </g>
      {/* Windows that light up */}
      <g fill="#73E2A7">
        <rect className="m3-w1" x="146" y="182" width="12" height="14" />
        <rect className="m3-w2" x="214" y="192" width="12" height="14" />
        <rect className="m3-w3" x="168" y="226" width="12" height="14" />
        <rect className="m3-w4" x="238" y="236" width="12" height="14" />
        <rect className="m3-w5" x="146" y="248" width="12" height="14" />
      </g>
      {/* Lines to target groups */}
      <g stroke="#3A7150" strokeWidth="1.5" fill="none">
        <path d="M170 320 C 140 380, 100 410, 90 446" />
        <path d="M200 320 C 200 380, 200 430, 200 476" />
        <path d="M230 320 C 260 380, 300 410, 310 446" />
      </g>
      {/* Target groups: buyers, renters, investors */}
      <g stroke="#4C8F63" strokeWidth="1.5" fill="none">
        <circle cx="90" cy="470" r="24" />
        <circle cx="200" cy="500" r="24" />
        <circle cx="310" cy="470" r="24" />
      </g>
      <g stroke="#8FD4AE" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <circle cx="90" cy="464" r="5" />
        <path d="M81 481 C 83 472, 97 472, 99 481" />
        <circle cx="200" cy="494" r="5" />
        <path d="M191 511 C 193 502, 207 502, 209 511" />
        <circle cx="310" cy="464" r="5" />
        <path d="M301 481 C 303 472, 317 472, 319 481" />
      </g>
      {/* Target-group outlines that light up */}
      <g fill="none" stroke="#73E2A7" strokeWidth="2">
        <circle className="m3-a1" cx="90" cy="470" r="24" />
        <circle className="m3-a2" cx="200" cy="500" r="24" />
        <circle className="m3-a3" cx="310" cy="470" r="24" />
      </g>
      {/* Travelling data points */}
      <circle className="dot m3-d1" r="4" fill="#73E2A7" />
      <circle className="dot m3-d2" r="4" fill="#73E2A7" />
      <circle className="dot m3-d3" r="4" fill="#73E2A7" />
    </svg>
  );
}
