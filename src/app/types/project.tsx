export type ProjectStatus = "done" | "in-progress";
export type ProjectCategory = "personal" | "academic" | "professional";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  category: ProjectCategory;
  technologies: string[];
}