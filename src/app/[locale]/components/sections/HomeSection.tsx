"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function HomeSection() {
  const t = useTranslations("Home");
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.8, 1, 0.6, 1] as const,
      },
    },
  };

  return (
    <motion.section
      id="home"
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative py-10 lg:py-20 flex flex-col items-center justify-between gap-15 lg:gap-30 px-5"
    >
      <div className="flex flex-col lg:flex-row items-center justify-start gap-10">
        <motion.div variants={fadeUp}>
          <Image
            src="/images/photo.jpeg"
            alt="Alejandro González Macías"
            width={600}
            height={600}
            priority
            className="w-80 md:w-100 lg:w-150 h-auto rounded-full object-cover border-6 border-surface"
          />
        </motion.div>

        <div className="relative max-w-275 flex flex-col items-start justify-center gap-8 text-center lg:text-start">
          <div className="flex flex-col items- lg:items-start justify-center gap-1">
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl fhd:text-8xl font-bold tracking-tight text-foreground"
            >
              Alejandro González Macías
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl fhd:text-6xl font-medium tracking-tight text-foreground-secondary"
            >
              {t("role")}{" "}
              <span className="text-accent-primary">
                {t("roleHighlight")}
              </span>
            </motion.h2>
          </div>
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        className="relative max-w-450 px-6 lg:px-15 pt-6 lg:pt-7 pb-8 lg:pb-10 rounded-t-[2.5rem] rounded-b-4xl lg:rounded-t-[5rem] lg:rounded-b-[4rem] bg-surface flex flex-col items-center justify-start gap-6 lg:gap-8 text-start"
      >
        <div className="flex flex-col items-center justify-center gap-2 lg:gap-4">
          <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold tracking-tight text-foreground">
            {t("aboutTitle")}{" "}
            <span className="text-accent-primary">
              {t("aboutHighlight")}
            </span>
          </h1>

          <div className="text-[10px] sm:text-xs lg:text-sm 2xl:text-base fhd:text-lg flex flex-wrap justify-center gap-2 lg:gap-3">
            <span className="rounded-full bg-card px-3 py-1.5 lg:px-4 lg:py-2">
              📍 {t("location")}
            </span>
            <span className="rounded-full bg-card px-3 py-1.5 lg:px-4 lg:py-2">
              🎓 {t("university")}
            </span>
            <span className="rounded-full bg-card px-3 py-1.5 lg:px-4 lg:py-2">
              🌍 {t("languages")}
            </span>
            <span className="rounded-full bg-card px-3 py-1.5 lg:px-4 lg:py-2">
              💼 {t("openToWork")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center gap-4 text-sm md:text-base lg:text-lg 2xl:text-xl text-foreground">
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
          <p>
            {t.rich("bio3", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}