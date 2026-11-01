"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

import { NavLink } from "@/app/[locale]/components/NavLink";
import { Link, usePathname } from "../../../i18n/navigation";

export function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleNavClick = () => setIsOpen(false);

  // Barra de progreso de lectura + header que se esconde al bajar y vuelve al subir
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(!isOpen && latest > previous && latest > 180);
  });

  const NAV_ITEMS = [
    { href: "home", label: t("home") },
    { href: "education", label: t("education") },
    { href: "experience", label: t("experience") },
    { href: "projects", label: t("projects") },
    { href: "contact", label: t("contact") },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  const menuItem = {
    hidden: { opacity: 0, x: reduce ? 0 : -18 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ y: reduce ? 0 : "-100%" }}
      animate={{ y: hidden && !reduce ? "-100%" : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="relative h-16 lg:h-20 overflow-hidden border-b border-white/10 bg-nav/90 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            animate={reduce ? undefined : { x: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 left-1/4 h-36 w-36 rounded-full bg-accent-primary/15 blur-3xl"
          />
          <motion.div
            animate={reduce ? undefined : { x: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 right-1/4 h-40 w-40 rounded-full bg-accent-primary/10 blur-3xl"
          />
        </div>

        <div className="relative z-10 flex h-full items-center justify-between px-5 font-sans text-white">
          <Link href="/" className="group flex items-center gap-2.5 text-lg md:text-xl lg:text-xl xl:text-2xl font-bold tracking-tight truncate">
            <span
              className="h-4 w-1 rounded-sm bg-accent-primary transition-all duration-300 group-hover:h-6"
              aria-hidden="true"
            />
            Alejandro González Macías
          </Link>

          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: reduce ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                onMouseEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                className="relative px-3 py-2 text-sm font-medium"
              >
                <NavLink href={item.href} label={item.label} />

                {/* El subrayado se desliza de un enlace a otro */}
                {hovered === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 36 }}
                  />
                )}
              </motion.div>
            ))}

            <div className="ml-4 flex rounded-full border border-white/10 bg-card p-1">
              <Link
                href={pathname}
                locale="es"
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-9 h-9 rounded-full transition-colors hover:bg-white/10"
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: reduce ? 0 : progress }}
          className="absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left bg-accent-primary"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative lg:hidden overflow-hidden flex flex-col items-center gap-1 border-t border-white/10 bg-nav/95 backdrop-blur-md py-4 shadow-lg"
          >
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute -bottom-16 left-1/4 h-32 w-32 rounded-full bg-accent-primary/15 blur-3xl" />
              <div className="absolute -top-16 right-1/4 h-32 w-32 rounded-full bg-accent-primary/10 blur-3xl" />
            </div>

            <div className="relative z-10 flex w-full flex-col items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.href}
                  variants={menuItem}
                  onClick={handleNavClick}
                  className="w-full py-2 text-center"
                >
                  <NavLink href={item.href} label={item.label} />
                </motion.div>
              ))}

              <motion.div variants={menuItem} className="mt-2 flex rounded-full border border-white/10 bg-card p-1">
                <Link
                  href={pathname}
                  locale="es"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
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
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    locale === "en"
                      ? "bg-accent-primary text-background"
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  EN
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}