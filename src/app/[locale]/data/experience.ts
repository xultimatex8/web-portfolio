import type { Technology } from "@/app/[locale]/types/project";

export interface ExperienceEntry {
  id: string;
  period: string;
  company: string;
  location?: string;
  companyUrl?: string;
  technologies?: Technology[];
}

/**
 * Empty -> the section displays the "no experience" mode.
 * With entries -> displays the experience timeline.
 *
 * Example (uncomment and add the translations from setup/experience-messages-example.json):
 *
 * export const EXPERIENCE: ExperienceEntry[] = [
 *   {
 *     id: "acme",
 *     period: "2025 - Now",
 *     company: "Acme Corp",
 *     location: "Sevilla",
 *     companyUrl: "https://acme.example",
 *     technologies: ["React", "TypeScript"],
 *   },
 * ];
 */
export const EXPERIENCE: ExperienceEntry[] = [];