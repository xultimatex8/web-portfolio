import { Technology } from "@/app/[locale]/types/project";

interface TagFilterProps {
  tags: Technology[];
  selected: Technology[];
  onToggle: (tag: Technology) => void;
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));

  return (
    <div className="w-full -mx-5 md:mx-0 px-5 md:px-0 flex items-center gap-1.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      {sortedTags.map((tag) => {
        const isActive = selected.includes(tag);

        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              isActive
                ? "border-accent-primary text-accent-primary"
                : "border-foreground/10 text-foreground-secondary hover:text-foreground hover:border-foreground/25"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}