import StackedCircles from './StackedCircles';
import StackedDiamonds from './StackedDiamonds';
import StackedHexagons from './StackedHexagons';

type CompositionVariant = 'stacked-circles' | 'stacked-diamonds' | 'stacked-hexagons';

interface CompositionIconProps {
  composition: CompositionVariant;
  size?: number;
  className?: string;
  variant?: 'dark' | 'light';
}

export default function CompositionIcon({
  composition,
  size = 96,
  className = '',
  variant = 'dark',
}: CompositionIconProps) {
  const props = { size, className, variant };

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
