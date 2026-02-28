interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeGrid2x2({
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeProps) {
  const id = 'gradGrid2x2';

  // 4 cells: 25×25, gap=4, margin=5 → positions (5,5),(34,5),(5,34),(34,34)
  const positions = [
    { x: 5, y: 5 },
    { x: 34, y: 5 },
    { x: 5, y: 34 },
    { x: 34, y: 34 },
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
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#efff00" />
          <stop offset="1" stopColor="#c4d100" />
        </linearGradient>
      </defs>
      {positions.map((pos, i) => (
        <rect
          key={i}
          x={pos.x} y={pos.y} width="25" height="25" rx="2"
          fill={fillColor}
          stroke={`url(#${id})`}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
