import ShapeCircle from './ShapeCircle';
import ShapeSquare from './ShapeSquare';
import ShapeTriangle from './ShapeTriangle';
import ShapeHexagon from './ShapeHexagon';
import ShapeDiamond from './ShapeDiamond';
import ShapeArc from './ShapeArc';
import ShapeNestedSquares from './ShapeNestedSquares';
import ShapeSemicircle from './ShapeSemicircle';
import ShapeOctagon from './ShapeOctagon';
import ShapePill from './ShapePill';
import ShapeGrid2x2 from './ShapeGrid2x2';
import ShapeGrid3x3 from './ShapeGrid3x3';

type ShapeVariant =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'hexagon'
  | 'diamond'
  | 'arc'
  | 'nested-squares'
  | 'semicircle'
  | 'octagon'
  | 'pill'
  | 'grid-2x2'
  | 'grid-3x3';

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
    case 'nested-squares':
      return <ShapeNestedSquares {...props} />;
    case 'semicircle':
      return <ShapeSemicircle {...props} />;
    case 'octagon':
      return <ShapeOctagon {...props} />;
    case 'pill':
      return <ShapePill {...props} />;
    case 'grid-2x2':
      return <ShapeGrid2x2 {...props} />;
    case 'grid-3x3':
      return <ShapeGrid3x3 {...props} />;
    default:
      return null;
  }
}
