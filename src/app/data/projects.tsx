import { Project } from "@/types/project";

  export const PROJECTS: Project[] = [
    {
      id: "lorem-ipsum",
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt vel sapien in rhoncus.",
      image: "/images/placeholder.svg",
      status: "in-progress",
      category: "personal",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
    },
  ];