import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PROJECTS } from "@/app/[locale]/data/projects";
import { notFound } from "next/navigation";
import { TECHNOLOGY_ICONS } from "@/app/[locale]/types/project";
import { CATEGORY_STYLES, STATUS_STYLES } from "@/app/[locale]/helpers/projectStyles";
import { Badge } from "@/app/[locale]/components/Badge";
import { ScrollToTop } from "@/app/[locale]/components/ScrollToTop";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({
      locale,
      slug: project.id,
    }))
  );
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const extractHeadings = (content: string) =>
  content
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)![0].length;
      const text = line.replace(/^#{1,3}\s/, "");

      return {
        level,
        text,
        id: slugify(text),
      };
    });

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
  locale: (typeof routing.locales)[number];
  slug: string;
}>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("Project");
  const projectData = await getTranslations("ProjectData");
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) notFound();

  const status = STATUS_STYLES[project.status];
  const category = CATEGORY_STYLES[project.category];

  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "content",
    locale,
    "projects",
    `${slug}.mdx`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);
  const headings = extractHeadings(content);

  const components = {
    h1: ({ children }: { children: string }) => (
      <h1
        id={slugify(children)}
        className="mb-2 text-2xl lg:text-3xl 2xl:text-4xl fhd:text-5xl font-bold tracking-tight"
      >
        {children}
      </h1>
    ),

    h2: ({ children }: { children: string }) => (
      <h2
        id={slugify(children)}
        className="mb-3 text-xl lg:text-2xl 2xl:text-3xl fhd:text-4xl font-semibold tracking-tight"
      >
        {children}
      </h2>
    ),

    h3: ({ children }: { children: string }) => (
      <h3
        id={slugify(children)}
        className="mb-3 text-lg lg:text-xl 2xl:text-2xl fhd:text-3xl font-semibold"
      >
        {children}
      </h3>
    ),
  };

  return (
    <article className="relative w-full px-6 lg:px-15 pt-2 pb-8 lg:py-8 flex flex-col items-start justify-start gap-8 lg:gap-10">
      <ScrollToTop />
      <div className="w-full flex flex-col items-start justify-start gap-5">
        <div className="w-full flex flex-col md:flex-row items-start md:justify-between gap-4">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-4xl 2xl:text-5xl fhd:text-6xl qhd:text-7xl font-bold tracking-tight text-foreground">
              {projectData(`${project.id}.title`)}
            </h1>

            <div className="flex items-center gap-2">
              <Badge
                label={status.label}
                backgroundColor={status.backgroundColor}
                textSize="text-xs 2xl:text-sm"
              />
              <Badge
                label={category.label}
                backgroundColor={category.backgroundColor}
                textSize="text-xs 2xl:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4 text-sm 2xl:text-base fhd:text-lg">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 fhd:px-5 py-2 fhd:py-3 rounded-2xl border-2 border-border text-foreground font-semibold hover:border-accent-primary transition-colors"
              >
                {t("viewCode")}
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 fhd:px-5 py-2 fhd:py-3 rounded-2xl bg-accent-primary text-background font-semibold hover:opacity-90 transition-opacity"
              >
                {t("viewDemo")}
              </a>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row items-start justify-start gap-6 lg:gap-8">
          <Image
            src={project.image}
            alt={projectData(`${project.id}.title`)}
            width={1500}
            height={350}
            className="w-full 2xl:w-3/5 qhd:w-2/3 h-auto rounded-2xl object-cover border-6 border-surface shadow-sm"
          />

          <div className="flex-1 flex flex-col items-start justify-start gap-5 fhd:gap-10">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-2xl lg:text-3xl 2xl:text-4xl qhd:text-5xl font-semibold tracking-tight text-foreground">
                {t.rich("summary", {
                  highlight: (chunks) => (
                    <span className="text-accent-primary">{chunks}</span>
                  )
                })}
              </h1>
              <p className="text-base lg:text-lg 2xl:text-xl qhd:text-2xl text-foreground-secondary">
                {projectData(`${project.id}.description`)}
              </p>
            </div>

            <div className="w-full p-4 lg:p-4.5 fhd:p-6 flex flex-col items-start justify-start gap-4 bg-surface rounded-2xl">
              <h1 className="text-2xl lg:text-3xl 2xl:text-4xl qhd:text-5xl font-semibold tracking-tight text-foreground">
                {t.rich("techStack", {
                  highlight: (chunks) => (
                    <span className="text-accent-primary">{chunks}</span>
                  )
                })}
              </h1>
              <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-4 fhd:grid-cols-5 gap-2 lg:gap-2.5 w-full">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex flex-col items-center justify-center gap-2 pt-4 pb-2 rounded-xl bg-card"
                  >
                    <i className={`${TECHNOLOGY_ICONS[tech]} text-3xl lg:text-4xl qhd:text-5xl text-foreground`} />
                    <span className="text-center text-xs lg:text-sm qhd:text-base font-mono text-foreground-secondary">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start justify-start gap-8 lg:gap-12">
        <aside className="w-full md:w-46 2xl:w-56 fhd:w-72 md:sticky md:top-28 shrink-0">
          <div className="rounded-2xl bg-surface p-5 lg:p-6">
            <h2 className="mb-5 text-lg 2xl:text-xl fhd:text-2xl font-semibold tracking-tight">
              {t("onThisPage")}
            </h2>

            <nav className="flex flex-col gap-3">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`text-sm fhd:text-base transition-colors hover:text-accent-primary ${
                    heading.level === 1
                      ? "font-semibold text-foreground"
                      : heading.level === 2
                      ? "pl-4 text-foreground-secondary"
                      : "pl-8 text-xs fhd:text-sm text-foreground-secondary"
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div
          className="
            prose
            prose-base
            lg:prose-lg
            max-w-none
            flex-1
            w-full

            prose-headings:text-foreground
            prose-p:text-foreground-secondary
            prose-strong:text-foreground
            prose-a:text-accent-primary
            prose-li:text-foreground-secondary
            prose-blockquote:text-foreground-secondary
            prose-code:text-accent-primary
          "
        >
          <MDXRemote source={content} components={components} />
        </div>
      </div>
    </article>
  );
}