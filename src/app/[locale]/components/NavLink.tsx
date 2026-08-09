"use client";

import { Link, usePathname } from "../../../i18n/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
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
      className="text-lg lg:text-base 2xl:text-lg font-semibold tracking-tight transition-colors hover:text-foreground-secondary"
    >
      {label}
    </Link>
  );
}