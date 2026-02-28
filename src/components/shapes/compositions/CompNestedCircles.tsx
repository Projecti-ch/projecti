interface CompositionProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function CompNestedCircles({
  size = 96,
  className = '',
  fillColor = '#191919',
}: CompositionProps) {
  const id = 'compGradNestedCircles';

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
      {/* Outer — drawn first so middle/inner fill on top */}
      <circle cx="32" cy="32" r="28" fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" />
      {/* Middle ≈65% of outer */}
      <circle cx="32" cy="32" r="18" fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" />
      {/* Inner ≈35% of outer */}
      <circle cx="32" cy="32" r="10" fill={fillColor} stroke={`url(#${id})`} strokeWidth="2" />
    </svg>
  );
}
