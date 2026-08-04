import { ContactSection } from "./components/sections/ContactSection";
import { HomeSection } from "./components/sections/HomeSection";
import { EducationSection } from "./components/sections/EducationSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";

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
