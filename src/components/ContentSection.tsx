import Image from "next/image";
import FadeIn from "./FadeIn";
import RichText, { type SerializedNode } from "./RichText";
import SectionDivider from "./SectionDivider";

interface ContentSectionProps {
  label?: string | null;
  body?: {
    root: {
      children: SerializedNode[];
      [key: string]: unknown;
    };
    [key: string]: unknown;
  } | null;
  image?: string | null;
  imageAlt?: string;
  image2?: string | null;
  image2Alt?: string;
}

const cx = "mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20";

export default function ContentSection({
  label,
  body,
  image,
  imageAlt = "Section image",
  image2,
  image2Alt = "Section image",
}: ContentSectionProps) {
  // Don't render if no content
  if (!label && !body && !image && !image2) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      {/* Divider with label */}
      {label && <SectionDivider label={label} />}

      {/* Body content */}
      {body && (
        <div className={`${cx} mt-8 md:mt-12`}>
          <FadeIn delay={80}>
            <div className="max-w-[800px] text-[16px] leading-[1.6] text-white">
              <RichText content={body} />
            </div>
          </FadeIn>
        </div>
      )}

      {/* Images */}
      {(image || image2) && (
        <div className={`${cx} mt-12`}>
          <FadeIn delay={160}>
            {/* Single image - full width */}
            {image && !image2 && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Two images - side by side */}
            {image && image2 && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={image2}
                    alt={image2Alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      )}
    </section>
  );
}
