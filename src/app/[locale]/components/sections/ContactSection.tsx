"use client";

import { Mail, FileDown, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { SectionBackground } from "../SectionBackground";
import { staggerContainer, fadeUp } from "../../lib/motion";

export function ContactSection() {
  const t = useTranslations("Contact");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

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

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="relative isolate flex w-full flex-col gap-6 px-5 py-10 md:px-15 lg:py-16">
        <SectionBackground />

        <motion.div variants={fadeUpVariant} className="flex flex-col items-start gap-2">
          <motion.div variants={fadeUpVariant} className="flex items-center gap-2">
            <span className="w-1 h-4 rounded-sm bg-accent-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {t("title")}
            </h1>
          </motion.div>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
            {t("intro")}
          </p>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="relative lg:mx-auto">
          <motion.div 
            variants={fadeUpVariant}
            className="relative flex flex-col gap-4 lg:flex-row lg:items-center">
              {CARDS.map(({ label, value, href, icon: Icon, color, fan }) => {
                const external = href.startsWith("http");

                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`
                      group relative flex min-h-40 lg:min-h-54 2xl:min-h-60 w-full
                      flex-col justify-between overflow-hidden
                      rounded-3xl border border-white/10
                      bg-card p-6 shadow-xl
                      transition-all duration-500
                      hover:-translate-y-3 hover:rotate-0!
                      hover:border-white/20
                      hover:shadow-2xl
                      lg:w-60 xl:w-64 lg:shrink-0
                      ${fan}
                    `}
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

                    <div className="relative flex items-start justify-between">
                      <div className={`rounded-xl border border-white/10 bg-white/3 p-3 ${color}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <ArrowUpRight
                        className="h-4 w-4 text-foreground-secondary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                      />
                    </div>

                    <div className="relative mt-2">
                      <span className="text-xs uppercase tracking-widest text-foreground-secondary">
                        {label}
                      </span>

                      <span className="mt-2 block text-xs sm:text-sm font-medium text-foreground transition-colors group-hover:text-accent-primary">
                        {value}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-primary transition-all duration-500 group-hover:w-full" />
                  </a>
                );
              })}

            <a
              href={t("cvUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative flex min-h-40 lg:min-h-54 2xl:min-h-60 w-full
                flex-col justify-between overflow-hidden
                rounded-3xl bg-accent-primary p-6
                text-background shadow-xl
                transition-all duration-500
                hover:-translate-y-3 hover:rotate-0!
                hover:shadow-2xl
                lg:w-60 xl:w-64 lg:shrink-0
                lg:rotate-6 lg:-ml-10 lg:mt-6 lg:z-40
              "
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-background/10 transition-transform duration-700 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div className="rounded-xl bg-background/10 p-3">
                  <FileDown className="h-5 w-5" />
                </div>

                <ArrowUpRight
                  className="h-4 w-4 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

              <div className="relative">
                <span className="text-xs uppercase tracking-widest opacity-70">
                  PDF
                </span>

                <span className="mt-2 block text-sm sm:text-base font-semibold">
                  {t("cv")}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-background transition-all duration-500 group-hover:w-full" />
            </a>
          </motion.div>
        </motion.div>
    </motion.section>
  );
}
