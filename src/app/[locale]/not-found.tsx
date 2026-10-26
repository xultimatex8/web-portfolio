"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { SectionBackground } from "./components/SectionBackground";
import { fadeUp, staggerContainer } from "./lib/motion";

const DIGITS = ["4", "0", "4"];

export default function NotFound() {
  const t = useTranslations("NotFound");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const digit = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 80,
      rotate: shouldReduceMotion ? 0 : -12,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 11, delay: i * 0.14 },
    }),
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-6 px-5 py-10 md:px-15"
    >
      <SectionBackground bottomFade={false}/>

      <div className="relative flex flex-col items-center gap-8 text-center sm:w-[85vw] qhd:w-[75vw]">
        {/* Cada número cae con rebote y luego flota con su propio ritmo */}
        <div
          aria-label="404"
          className="relative flex select-none items-center justify-center text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold leading-none tracking-tight text-foreground/10"
        >
          {DIGITS.map((d, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              custom={i}
              variants={digit}
              className="inline-block"
            >
              <motion.span
                className="inline-block"
                animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
                transition={{
                  duration: 3.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1 + i * 0.3,
                }}
              >
                {d}
              </motion.span>
            </motion.span>
          ))}
        </div>

        <motion.div variants={fadeUpVariant} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 rounded-sm bg-accent-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {t("title")}
            </h1>
          </div>

          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-secondary md:text-lg">
            {t("description")}
          </p>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          >
            <Link
              href="/"
              className="
                group relative flex items-center gap-2 overflow-hidden
                rounded-full bg-accent-primary px-6 py-3
                text-sm font-medium text-background shadow-xl
                transition-shadow duration-500 hover:shadow-2xl
              "
            >
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" />
              {t("cta")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}