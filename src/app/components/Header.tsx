"use client";

import { useState } from "react";
import { NavLink } from "@/components/NavLink";

const NAV_ITEMS = [
  { href: "home", label: "Home" },
  { href: "education", label: "Education" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <div className="fixed inset-x-0 top-0 h-16 lg:h-20 flex justify-between items-center text-white bg-nav font-sans px-5 z-50">
      <h1 className="text-lg md:text-xl lg:text-2xl fhd:text-3xl font-bold tracking-tight truncate">
        Alejandro González Macías
      </h1>

      <nav className="hidden lg:flex items-center gap-5">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
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
        <nav className="lg:hidden fixed inset-x-0 top-12 flex flex-col items-center gap-2 bg-nav py-2 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="w-full border-b last:border-b-0">
              <div onClick={handleNavClick} className="text-center">
                <NavLink href={item.href} label={item.label} />
              </div>
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}