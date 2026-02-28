import StackedCircles from './StackedCircles';
import StackedDiamonds from './StackedDiamonds';
import StackedHexagons from './StackedHexagons';

type CompositionVariant = 'stacked-circles' | 'stacked-diamonds' | 'stacked-hexagons';

interface CompositionIconProps {
  composition: CompositionVariant;
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function CompositionIcon({
  composition,
  size = 96,
  className = '',
  fillColor = '#191919',
}: CompositionIconProps) {
  const props = { size, className, fillColor };

  switch (composition) {
    case 'stacked-circles':
      return <StackedCircles {...props} />;
    case 'stacked-diamonds':
      return <StackedDiamonds {...props} />;
    case 'stacked-hexagons':
      return <StackedHexagons {...props} />;
    default:
      return null;
  }
}
