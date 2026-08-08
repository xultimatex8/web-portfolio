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
      className="relative w-full py-10 lg:py-16 bg-surface flex flex-col gap-6 px-5 md:px-15"
    >
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-sm bg-accent-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
      </div>

      <Timeline items={EDUCATION_ITEMS} />
    </section>
  );
}