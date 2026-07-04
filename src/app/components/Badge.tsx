interface BadgeProps {
  label: string;
  backgroundColor: string;
}

export function Badge({ label, backgroundColor }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-xl text-sm font-semibold text-foreground ${backgroundColor}`}>
      {label}
    </span>
  );
}