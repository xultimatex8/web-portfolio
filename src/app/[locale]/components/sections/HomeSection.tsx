"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useTranslations } from "next-intl";
import { SectionBackground } from "../SectionBackground";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { EASE, revealUp, stagger } from "../../lib/animations";

const NAME_WORDS = ["Alejandro", "González", "Macías"];

export function HomeSection() {
  const t = useTranslations("Home");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  // Parallax: foto y texto se mueven a distinta velocidad al hacer scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -30]);

  const photoVariant = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      rotate: shouldReduceMotion ? 0 : -6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 70, damping: 14, delay: 0.1 },
    },
  };

  const underline = {
    hidden: { scaleX: shouldReduceMotion ? 1 : 0 },
    visible: { scaleX: 1, transition: { duration: 0.9, delay: 1, ease: EASE } },
  };

  const factItem = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  const FACTS = [t("location"), t("university"), t("languages"), t("openToWork")];

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="relative w-full isolate overflow-hidden flex flex-col items-center justify-between gap-15 px-5 pt-10 pb-16 lg:gap-24 lg:py-20 lg:pb-24 scroll-mt-6"
    >
      <SectionBackground fadeColor="var(--surface)" />

      <div className="sm:w-[85vw] qhd:w-[75vw] flex flex-col xl:flex-row items-center justify-start gap-6 md:gap-10">
        {/* Foto: entra con un giro, anillo orbitando y parallax */}
        <motion.div
          variants={photoVariant}
          style={{ y: photoY }}
          className="relative shrink-0"
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-accent-primary/50"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary shadow-[0_0_14px_var(--accent-primary)]" />
          </motion.span>

          <Image
            src="/images/photo.jpeg"
            alt="Alejandro González Macías"
            width={600}
            height={600}
            priority
            className="relative w-78 sm:w-85 md:w-100 lg:w-120 xl:w-150 h-auto rounded-full object-cover border-6 border-surface"
          />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative max-w-275 qhd:max-w-5xl flex flex-col items-center xl:items-start justify-center gap-4 sm:gap-6 lg:gap-8 text-center xl:text-start"
        >
          <div className="flex flex-col xl:items-start justify-center gap-1">
            <motion.h1
              variants={stagger(0.12)}
              aria-label="Alejandro González Macías"
              className="flex flex-wrap justify-center gap-x-[0.28em] xl:justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl fhd:text-7xl font-bold tracking-tight text-foreground"
            >
              {NAME_WORDS.map((word) => (
                <span
                  key={word}
                  aria-hidden="true"
                  className="my-[-0.1em] inline-block overflow-hidden py-[0.1em]"
                >
                  <motion.span
                    variants={revealUp(shouldReduceMotion)}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.h2
              variants={fadeUpVariant}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl 2xl:text-4xl fhd:text-5xl font-medium tracking-tight text-foreground-secondary"
            >
              {t("role")}{" "}
              <span className="relative inline-block text-accent-primary">
                {t("roleHighlight")}
                <motion.span
                  variants={underline}
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-accent-primary"
                />
              </span>
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUpVariant}
            className="max-w-4xl xl:max-w-3xl 2xl:max-w-4xl qhd:max-w-5xl flex flex-col gap-2 text-start"
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
            variants={stagger(0.1, 0.4)}
            className="sm:-mt-2 lg:-mt-3 text-xs md:text-sm text-foreground-secondary flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1"
          >
            {FACTS.map((fact, i) => (
              <motion.span
                key={fact}
                variants={factItem}
                className="flex items-center gap-2.5"
              >
                {i > 0 && <span className="text-accent-primary">·</span>}
                {fact}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}