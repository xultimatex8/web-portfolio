import { useTranslations } from "next-intl";

import { Timeline } from "../Timeline";

export function EducationSection() {
  const t = useTranslations("Education");

  const EDUCATION_ITEMS = [
    {
      title: t("highSchool.title"),
      subtitle: t("highSchool.subtitle"),
    },
    {
      title: t("university.title"),
      subtitle: t("university.subtitle"),
    },
  ];

  return (
    <section
      id="education"
      className="relative w-full py-10 lg:py-20 fhd:py-30 bg-surface flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-20 px-6 md:px-15"
    >
      <h1 className="w-full lg:w-xs 2xl:w-68 fhd:w-xs text-3xl md:text-4xl 2xl:text-5xl fhd:text-6xl font-bold tracking-tight text-foreground lg:sticky lg:top-30">
        {t("title")}
      </h1>

      <Timeline items={EDUCATION_ITEMS} />
    </section>
  );
}