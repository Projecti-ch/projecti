interface CompositionProps {
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function CompAlignment({
  size = 96,
  className = '',
  fillColor = '#191919',
}: CompositionProps) {
  const id = 'compGradAlignment';

  // Three 14×14 squares, gap=5, left+right at y=25, middle at y=21 (4px higher ≈29%)
  // x positions: left=6, middle=25, right=44
  const squares = [
    { x: 6,  y: 25 },
    { x: 25, y: 21 }, // offset upward
    { x: 44, y: 25 },
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
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#efff00" />
          <stop offset="1" stopColor="#c4d100" />
        </linearGradient>
      </defs>
      {squares.map((sq, i) => (
        <rect
          key={i}
          x={sq.x}
          y={sq.y}
          width="14"
          height="14"
          rx="3"
          fill={fillColor}
          stroke={`url(#${id})`}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
