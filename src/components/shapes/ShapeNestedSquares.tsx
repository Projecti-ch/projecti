interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeNestedSquares({
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeProps) {
  const id = 'gradNestedSquares';

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
      {/* Outer square */}
      <rect
        x="4" y="4" width="56" height="56" rx="3"
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
      />
      {/* Inner square */}
      <rect
        x="14" y="14" width="36" height="36" rx="2"
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
      />
    </svg>
  );
}
