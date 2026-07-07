import { Check } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      {tags.map((tag) => {
        const isActive = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-md border-2 transition-colors ${
                isActive
                  ? "bg-accent-primary border-accent-primary"
                  : "group-hover:border-accent-primary/60"
              }`}
            >
              {isActive && <Check className="w-3.5 h-3.5 text-background" strokeWidth={3} />}
            </span>
            <span
              className={`text-xl font-medium transition-colors ${
                isActive ? "text-foreground" : "text-foreground-secondary group-hover:text-foreground/60"
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