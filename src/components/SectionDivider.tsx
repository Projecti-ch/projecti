export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">
      <div className="h-[2px] w-full bg-accent" />
      {label && (
        <p className="mt-4 text-[12px] font-normal uppercase tracking-widest text-accent leading-[1.5] font-nohemi">
          {label}
        </p>
      )}
    </div>
  );
}
