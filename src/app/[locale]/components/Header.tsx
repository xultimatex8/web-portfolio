"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { NavLink } from "@/app/[locale]/components/NavLink";
import { Link, usePathname } from "../../../i18n/navigation";

export function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  const NAV_ITEMS = [
    { href: "home", label: t("home") },
    { href: "education", label: t("education") },
    { href: "experience", label: t("experience") },
    { href: "projects", label: t("projects") },
    { href: "contact", label: t("contact") },
  ];

  return (
    <div className="fixed inset-x-0 top-0 h-16 lg:h-20 flex justify-between items-center text-white bg-nav font-sans px-5 z-50">
      <h1 className="text-lg md:text-xl lg:text-2xl fhd:text-3xl font-bold tracking-tight truncate">
        Alejandro González Macías
      </h1>

      <nav className="hidden lg:flex items-center gap-5">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}

        <div className="flex rounded-full bg-card p-1">
          <Link
            href={pathname}
            locale="es"
            className={`px-3 py-1 rounded-full text-sm transition ${
              locale === "es"
                ? "bg-accent-primary text-background"
                : "text-foreground-secondary hover:text-foreground"
            }`}
          >
            ES
          </Link>

          <Link
            href={pathname}
            locale="en"
            className={`px-3 py-1 rounded-full text-sm transition ${
              locale === "en"
                ? "bg-accent-primary text-background"
                : "text-foreground-secondary hover:text-foreground"
            }`}
          >
            EN
          </Link>
        </div>
      </nav>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isOpen}
        className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-transform ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-transform ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav className="lg:hidden fixed inset-x-0 top-16 flex flex-col items-center gap-2 bg-nav py-2 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="w-full border-b last:border-b-0">
              <div onClick={handleNavClick} className="text-center">
                <NavLink href={item.href} label={item.label} />
              </div>
            </div>
          ))}

          <div className="flex rounded-full bg-card p-1">
            <Link
              href={pathname}
              locale="es"
              className={`px-3 py-1 rounded-full text-sm transition ${
                locale === "es"
                  ? "bg-accent-primary text-background"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              ES
            </Link>

            <Link
              href={pathname}
              locale="en"
              className={`px-3 py-1 rounded-full text-sm transition ${
                locale === "en"
                  ? "bg-accent-primary text-background"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              EN
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}