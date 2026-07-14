export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full py-10 lg:py-20 fhd:py-30 flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-20 px-6 md:px-15"
    >
      <h1 className="w-full lg:w-xs 2xl:w-68 fhd:w-xs text-3xl md:text-4xl 2xl:text-5xl fhd:text-6xl font-bold tracking-tight text-foreground lg:sticky lg:top-30">
        Experience
      </h1>

      {/* Update this section with actual experience items using the Timeline component when any experience is acquired */}

      <div className="max-w-4xl flex flex-col items-start justify-center gap-4">
        <p className="text-base md:text-lg lg:text-xl 2xl:text-2xl text-foreground">
          I&apos;m about to graduate and currently looking for my first professional
          opportunity in Software Engineering.
        </p>
        <p className="text-sm lg:text-base 2xl:text-lg text-foreground-secondary">
          While I don&apos;t have formal work experience yet, I&apos;ve built a solid
          technical foundation through the personal and academic projects showcased
          below — feel free to check them out.
        </p>
      </div>
    </section>
  );
}