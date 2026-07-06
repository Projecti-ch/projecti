interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeSemicircle({
  size = 64,
  className = '',
  fillColor = '#12351f',
}: ShapeProps) {
  const id = 'gradSemicircle';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', filter: 'drop-shadow(0 4px 12px rgba(115, 226, 167, 0.15))' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#73e2a7" />
          <stop offset="1" stopColor="#1c7c54" />
        </linearGradient>
      </defs>
      {/* Filled upper dome — flat bottom at y=32 */}
      <path
        d="M 4 32 A 28 28 0 0 1 60 32 Z"
        fill={fillColor}
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
