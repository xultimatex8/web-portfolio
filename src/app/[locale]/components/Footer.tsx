"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

export function Footer() {
  const t = useTranslations("Layout");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden border-t border-white/10 bg-nav px-6 py-8 text-nav-foreground lg:px-15 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: [0, 60, 0], y: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-accent-primary/10 blur-3xl"
        />
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: [0, -60, 0], y: [0, 12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-16 right-1/4 h-32 w-32 rounded-full bg-accent-primary/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
        <div className="flex items-center gap-2.5">
          <motion.span
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-4 w-1 origin-bottom rounded-sm bg-accent-primary"
            aria-hidden="true"
          />
          <p className="text-sm text-nav-foreground/80 md:text-sm xl:text-base">
            © {new Date().getFullYear()} Alejandro González Macías
          </p>
        </div>

        <motion.a
          href="https://github.com/xultimatex8/web-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card px-2 md:px-4 py-2 text-xs font-medium transition-colors hover:border-accent-primary/50 hover:text-accent-primary lg:text-sm"
        >
          <i aria-hidden="true" className="devicon-github-original text-[15px]" />
          {t("sourceCode")}
        </motion.a>
      </div>
    </motion.footer>
  );
}