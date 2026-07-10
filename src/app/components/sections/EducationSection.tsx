import { Timeline } from "../Timeline";

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

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative w-full py-20 fhd:py-30 bg-surface flex items-start justify-start gap-20 px-15"
    >
      <h1 className="w-xs xl:w-56 lg:w-xs text-4xl fhd:text-6xl font-bold tracking-tight text-foreground sticky top-30">
        Education
      </h1>

      <Timeline items={EDUCATION_ITEMS} />
    </section>
  );
}