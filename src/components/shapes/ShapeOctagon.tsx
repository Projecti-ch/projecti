interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeOctagon({
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeProps) {
  const id = 'gradOctagon';

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
      {/* Regular octagon at r=28, center (32,32), starting angle 22.5° */}
      <polygon
        points="57.9,42.7 42.7,57.9 21.3,57.9 6.1,42.7 6.1,21.3 21.3,6.1 42.7,6.1 57.9,21.3"
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
