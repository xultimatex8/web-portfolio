import { getTranslations } from "next-intl/server";

export async function ExperienceSection() {
  const t = await getTranslations("Experience");

  return (
    <section
      id="experience"
      className="relative w-full py-10 lg:py-16 flex flex-col gap-6 px-5 md:px-15"
    >
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-sm bg-accent-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
      </div>

      {/* Update this section with actual experience items using the Timeline component when any experience is acquired */}

      <div className="max-w-2xl flex flex-col items-start justify-center gap-3">
        <p className="text-base md:text-lg text-foreground">
          {t("text1")}
        </p>
        <p className="text-sm md:text-base text-foreground-secondary">
          {t("text2")}
        </p>
      </div>
    </section>
  );
}