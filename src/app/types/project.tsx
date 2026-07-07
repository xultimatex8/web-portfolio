export const TECHNOLOGY_ICONS = {
  TypeScript: "devicon-typescript-plain colored",
  "Next.js": "devicon-nextjs-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
} as const;

export type Technology = keyof typeof TECHNOLOGY_ICONS;

export type ProjectStatus = "done" | "in-progress";
export type ProjectCategory = "personal" | "academic" | "professional";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  category: ProjectCategory;
  technologies: Technology[];
}