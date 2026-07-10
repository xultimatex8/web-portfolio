"use client";

import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { HomeSection } from "./components/sections/HomeSection";
import { EducationSection } from "./components/sections/EducationSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-background font-sans">
      <HomeSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
