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
    <div className="flex flex-col items-start justify-start gap-5">
      {items.map((item) => (
        <TimelineItem key={item.title} title={item.title} subtitle={item.subtitle} />
      ))}
    </div>
  );
}