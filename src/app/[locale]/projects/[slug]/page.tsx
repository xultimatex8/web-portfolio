import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PROJECTS } from "@/app/[locale]/data/projects";
import { notFound } from "next/navigation";
import { TECHNOLOGY_ICONS } from "@/app/[locale]/types/project";
import {
  CATEGORY_STYLES,
  STATUS_STYLES,
} from "@/app/[locale]/helpers/projectStyles";
import { ScrollToTop } from "@/app/[locale]/components/ScrollToTop";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SectionBackground } from "../../components/SectionBackground";
import { TableOfContents } from "../../components/TableOfContents";

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
        className="mb-4 text-2xl lg:text-3xl font-bold tracking-tight"
      >
        {children}
      </h1>
    ),

    h2: ({ children }: { children: string }) => (
      <h2
        id={slugify(children)}
        className="mb-2.5 text-lg lg:text-xl font-semibold tracking-tight"
      >
        {children}
      </h2>
    ),

    h3: ({ children }: { children: string }) => (
      <h3
        id={slugify(children)}
        className="mb-2 text-base lg:text-lg font-semibold"
      >
        {children}
      </h3>
    ),
  };

  return (
    <article className="relative w-full lg:px-15 pt-2 pb-8 lg:py-14 flex flex-col items-center gap-8 lg:gap-10">
      <SectionBackground />
      <ScrollToTop />

      <div className="w-[83.5vw] sm:w-[85vw] flex flex-col items-start justify-start gap-4">
        <div className="w-full flex flex-col md:flex-row items-start md:justify-between gap-3">
          <div className="flex flex-col items-start gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
              {projectData(`${project.id}.title`)}
              <span className="mt-2 block h-1 w-12 rounded-full bg-accent-primary" />
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs lg:text-sm">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-border text-foreground font-semibold hover:border-accent-primary transition-colors"
              >
                {t("viewCode")}
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-accent-primary text-background font-semibold hover:opacity-90 transition-opacity"
              >
                {t("viewDemo")}
              </a>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row items-start justify-start gap-5 lg:gap-6">
          <Image
            src={project.image}
            alt={projectData(`${project.id}.title`)}
            width={1500}
            height={350}
            className="w-full 2xl:w-2/3 h-auto rounded-xl object-cover border-2 border-surface shadow-sm"
          />

          <div className="flex-1 flex flex-col items-start justify-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-xl lg:text-2xl font-semibold tracking-tight text-foreground">
                {t.rich("summary", {
                  highlight: (chunks) => (
                    <span className="text-accent-primary">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-sm lg:text-base text-foreground-secondary leading-relaxed">
                {projectData(`${project.id}.description`)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className={`rounded-sm bg-linear-to-b from-white/35 via-white/5 to-black/20 px-2.5 py-1.5 shadow-sm ${status.backgroundColor}
                `}
              >
                {status.label}
              </span>

              <span
                className={`rounded-sm bg-linear-to-b from-white/35 via-white/5 to-black/20 px-2.5 py-1.5 shadow-sm ${category.backgroundColor}`}
              >
                {category.label}
              </span>
            </div>

            <div className="mt-3 md:mt-6 relative w-full overflow-hidden">
              <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                  {t.rich("techStack", {
                    highlight: (chunks) => (
                      <span className="text-accent-primary">{chunks}</span>
                    ),
                  })}
                </h2>
              </div>

              <div className="relative z-10 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="group flex items-center gap-3 rounded-xl border-2 border-surface bg-card px-1.5 py-1 md:px-2 md:py-1.5 lg:px-3 lg:py-2.5 2xl:px-1.5 2xl:py-1 fhd:px-3 fhd:py-2.5 transition-all duration-200 hover:border-accent-primary/30 hover:bg-card/80"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
                      <i
                        className={`${TECHNOLOGY_ICONS[tech]} text-xl text-foreground transition-colors duration-200 group-hover:text-accent-primary`}
                      />
                    </div>

                    <span className="truncate text-xs lg:text-sm 2xl:text-xs  fhd:text-sm font-medium font-mono text-foreground-secondary transition-colors duration-200 group-hover:text-foreground">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[83.5vw] sm:w-[85vw] flex flex-col md:flex-row items-start justify-start gap-6 lg:gap-8 mt-8">
        <aside className="hidden md:flex w-full md:w-48 2xl:w-56 md:sticky md:top-24 shrink-0">
          <TableOfContents title={t("onThisPage")} headings={headings} />
        </aside>

        <div
          className="
            prose
            prose-sm
            lg:prose-base
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
