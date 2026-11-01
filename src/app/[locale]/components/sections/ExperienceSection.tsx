"use client";

import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowDown } from "lucide-react";

import { PROJECTS } from "@/app/[locale]/data/projects";
import { EXPERIENCE } from "@/app/[locale]/data/experience";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { EASE } from "../../lib/animations";
import { SectionBackground } from "../SectionBackground";
import { SectionTitle } from "../SectionTitle";
import { ExperienceCard } from "../ExperienceCard";
import { CountUp } from "../CountUp";

function ExperienceList() {
  const shouldReduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <div ref={listRef} className="relative flex flex-col gap-8">
      <div className="absolute bottom-0 left-1.75 top-0 w-px bg-foreground/10" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: shouldReduceMotion ? 1 : fill }}
        className="absolute bottom-0 left-1.75 top-0 w-px origin-top bg-accent-primary"
      />

      {EXPERIENCE.map((entry, index) => (
        <ExperienceCard key={entry.id} entry={entry} index={index} />
      ))}
    </div>
  );
}

export function ExperienceSection() {
  const t = useTranslations("Experience");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const hasExperience = EXPERIENCE.length > 0;

  const stats = useMemo(() => {
    const counts = new Map<string, number>();
    PROJECTS.forEach((p) =>
      p.technologies.forEach((tech) => counts.set(tech, (counts.get(tech) ?? 0) + 1))
    );

    const top = [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6);

    const items = [
      { key: "projects", value: PROJECTS.length },
      { key: "technologies", value: counts.size },
      { key: "demos", value: PROJECTS.filter((p) => p.demoUrl).length },
    ].filter((item) => item.value > 0);

    return { items, top, max: top[0]?.[1] ?? 1 };
  }, []);

  const barVariants = (i: number) => ({
    hidden: { scaleX: shouldReduceMotion ? 1 : 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.9, delay: 0.4 + i * 0.08, ease: EASE },
    },
  });


  return (
    <motion.section
      id="experience"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative isolate flex w-full flex-col sm:items-center px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21 scroll-mt-6" >
        <SectionBackground gridOpacity={0.03} fadeColor="var(--surface)" />

        <div className="relative sm:w-[85vw] qhd:w-[75vw] flex flex-col gap-8">
          <SectionTitle>{t("title")}</SectionTitle>

          {hasExperience ? (
            <ExperienceList />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
              <motion.div variants={fadeUpVariant} className="flex flex-col items-start gap-5">
                <p className="text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl xl:text-3xl">
                  {t("text1")}
                </p>

                <p className="max-w-xl text-xs leading-relaxed text-foreground-secondary md:text-sm xl:text-base">
                  {t("text2")}
                </p>

                <a
                  href="#projects"
                  className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent-primary"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    {t("empty.cta")}
                  </span>
                  <ArrowDown
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>
              </motion.div>

              {stats.items.length > 0 && (
                <motion.div
                  variants={fadeUpVariant}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-lg"
                >
                  <dl
                    className="grid divide-x divide-white/10 border-b border-white/10"
                    style={{ gridTemplateColumns: `repeat(${stats.items.length}, minmax(0, 1fr))` }}
                  >
                    {stats.items.map(({ key, value }) => (
                      <div key={key} className="flex flex-col gap-1 p-4 sm:p-5">
                        <dd className="order-first text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
                          <CountUp to={value} />
                        </dd>
                        <dt className="text-xs text-foreground-secondary">
                          {t(`empty.${key}`)}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  <div className="p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-widest text-foreground-secondary">
                      {t("empty.topTech")}
                    </p>

                    <ul className="mt-4 flex flex-col gap-3">
                      {stats.top.map(([tech, count], i) => (
                        <li
                          key={tech}
                          className="grid grid-cols-[6.5rem_minmax(0,1fr)_1.25rem] items-center gap-3 text-xs sm:text-sm"
                        >
                          <span className="truncate text-foreground">{tech}</span>

                          <span className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                            <motion.span
                              variants={barVariants(i)}
                              style={{ width: `${(count / stats.max) * 100}%` }}
                              className="block h-full origin-left rounded-full bg-accent-primary"
                            />
                          </span>

                          <span className="text-right tabular-nums text-foreground-secondary">
                            {count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
    </motion.section>
  );
}