interface BadgeProps {
  label: string;
  textSize?: string;
  highlighted?: boolean;
}

export function Badge({ label, textSize = "text-sm", highlighted = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium ${textSize} ${
        highlighted
          ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
          : "border-current/25 opacity-80"
      }`}
    >
      {label}
    </span>
  );
}