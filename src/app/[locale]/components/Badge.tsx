interface BadgeProps {
  label: string;
  textSize?: string;
}

export function Badge({ label, textSize = "text-sm" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/25 px-2.5 py-0.5 font-medium opacity-80 ${textSize}`}
    >
      {label}
    </span>
  );
}