"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

import { Timeline, type TimelineItemData } from "../Timeline";
import { SectionBackground } from "../SectionBackground";
import { SectionTitle } from "../SectionTitle";
import { staggerContainer } from "../../lib/motion";
import { EDUCATION } from "../../data/education";

export function EducationSection() {
  const t = useTranslations("Education");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);

  const items: TimelineItemData[] = EDUCATION.map((entry) => ({
    period: `${entry.start} - ${entry.end ?? t(`${entry.id}.now` as never)}`,
    title: t(`${entry.id}.title` as never),
    subtitle: t(`${entry.id}.subtitle` as never),
    icon: entry.icon,
  }));

  return (
    <motion.section
      id="education"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative isolate flex w-full flex-col sm:items-center gap-6 bg-surface px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21 scroll-mt-6"
    >
      <SectionBackground gridOpacity={0.015} />

      <div className="relative sm:w-[85vw] qhd:w-[75vw]">
        <SectionTitle className="mb-12">{t("title")}</SectionTitle>

        <Timeline items={items} />
      </div>
    </motion.section>
  );
}