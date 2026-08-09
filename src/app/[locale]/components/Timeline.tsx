import { TimelineItem } from "./TimelineItem";

export interface TimelineItemData {
  period: string;
  title: string;
  subtitle: string;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-0 right-0 top-2 hidden h-px bg-foreground/10 lg:block" />

      <div className="absolute bottom-0 left-2 top-0 w-px bg-foreground/10 lg:hidden" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {items.map((item, index) => (
          <TimelineItem key={item.title} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}