import CompNestedCircles from './CompNestedCircles';
import CompAlignment from './CompAlignment';
import CompConvergingChevrons from './CompConvergingChevrons';

type CompositionVariant = 'nested-circles' | 'alignment' | 'converging-chevrons';

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
    case 'nested-circles':
      return <CompNestedCircles {...props} />;
    case 'alignment':
      return <CompAlignment {...props} />;
    case 'converging-chevrons':
      return <CompConvergingChevrons {...props} />;
    default:
      return null;
  }
}
