interface CompositionProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function StackedHexagons({
  size = 96,
  className = '',
  fillColor = '#191919',
}: CompositionProps) {
  const id = 'compGradStackedHexagons';

  // ViewBox 0 0 80 80. Shape centre: (40, 40). Hexagon r=28.
  // Flat-top hexagon: points at angles -30°, 30°, 90°, 150°, 210°, 270°.
  const r = 28;
  const cx = 40;
  const cy = 40;
  const points = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');

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

      {/* Back layer — offset (-6, -4), rotated -15°, opacity 0.4 */}
      <g opacity="0.4" transform="translate(-6,-4) rotate(-15, 40, 40)">
        <polygon
          points={points}
          fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round"
        />
      </g>

      {/* Middle layer — offset (-3, -2), rotated -7°, opacity 0.7 */}
      <g opacity="0.7" transform="translate(-3,-2) rotate(-7, 40, 40)">
        <polygon
          points={points}
          fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round"
        />
      </g>

      {/* Front layer — no offset, no extra rotation, full opacity, drop-shadow */}
      <g style={{ filter: 'drop-shadow(0 4px 12px rgba(239, 255, 0, 0.15))' }}>
        <polygon
          points={points}
          fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
