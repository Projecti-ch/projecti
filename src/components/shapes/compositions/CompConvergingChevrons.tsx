interface CompositionProps {
  size?: number;
  className?: string;
  // fillColor unused (chevrons are open stroked paths) but kept for API consistency
  fillColor?: string;
}

export default function CompConvergingChevrons({
  size = 96,
  className = '',
}: CompositionProps) {
  const id = 'compGradChevrons';

  // Three open V-shapes converging toward (32, 32).
  // gap=8 from center to tip, arm_length=16, arm_half_width=9.
  //
  // Top-left (↘): tip=(26,26)  → M 21 9  L 26 26 L 9  21
  // Top-right (↙): tip=(38,26) → M 55 21 L 38 26 L 43 9
  // Bottom     (↑): tip=(32,40) → M 41 56 L 32 40 L 23 56
  const chevrons = [
    'M 21 9  L 26 26 L 9  21',
    'M 55 21 L 38 26 L 43 9',
    'M 41 56 L 32 40 L 23 56',
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', filter: 'drop-shadow(0 4px 12px rgba(239, 255, 0, 0.15))' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#efff00" />
          <stop offset="1" stopColor="#c4d100" />
        </linearGradient>
      </defs>
      {chevrons.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={`url(#${id})`}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
