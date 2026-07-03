import { TimelineItem } from "./TimelineItem";

interface TimelineItemData {
  title: string;
  subtitle: string;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative flex flex-col items-start justify-start gap-15">
      <div className="absolute left-0 top-6 bottom-6 w-0.75 bg-accent-primary z-10" />
      {items.map((item) => (
        <TimelineItem key={item.title} title={item.title} subtitle={item.subtitle} />
      ))}
    </div>
  );
}