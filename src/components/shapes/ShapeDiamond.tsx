interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeDiamond({
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeProps) {
  const id = 'gradDiamond';

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
      {/* Square rotated 45° — appears as diamond. rect is 38×38 centered at 32,32 */}
      <rect
        x="13"
        y="13"
        width="38"
        height="38"
        rx="3"
        ry="3"
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
        transform="rotate(45 32 32)"
      />
    </svg>
  );
}
