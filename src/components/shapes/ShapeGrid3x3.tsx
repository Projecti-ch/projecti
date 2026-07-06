interface ShapeProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeGrid3x3({
  size = 64,
  className = '',
  fillColor = '#12351f',
}: ShapeProps) {
  const id = 'gradGrid3x3';

  // 9 cells: 18×18, gap=2, margin=3 → columns x: 3,23,43 / rows y: 3,23,43
  const xs = [3, 23, 43];
  const ys = [3, 23, 43];

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
      {ys.map((y) =>
        xs.map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x} y={y} width="18" height="18" rx="2"
            fill={fillColor}
            stroke={`url(#${id})`}
            strokeWidth="1.5"
          />
        ))
      )}
    </svg>
  );
}
