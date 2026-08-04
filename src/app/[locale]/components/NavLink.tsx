"use client";

import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();

  const target = pathname === "/" ? `#${href}` : `/#${href}`;

  return (
    <a
      href={target}
      className="text-lg fhd:text-xl font-semibold tracking-tight transition-colors hover:text-foreground-secondary"
    >
      {label}
    </a>
  );
}