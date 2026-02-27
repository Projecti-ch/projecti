import ShapeCircle from './ShapeCircle';
import ShapeSquare from './ShapeSquare';
import ShapeTriangle from './ShapeTriangle';
import ShapeHexagon from './ShapeHexagon';
import ShapeDiamond from './ShapeDiamond';
import ShapeArc from './ShapeArc';

type ShapeVariant = 'circle' | 'square' | 'triangle' | 'hexagon' | 'diamond' | 'arc';

interface ShapeIconProps {
  shape: ShapeVariant;
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function ShapeIcon({
  shape,
  size = 64,
  className = '',
  fillColor = '#191919',
}: ShapeIconProps) {
  const props = { size, className, fillColor };

  switch (shape) {
    case 'circle':
      return <ShapeCircle {...props} />;
    case 'square':
      return <ShapeSquare {...props} />;
    case 'triangle':
      return <ShapeTriangle {...props} />;
    case 'hexagon':
      return <ShapeHexagon {...props} />;
    case 'diamond':
      return <ShapeDiamond {...props} />;
    case 'arc':
      return <ShapeArc {...props} />;
    default:
      return null;
  }
}
