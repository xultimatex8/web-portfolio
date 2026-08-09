"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

import { Timeline } from "../Timeline";
import { SectionBackground } from "../SectionBackground";
import { fadeUp, staggerContainer } from "../../lib/motion";

export function EducationSection() {
  const t = useTranslations("Education");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const EDUCATION_ITEMS = [
    {
      period: "2020 - 2022",
      title: t("highSchool.title"),
      subtitle: t("highSchool.subtitle"),
    },
    {
      period: "2022 - 2026",
      title: t("university.title"),
      subtitle: t("university.subtitle"),
    },
  ];

  return (
    <motion.section
      id="education"
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="relative isolate flex w-full flex-col sm:items-center gap-6 bg-surface px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21">
        <SectionBackground gridOpacity={0.015} />

        <div className="relative sm:w-[85vw] qhd:w-[75vw]">
          <motion.div
            variants={fadeUpVariant}
            className="mb-12 flex items-center gap-2"
          >
            <span className="h-4 w-1 rounded-sm bg-accent-primary" />

            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {t("title")}
            </h2>
          </motion.div>

          <Timeline items={EDUCATION_ITEMS} />
        </div>
    </motion.section>
  );
}
