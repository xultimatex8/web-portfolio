interface TimelineItemProps {
  title: string;
  subtitle: string;
}

export function TimelineItem({ title, subtitle }: TimelineItemProps) {
  return (
    <div className="w-full max-w-2xl border-l-2 border-accent-primary/40 pl-4 py-1 transition-colors hover:border-accent-primary">
      <h2 className="text-lg md:text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-sm md:text-base text-foreground-secondary">{subtitle}</p>
    </div>
  );
}