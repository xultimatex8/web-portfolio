import {
  GraduationCap,
  School,
  BookOpenCheck,
  type LucideIcon,
} from "lucide-react";

export interface EducationEntry {
  id: string;
  start: string;
  end?: string;
  icon: LucideIcon;
}

export const EDUCATION: EducationEntry[] = [
  { id: "highSchool", start: "2020", end: "2022", icon: School },
  { id: "university", start: "2022", end: "2026", icon: GraduationCap },
  { id: "master", start: "2026", icon: BookOpenCheck },
];