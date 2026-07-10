"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Timeline } from "./components/Timeline";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { HomeSection } from "./components/sections/HomeSection";

export default function Home() {
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

  const EDUCATION_ITEMS = [
    {
      title: "Francisco Pacheco High School",
      subtitle: "Science track — 2020–2022",
    },
    {
      title: "University of Seville",
      subtitle: "Bachelor's in Software Engineering — 2022–2026",
    },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-background font-sans">
      <HomeSection />

      <section
        id="education"
        className="relative w-full py-30 bg-surface flex items-start justify-start gap-40 px-15"
      >
        <h1 className="w-xs text-7xl font-bold tracking-tight text-foreground sticky top-30">
          Education
        </h1>

        <Timeline items={EDUCATION_ITEMS} />
      </section>

      <section
        id="experience"
        className="relative w-full py-30 flex items-start justify-start gap-40 px-15"
      >
        <h1 className="w-xs text-7xl font-bold tracking-tight text-foreground sticky top-30">
          Experience
        </h1>

        {/* Update this section with actual experience items using the Timeline component when any experience is acquired */}

        <div className="max-w-4xl flex flex-col items-start justify-center gap-4">
          <p className="text-2xl text-foreground">
            I&apos;m about to graduate and currently looking for my first professional
            opportunity in Software Engineering.
          </p>
          <p className="text-xl text-foreground-secondary">
            While I don&apos;t have formal work experience yet, I&apos;ve built a solid
            technical foundation through the personal and academic projects showcased
            below — feel free to check them out.
          </p>
        </div>
      </section>

      <ProjectsSection />

      <ContactSection />
    </div>
  );
}
