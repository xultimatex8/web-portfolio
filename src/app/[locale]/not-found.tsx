"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { SectionBackground } from "./components/SectionBackground";
import { fadeUp, staggerContainer } from "./lib/motion";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-6 px-5 py-10 md:px-15"
    >
      <SectionBackground bottomFade={false}/>

      <div className="relative flex flex-col items-center gap-8 text-center sm:w-[85vw] qhd:w-[75vw]">
        <motion.div variants={fadeUpVariant} className="relative flex flex-col items-center">
          <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold leading-none tracking-tight text-foreground/10 select-none">
            404
          </span>
        </motion.div>

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
          <Link
            href="/"
            className="
              group relative flex items-center gap-2 overflow-hidden
              rounded-full bg-accent-primary px-6 py-3
              text-sm font-medium text-background shadow-xl
              transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl
            "
          >
            <Home className="h-4 w-4" />
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
