"use client";

import { Link, usePathname } from "../../../i18n/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  active?: boolean;
}

export function NavLink({ href, label, className, active }: NavLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      href={isHome ? `#${href}` : `/#${href}`}
      onClick={handleClick}
      aria-current={active ? "location" : undefined}
      className={className}
    >
      {label}
    </Link>
  );
}