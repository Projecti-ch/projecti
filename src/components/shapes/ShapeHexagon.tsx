interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeHexagon({
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeProps) {
  const id = 'gradHexagon';
  // Regular hexagon centered at 32,32 with radius 28
  // Points at 0°, 60°, 120°, 180°, 240°, 300° (flat-top orientation)
  const r = 28;
  const cx = 32;
  const cy = 32;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');

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
      <polygon
        points={points}
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
