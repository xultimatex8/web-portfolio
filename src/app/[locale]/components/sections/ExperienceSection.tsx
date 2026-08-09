"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

import { fadeUp, staggerContainer } from "../../lib/motion";
import { SectionBackground } from "../SectionBackground";

export function ExperienceSection() {
  const t = useTranslations("Experience");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  return (
    <motion.section
      id="experience"
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="relative isolate flex w-full flex-col gap-8 px-5 py-10 md:px-15 lg:py-16" >
        <SectionBackground gridOpacity={0.03} fadeColor="var(--surface)" />

        <motion.div
          variants={fadeUpVariant}
          className="flex items-center gap-2"
        >
          <span className="h-4 w-1 rounded-sm bg-accent-primary" />

          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
        >
          <p className="text-lg font-medium leading-snug text-foreground md:text-xl xl:text-2xl">
            {t("text1")}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-foreground-secondary xl:text-base">
            {t("text2")}
          </p>
        </motion.div>
    </motion.section>
  );
}
