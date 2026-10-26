"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, School } from "lucide-react";

import { Timeline } from "../Timeline";
import { SectionBackground } from "../SectionBackground";
import { SectionTitle } from "../SectionTitle";
import { staggerContainer } from "../../lib/motion";

export function EducationSection() {
  const t = useTranslations("Education");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);

  const EDUCATION_ITEMS = [
    {
      period: "2020 - 2022",
      title: t("highSchool.title"),
      subtitle: t("highSchool.subtitle"),
      icon: School,
    },
    {
      period: "2022 - 2026",
      title: t("university.title"),
      subtitle: t("university.subtitle"),
      icon: GraduationCap,
    },
  ];

  return (
    <motion.section
      id="education"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative isolate flex w-full flex-col sm:items-center gap-6 bg-surface px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21 scroll-mt-6">
        <SectionBackground gridOpacity={0.015} />

        <div className="relative sm:w-[85vw] qhd:w-[75vw]">
          <SectionTitle className="mb-12">{t("title")}</SectionTitle>

          <Timeline items={EDUCATION_ITEMS} />
        </div>
    </motion.section>
  );
}