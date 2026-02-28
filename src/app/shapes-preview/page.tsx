import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import SectionDivider from '@/components/SectionDivider';
import ShapeIcon from '@/components/shapes/ShapeIcon';
import CompositionIcon from '@/components/shapes/compositions/CompositionIcon';

export const metadata: Metadata = {
  title: 'Shapes Preview',
  robots: { index: false, follow: false },
};

const cx = 'mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20';

const shapes = [
  { name: 'Circle', shape: 'circle' },
  { name: 'Square', shape: 'square' },
  { name: 'Triangle', shape: 'triangle' },
  { name: 'Hexagon', shape: 'hexagon' },
  { name: 'Diamond', shape: 'diamond' },
  { name: 'Arc', shape: 'arc' },
  { name: 'Nested Squares', shape: 'nested-squares' },
  { name: 'Semicircle', shape: 'semicircle' },
  { name: 'Octagon', shape: 'octagon' },
  { name: 'Pill', shape: 'pill' },
  { name: 'Grid 2×2', shape: 'grid-2x2' },
  { name: 'Grid 3×3', shape: 'grid-3x3' },
] as const;

const compositions = [
  { name: 'Nested Circles', composition: 'nested-circles' },
  { name: 'Alignment', composition: 'alignment' },
  { name: 'Converging Chevrons', composition: 'converging-chevrons' },
] as const;

export default function ShapesPreviewPage() {
  return (
    <>
      <Nav />

      <main className="py-12 md:py-16">
        {/* Row 1 — Main background (#191919) */}
        <SectionDivider label="Main Background (#191919)" />
        <section className="py-12 md:py-16">
          <div className={cx}>
            <FadeIn>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-8">
                {shapes.map(({ name, shape }) => (
                  <div key={shape} className="flex flex-col items-center gap-4">
                    <ShapeIcon shape={shape} size={80} fillColor="#191919" />
                    <span className="text-[13px] text-muted font-light tracking-wide text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Row 2 — Card background (#222222) */}
        <SectionDivider label="Card Background (#222222)" />
        <section className="py-12 md:py-16">
          <div className={cx}>
            <FadeIn delay={80}>
              <div className="rounded-xl bg-card p-8 md:p-12">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-8">
                  {shapes.map(({ name, shape }) => (
                    <div key={shape} className="flex flex-col items-center gap-4">
                      <ShapeIcon shape={shape} size={80} fillColor="#222222" />
                      <span className="text-[13px] text-muted font-light tracking-wide text-center">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Row 3 — Large size showcase */}
        <SectionDivider label="Large Size (128px)" />
        <section className="py-12 md:py-16">
          <div className={cx}>
            <FadeIn delay={160}>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-8">
                {shapes.map(({ name, shape }) => (
                  <div key={shape} className="flex flex-col items-center gap-4">
                    <ShapeIcon shape={shape} size={128} fillColor="#191919" />
                    <span className="text-[13px] text-muted font-light tracking-wide text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Compositions — Main background */}
        <SectionDivider label="Compositions — Main Background (#191919)" />
        <section className="py-12 md:py-16">
          <div className={cx}>
            <FadeIn>
              <div className="grid grid-cols-3 gap-12">
                {compositions.map(({ name, composition }) => (
                  <div key={composition} className="flex flex-col items-center gap-4">
                    <CompositionIcon composition={composition} size={96} fillColor="#191919" />
                    <span className="text-[13px] text-muted font-light tracking-wide text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Compositions — Card background */}
        <SectionDivider label="Compositions — Card Background (#222222)" />
        <section className="py-12 md:py-16">
          <div className={cx}>
            <FadeIn delay={80}>
              <div className="rounded-xl bg-card p-8 md:p-12">
                <div className="grid grid-cols-3 gap-12">
                  {compositions.map(({ name, composition }) => (
                    <div key={composition} className="flex flex-col items-center gap-4">
                      <CompositionIcon composition={composition} size={96} fillColor="#222222" />
                      <span className="text-[13px] text-muted font-light tracking-wide text-center">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
