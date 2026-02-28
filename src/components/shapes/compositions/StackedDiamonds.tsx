interface CompositionProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function StackedDiamonds({
  size = 96,
  className = '',
  fillColor = '#191919',
}: CompositionProps) {
  const id = 'compGradStackedDiamonds';

  // ViewBox 0 0 80 80. Shape centre: (40, 40).
  // Diamond = 38×38 rect at (21,21) with rx=3, rotated 45° around centre.
  // Back and middle layers bake the additional rotation into the total:
  //   Back:   45 − 15 = 30°, translate(-6,-4)
  //   Middle: 45 −  7 = 38°, translate(-3,-2)
  //   Front:  45°, no translate

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

      {/* Back layer — 30° total rotation, offset (-6, -4), opacity 0.4 */}
      <g opacity="0.4" transform="translate(-6,-4) rotate(30, 40, 40)">
        <rect
          x="21" y="21" width="38" height="38" rx="3"
          fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round"
        />
      </g>

      {/* Middle layer — 38° total rotation, offset (-3, -2), opacity 0.7 */}
      <g opacity="0.7" transform="translate(-3,-2) rotate(38, 40, 40)">
        <rect
          x="21" y="21" width="38" height="38" rx="3"
          fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round"
        />
      </g>

      {/* Front layer — 45° rotation, no offset, full opacity, drop-shadow */}
      <g
        transform="rotate(45, 40, 40)"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(239, 255, 0, 0.15))' }}
      >
        <rect
          x="21" y="21" width="38" height="38" rx="3"
          fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
