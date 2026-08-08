interface BadgeProps {
  label: string;
  backgroundColor: string;
  textSize?: string;
}

export function Badge({ label, backgroundColor, textSize = "text-sm" }: BadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded-md font-medium ${backgroundColor} ${textSize}`}>
      {label}
    </span>
  );
}