"use client";

import { Mail, FileDown, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionBackground } from "../SectionBackground";
import { SectionTitle } from "../SectionTitle";
import { staggerContainer, fadeUp } from "../../lib/motion";

export function ContactSection() {
  const t = useTranslations("Contact");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 60,
      scale: shouldReduceMotion ? 1 : 0.92,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 90, damping: 14, delay: 0.25 + i * 0.1 },
    }),
  };

  const CARDS = [
    {
      label: "Email",
      value: "alegonzmac@gmail.com",
      href: "mailto:alegonzmac@gmail.com",
      icon: Mail,
      color: "text-blue-400",
      fan: "lg:-rotate-6 lg:z-10",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/alejandro-gonzalez-macias-agm",
      href: "https://linkedin.com/in/alejandro-gonzalez-macias-agm",
      icon: FaLinkedin,
      color: "text-sky-400",
      fan: "lg:-rotate-2 lg:-ml-10 lg:mt-6 lg:z-20",
    },
    {
      label: "GitHub",
      value: "github.com/xultimatex8",
      href: "https://github.com/xultimatex8",
      icon: FaGithub,
      color: "text-purple-400",
      fan: "lg:rotate-2 lg:-ml-10 lg:mt-6 lg:z-30",
    },
  ];

  const cardBase = `
    group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4
    overflow-hidden rounded-2xl p-4 shadow-lg
    active:scale-[0.98]
    transition-[translate,rotate,scale,box-shadow,border-color] duration-500
    hover:-translate-y-1 lg:hover:-translate-y-3 lg:hover:rotate-0!
    hover:shadow-2xl
    sm:min-h-40 sm:grid-cols-[minmax(0,1fr)_auto] sm:grid-rows-[auto_1fr]
    sm:items-start sm:rounded-3xl sm:p-6 sm:shadow-xl
    lg:min-h-54 lg:w-60 lg:shrink-0 xl:w-64 2xl:min-h-60
  `;

  return (
    <motion.section
      id="contact"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative isolate flex w-full flex-col sm:items-center gap-6 px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21 scroll-mt-6">
        <SectionBackground />

        <div className="relative w-full sm:w-[85vw] qhd:w-[75vw] flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col items-start gap-2">
            <SectionTitle as="h1">{t("title")}</SectionTitle>

            <motion.p
              variants={fadeUpVariant}
              className="mt-2 max-w-xl text-sm leading-relaxed text-foreground-secondary sm:mt-4 sm:text-base md:text-lg"
            >
              {t("intro")}
            </motion.p>
          </div>

          <div className="relative lg:mx-auto">
            <div className="relative flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:items-center">
                {CARDS.map(({ label, value, href, icon: Icon, color, fan }, index) => {
                  const external = href.startsWith("http");

                  return (
                    <motion.a
                      key={label}
                      custom={index}
                      variants={cardVariants}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${label}: ${value}`}
                      className={`${cardBase} border border-white/10 bg-card hover:border-white/20 ${fan}`}
                    >
                      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

                      <Icon
                        aria-hidden="true"
                        className={`relative h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6 sm:col-start-1 sm:row-start-1 sm:h-9 sm:w-9 ${color}`}
                      />

                      <div className="relative min-w-0 sm:col-span-2 sm:row-start-2 sm:mt-2 sm:self-end">
                        <span className="block text-xs uppercase tracking-widest text-foreground-secondary">
                          {label}
                        </span>

                        <span className="mt-1 block text-sm font-medium text-foreground transition-colors wrap-anywhere group-hover:text-accent-primary sm:mt-2 sm:text-sm">
                          {value}
                        </span>
                      </div>

                      <ArrowUpRight
                        aria-hidden="true"
                        className="relative h-4 w-4 text-foreground-secondary opacity-70 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 sm:col-start-2 sm:row-start-1 lg:opacity-0"
                      />

                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-primary transition-all duration-500 group-hover:w-full" />
                    </motion.a>
                  );
                })}

              <motion.a
                custom={CARDS.length}
                variants={cardVariants}
                href={t("cvUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardBase} bg-accent-primary text-background lg:rotate-6 lg:-ml-10 lg:mt-6 lg:z-40`}
              >
                {!shouldReduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 -skew-x-12 bg-white/25"
                    animate={{ x: ["0%", "650%"] }}
                    transition={{
                      duration: 1.4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  />
                )}

                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-background/10 transition-transform duration-700 group-hover:scale-125" />

                <FileDown
                  aria-hidden="true"
                  className="relative h-6 w-6 transition-transform duration-300 group-hover:translate-y-1 sm:col-start-1 sm:row-start-1 sm:h-9 sm:w-9"
                />

                <div className="relative min-w-0 sm:col-span-2 sm:row-start-2 sm:mt-2 sm:self-end">
                  <span className="block text-xs uppercase tracking-widest opacity-70">
                    PDF
                  </span>

                  <span className="mt-1 block text-sm font-semibold sm:mt-2 sm:text-base">
                    {t("cv")}
                  </span>
                </div>

                <ArrowUpRight
                  aria-hidden="true"
                  className="relative h-4 w-4 opacity-70 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:col-start-2 sm:row-start-1"
                />

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-background transition-all duration-500 group-hover:w-full" />
              </motion.a>
            </div>
          </div>
        </div>
    </motion.section>
  );
}