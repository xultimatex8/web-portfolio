import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-1000 flex-1 items-center justify-start bg-background font-sans">
      <section id="home" className="relative py-30 flex flex-col items-center justify-between gap-40 px-5">
        <div className="flex items-center justify-start gap-15">
          <Image
            src="/images/photo.jpeg"
            alt="Alejandro González Macías"
            width={700}
            height={550}
            priority
            className="rounded-full object-cover border-6 border-surface"
          />

          <div className="relative max-w-350 flex flex-col items-start justify-center gap-8 text-start">
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-9xl font-bold tracking-tight text-foreground">
                Alejandro González Macías
              </h1>

              <h2 className="text-7xl font-medium tracking-tight text-foreground-secondary">
                Final-Year{" "}
                <span className="text-accent-primary">
                  Software Engineering
                </span>{" "}
                Student
              </h2>
            </div>
          </div>
        </div>

        <div className="relative max-w-450 px-15 pt-7 pb-10 rounded-t-[5rem] rounded-b-[4rem] bg-surface flex flex-col items-center justify-start gap-6 text-start">
          <h1 className="text-7xl font-bold tracking-tight text-foreground">
            About{" "}
            <span className="text-accent-primary">
              Me
            </span>{" "}
          </h1>

          <div className="-mt-2 text-xl flex flex-wrap gap-3">
            <span className="rounded-full bg-card px-4 py-2">📍 Sanlúcar de Barrameda</span>
            <span className="rounded-full bg-card px-4 py-2">🎓 University of Seville</span>
            <span className="rounded-full bg-card px-4 py-2">🌍 Spanish • English</span>
            <span className="rounded-full bg-card px-4 py-2">💼 Open to Work</span>
          </div>

          <div className="flex flex-col items-start justify-center gap-4 text-2xl text-foreground">
            <p>
              Hi! I&apos;m <strong>Alejandro González Macías</strong>, a final-year Software Engineering
              student at the University of Seville (Bachelor&apos;s Thesis pending defense), based in
              Sanlúcar de Barrameda, Spain. I love turning ideas into functional, maintainable, and
              scalable software, and I&apos;m always exploring new tools and technologies to keep growing
              as a developer.
            </p>
            <p>
              My studies gave me a solid foundation in software engineering, architecture, and
              problem-solving, both independently and in team projects using version control and agile
              practices. I&apos;m curious, adapt quickly to new environments, and I&apos;m proficient in
              English for technical and international work. I&apos;m currently looking for opportunities
              to keep growing and contribute to meaningful projects.
            </p>
            <p>
              Outside of code, I enjoy spending time with friends, working on personal projects, going to
              the gym, watching films, and playing video games.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
