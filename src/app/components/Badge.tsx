interface BadgeProps {
  label: string;
  backgroundColor: string;
  textSize?: string;
}

export function Badge({ label, backgroundColor, textSize = "text-sm" }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-xl font-semibold text-foreground ${backgroundColor} ${textSize}`}>
      {label}
    </span>
  );
}