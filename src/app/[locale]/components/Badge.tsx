interface BadgeProps {
  label: string;
  textSize?: string;
}

export function Badge({
  label,
  textSize = "text-sm",
}: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-md border border-foreground/10 bg-accent-secondary px-2 py-1 font-medium text-foreground transition-colors duration-200 ${textSize}`}>
      {label}
    </span>
  );
}