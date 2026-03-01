interface CompositionProps {
  size?: number;
  className?: string;
  variant?: 'dark' | 'light';
}

export default function StackedCircles({
  size = 96,
  className = '',
  variant = 'dark',
}: CompositionProps) {
  const id = `compGradStackedCircles-${variant}`;
  const isDark = variant === 'dark';

  const gradStart = isDark ? '#efff00' : '#191919';
  const gradEnd = isDark ? '#c4d100' : '#2a2a2a';
  const fill = isDark ? '#191919' : '#efff00';
  const shadow = isDark
    ? 'drop-shadow(0 4px 12px rgba(239, 255, 0, 0.15))'
    : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))';

  return (
    <svg
      width={size}
      height={size}
      viewBox="-20 -20 136 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block' }}
    >
      <defs>
        <linearGradient id={id} x1="-20" y1="-20" x2="116" y2="136" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={gradStart} />
          <stop offset="1" stopColor={gradEnd} />
        </linearGradient>
      </defs>

      <g transform="scale(1, 0.85)">
        {/* Bottom layer */}
        <g opacity="0.35" transform="translate(0, 16)">
          <circle cx="48" cy="58" r="28" fill={fill} stroke={`url(#${id})`} strokeWidth="2" />
        </g>

        {/* Middle layer */}
        <g opacity="0.65" transform="translate(0, 8)">
          <circle cx="48" cy="58" r="28" fill={fill} stroke={`url(#${id})`} strokeWidth="2" />
        </g>

        {/* Top layer */}
        <g style={{ filter: shadow }}>
          <circle cx="48" cy="58" r="28" fill={fill} stroke={`url(#${id})`} strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}
