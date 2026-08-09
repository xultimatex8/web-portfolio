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
      className="relative isolate flex w-full flex-col sm:items-center px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21" >
        <SectionBackground gridOpacity={0.03} fadeColor="var(--surface)" />
          <div className="relative sm:w-[85vw] qhd:w-[75vw] flex flex-col gap-8">
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
              className="flex flex-col self-start"
            >
              <p className="text-base md:text-lg xl:text-xl font-medium leading-snug text-foreground">
                {t("text1")}
              </p>

              <p className="mt-4 2xl:mt-1 text-xs md:text-sm xl:text-base leading-relaxed text-foreground-secondary">
                {t("text2")}
              </p>
            </motion.div>
          </div>
    </motion.section>
  );
}
