import { Technology } from "@/types/project";
import { Check } from "lucide-react";

interface TagFilterProps {
  tags: Technology[];
  selected: Technology[];
  onToggle: (tag: Technology) => void;
}

export function TagFilter({
  tags,
  selected,
  onToggle,
}: TagFilterProps) {
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));

  const midpoint = Math.ceil(sortedTags.length / 2);
  const left = sortedTags.slice(0, midpoint);
  const right = sortedTags.slice(midpoint);

  const orderedTags: Technology[] = [];

  for (let i = 0; i < midpoint; i++) {
    if (left[i]) orderedTags.push(left[i]);
    if (right[i]) orderedTags.push(right[i]);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-0 xl:gap-x-6 gap-y-2.5">
      {orderedTags.map((tag) => {
        const isActive = selected.includes(tag);

        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span
              className={`flex items-center justify-center w-4.5 h-4.5 rounded-md border-2 transition-colors ${
                isActive
                  ? "bg-accent-primary border-accent-primary"
                  : "group-hover:border-accent-primary/60"
              }`}
            >
              {isActive && (
                <Check
                  className="w-3.5 h-3.5 text-background"
                  strokeWidth={3}
                />
              )}
            </span>

            <span
              className={`text-base font-medium transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-foreground-secondary group-hover:text-foreground/60"
              }`}
            >
              {tag}
            </span>
          </button>
        );
      })}
    </div>
  );
}