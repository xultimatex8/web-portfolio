interface TimelineItemProps {
  title: string;
  subtitle: string;
}

export function TimelineItem({ title, subtitle }: TimelineItemProps) {
  return (
    <div className="relative w-full sm:w-xl lg:w-2xl xl:w-4xl fhd:w-7xl">
      <div className="absolute top-1/2 -translate-x-3/7 -translate-y-1/2 w-4 h-4 rounded-full bg-accent-primary border-5 border-surface" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-0.5 bg-accent-primary" />

      <div className="ml-10 h-28 fhd:h-32 bg-card rounded-2xl p-6 flex flex-col justify-center">
        <h2 className="text-lg lg:text-xl 2xl:text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm lg:text-base 2xl:text-lg text-foreground-secondary">{subtitle}</p>
      </div>
    </div>
  );
}