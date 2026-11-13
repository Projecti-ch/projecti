export default function SectionDivider({
  label,
  as: Tag = "p",
}: {
  label?: string;
  /** Use "h2" when the label is the title of a content section. */
  as?: "p" | "h2";
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">
      <div className="h-px w-full bg-border" />
      {label && (
        <Tag className="section-label mt-4 text-[12px] font-normal uppercase tracking-widest text-muted leading-[1.5] font-nohemi">
          {label}
        </Tag>
      )}
    </div>
  );
}
