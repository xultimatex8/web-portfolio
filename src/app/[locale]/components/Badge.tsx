interface BadgeProps {
  label: string;
  backgroundColor: string;
  textSize?: string;
}

export function Badge({ label, backgroundColor, textSize = "text-sm" }: BadgeProps) {
  return (
    <span
      className={`relative inline-flex items-center overflow-hidden rounded-lg border border-white/10 px-2.5 py-1 font-medium transition-colors ${backgroundColor} ${textSize}`}
    >
      <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-black/10" />
      <span className="relative">{label}</span>
    </span>
  );
}