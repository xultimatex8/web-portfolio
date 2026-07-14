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
      className="relative w-full py-10 lg:py-20 fhd:py-30 bg-surface flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-20 px-6 lg:px-15"
    >
      <h1 className="w-full lg:w-xs 2xl:w-68 fhd:w-xs text-3xl lg:text-4xl 2xl:text-5xl fhd:text-6xl font-bold tracking-tight text-foreground lg:sticky">
        Education
      </h1>

      <Timeline items={EDUCATION_ITEMS} />
    </section>
  );
}