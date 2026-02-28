interface CompositionProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function StackedCircles({
  size = 96,
  className = '',
  fillColor = '#191919',
}: CompositionProps) {
  const id = 'compGradStackedCircles';

  // ViewBox 0 0 80 80 — 8px extra on each side vs the 64-unit shape space.
  // Shape centre: (40, 40). Circle r=28.
  // Transform order: translate then rotate — SVG applies right-to-left, so
  // the shape rotates around (40,40) first, then shifts to its offset position.
  // Circles are rotation-invariant so only the translate offsets are visible.

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#efff00" />
          <stop offset="1" stopColor="#c4d100" />
        </linearGradient>
      </defs>

      {/* Back layer — offset (-6, -4), opacity 0.4 */}
      <g opacity="0.4" transform="translate(-6,-4) rotate(-15, 40, 40)">
        <circle cx="40" cy="40" r="28" fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" />
      </g>

      {/* Middle layer — offset (-3, -2), opacity 0.7 */}
      <g opacity="0.7" transform="translate(-3,-2) rotate(-7, 40, 40)">
        <circle cx="40" cy="40" r="28" fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" />
      </g>

      {/* Front layer — no offset, full opacity, drop-shadow only here */}
      <g style={{ filter: 'drop-shadow(0 4px 12px rgba(239, 255, 0, 0.15))' }}>
        <circle cx="40" cy="40" r="28" fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" />
      </g>
    </svg>
  );
}
