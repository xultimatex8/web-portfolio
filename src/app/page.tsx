"use client";

import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { HomeSection } from "./components/sections/HomeSection";
import { EducationSection } from "./components/sections/EducationSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-background font-sans">
      <HomeSection />

      <EducationSection />

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
