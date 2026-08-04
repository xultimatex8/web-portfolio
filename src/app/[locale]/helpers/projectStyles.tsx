import { ProjectStatus, ProjectCategory } from "@/app/[locale]/types/project";

export const STATUS_STYLES: Record<ProjectStatus, { label: string; backgroundColor: string }> = {
  done: { label: "Completed", backgroundColor: "bg-done" },
  "in-progress": { label: "In progress", backgroundColor: "bg-progress" },
};

export const CATEGORY_STYLES: Record<ProjectCategory, { label: string; backgroundColor: string }> = {
  personal: { label: "Personal", backgroundColor: "bg-category" },
  academic: { label: "Academic", backgroundColor: "bg-category" },
  professional: { label: "Professional", backgroundColor: "bg-category" },
};