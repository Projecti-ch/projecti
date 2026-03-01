import CompositionIcon from '@/components/shapes/compositions/CompositionIcon';

type CompositionVariant = 'stacked-circles' | 'stacked-diamonds' | 'stacked-hexagons';

interface AnimatedVisualProps {
  composition: CompositionVariant;
  size?: number;
}

export default function AnimatedVisual({ composition, size = 96 }: AnimatedVisualProps) {
  return (
    <div className="absolute inset-0 bg-[#efff00]">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <CompositionIcon composition={composition} size={size} variant="light" />
      </div>
    </div>
  );
}
