"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionBackground } from "../SectionBackground";
import { fadeUp, staggerContainer } from "../../lib/motion";

export function HomeSection() {
  const t = useTranslations("Home");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const FACTS = [t("location"), t("university"), t("languages"), t("openToWork")];

  return (
    <motion.section
      id="home"
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="relative w-full isolate overflow-hidden flex flex-col items-center justify-between gap-15 px-5 py-10 lg:gap-24 lg:py-20"
    >
      <SectionBackground fadeColor="var(--surface)" />

      <div className="flex flex-col xl:flex-row items-center justify-start gap-6 md:gap-10">
        <motion.div variants={fadeUpVariant}>
          <Image
            src="/images/photo.jpeg"
            alt="Alejandro González Macías"
            width={600}
            height={600}
            priority
            className="w-78 sm:w-85 md:w-100 lg:w-120 xl:w-150 h-auto rounded-full object-cover border-6 border-surface"
          />
        </motion.div>

        <div className="relative max-w-275 flex flex-col items-center xl:items-start justify-center gap-4 sm:gap-6 lg:gap-8 text-center xl:text-start">
          <div className="flex flex-col xl:items-start justify-center gap-1">
            <motion.h1
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl fhd:text-7xl font-bold tracking-tight text-foreground"
            >
              Alejandro González Macías
            </motion.h1>

            <motion.h2
              variants={fadeUpVariant}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl 2xl:text-4xl fhd:text-5xl font-medium tracking-tight text-foreground-secondary"
            >
              {t("role")}{" "}
              <span className="text-accent-primary">
                {t("roleHighlight")}
              </span>
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUpVariant}
            className="max-w-4xl xl:max-w-3xl 2xl:max-w-4xl flex flex-col gap-2 text-start"
          >
            <div className="text-center xl:text-start flex flex-col items-start justify-center gap-4 text-xs md:text-sm xl:text-base text-foreground">
              <p>
                {t.rich("bio1", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p>
                {t.rich("bio2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            className="sm:-mt-2 lg:-mt-3 text-xs md:text-sm text-foreground-secondary flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1"
          >
            {FACTS.map((fact, i) => (
              <span key={fact} className="flex items-center gap-2.5">
                {i > 0 && <span className="text-accent-primary">·</span>}
                {fact}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
