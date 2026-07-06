export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">
      <div className="h-px w-full bg-border" />
      {label && (
        <p className="mt-4 text-[12px] font-normal uppercase tracking-widest text-muted leading-[1.5] font-nohemi">
          {label}
        </p>
      )}
    </div>
  );
}
