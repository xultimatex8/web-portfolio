interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      href={`#${href}`}
      className="text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-foreground-secondary"
    >
      {label}
    </a>
  );
}