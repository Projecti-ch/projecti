interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeTriangle({
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeProps) {
  const id = 'gradTriangle';
  // Equilateral triangle pointing up, inset slightly for stroke clearance
  // Top: (32, 5), Bottom-left: (5, 59), Bottom-right: (59, 59)
  const d = 'M32 6 L58 58 L6 58 Z';
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
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#efff00" />
          <stop offset="1" stopColor="#c4d100" />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
