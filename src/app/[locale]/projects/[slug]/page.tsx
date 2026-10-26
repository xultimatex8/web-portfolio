import fs from "fs";
import path from "path";
import { isValidElement, type ReactNode } from "react";
import matter from "gray-matter";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/app/[locale]/data/projects";
import { notFound } from "next/navigation";
import { TECHNOLOGY_ICONS } from "@/app/[locale]/types/project";
import {
  CATEGORY_STYLES,
  STATUS_STYLES,
} from "@/app/[locale]/helpers/projectStyles";
import { ScrollToTop } from "@/app/[locale]/components/ScrollToTop";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { SectionBackground } from "../../components/SectionBackground";
import { TableOfContents } from "../../components/TableOfContents";
import { Reveal } from "../../components/Reveal";

type PageParams = {
  locale: (typeof routing.locales)[number];
  slug: string;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({
      locale,
      slug: project.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};

  const projectData = await getTranslations({ locale, namespace: "ProjectData" });

  return {
    title: `${projectData(`${project.id}.title`)} | Alejandro González Macías`,
    description: projectData(`${project.id}.description`),
  };
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const toText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement(node)) {
    return toText((node.props as { children?: ReactNode }).children);
  }
  return "";
};

const extractHeadings = (content: string) => {
  const headings: { level: number; text: string; id: string }[] = [];
  let inCode = false;

  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{1,3})\s+(.+?)\s*$/);
    if (!match) continue;

    const text = match[2].replace(/[`*]/g, "").trim();
    headings.push({ level: match[1].length, text, id: slugify(text) });
  }

  return headings;
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;

  const t = await getTranslations("Project");
  const projectData = await getTranslations("ProjectData");

  const projectIndex = PROJECTS.findIndex((p) => p.id === slug);
  if (projectIndex === -1) notFound();

  const project = PROJECTS[projectIndex];
  const title = projectData(`${project.id}.title`);

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

  if (!fs.existsSync(filePath)) notFound();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);
  const headings = extractHeadings(content);

  const hasSiblings = PROJECTS.length > 1;
  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const components = {
    h1: ({ children }: { children?: ReactNode }) => (
      <h1
        id={slugify(toText(children))}
        className="mb-4 text-2xl lg:text-3xl font-bold tracking-tight"
      >
        {children}
      </h1>
    ),

    h2: ({ children }: { children?: ReactNode }) => (
      <h2
        id={slugify(toText(children))}
        className="mb-2.5 text-lg lg:text-xl font-semibold tracking-tight"
      >
        {children}
      </h2>
    ),

    h3: ({ children }: { children?: ReactNode }) => (
      <h3
        id={slugify(toText(children))}
        className="mb-2 text-base lg:text-lg font-semibold"
      >
        {children}
      </h3>
    ),
  };

  const siblingCard =
    "group flex items-center gap-4 rounded-xl border border-white/10 bg-card p-4 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-xl";

  return (
    <article className="relative isolate flex w-full flex-col items-center gap-8 overflow-x-clip pb-10 pt-4 lg:gap-10 lg:px-15 lg:py-8">
      <SectionBackground />
      <ScrollToTop />

      <div className="flex w-[83.5vw] flex-col items-start justify-start gap-4 sm:w-[85vw]">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            />
            {t("back")}
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="w-full">
          <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
              {title}
              <span className="mt-2 block h-1 w-12 rounded-full bg-accent-primary" />
            </h1>

            <div className="flex items-center gap-2 text-xs lg:text-sm">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-3 py-2 font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary"
                >
                  <i aria-hidden="true" className="devicon-github-original text-base" />
                  {t("viewCode")}
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-3 py-2 font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  {t("viewDemo")}
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <div className="flex w-full flex-col items-start justify-start gap-5 lg:gap-6 2xl:flex-row">
          <Reveal delay={0.1} className="w-full 2xl:w-2/3">
            <Image
              src={project.image}
              alt={title}
              width={1500}
              height={350}
              priority
              sizes="(max-width: 1536px) 85vw, 56vw"
              className="h-auto w-full rounded-xl border-2 border-surface object-cover shadow-lg"
            />
          </Reveal>

          <Reveal delay={0.2} className="w-full flex-1">
            <div className="flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                  {t.rich("summary", {
                    highlight: (chunks) => (
                      <span className="text-accent-primary">{chunks}</span>
                    ),
                  })}
                </h2>

                <p className="text-sm leading-relaxed text-foreground-secondary lg:text-base">
                  {projectData(`${project.id}.description`)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white">
                <span className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 ${status.backgroundColor}`}>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                  {status.label}
                </span>

                <span className={`rounded-sm border border-white/20 px-2.5 py-1.5 ${category.backgroundColor}`}>
                  {category.label}
                </span>
              </div>

              <div className="relative mt-3 w-full overflow-hidden md:mt-6">
                <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                    {t.rich("techStack", {
                      highlight: (chunks) => (
                        <span className="text-accent-primary">{chunks}</span>
                      ),
                    })}
                  </h2>
                </div>

                <div className="relative z-10 grid w-full grid-cols-2 gap-2">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="group flex items-center gap-3 rounded-xl border-2 border-surface bg-card px-2 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary/40 lg:px-3 lg:py-2.5 2xl:px-1.5 2xl:py-1 fhd:px-3 fhd:py-2.5"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
                        <i
                          aria-hidden="true"
                          className={`${TECHNOLOGY_ICONS[tech]} text-xl text-foreground transition-all duration-200 group-hover:scale-110 group-hover:text-accent-primary`}
                        />
                      </div>

                      <span className="truncate font-mono text-xs font-medium text-foreground-secondary transition-colors duration-200 group-hover:text-foreground lg:text-sm 2xl:text-xs fhd:text-sm">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-4 flex w-[83.5vw] flex-col items-start justify-start gap-6 sm:w-[85vw] md:flex-row lg:mt-8 lg:gap-8">
        <aside className="hidden w-full shrink-0 md:sticky md:top-24 md:flex md:w-48 2xl:w-56">
          <TableOfContents title={t("onThisPage")} headings={headings} />
        </aside>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
          {headings.length > 0 && (
            <details className="group/toc w-full rounded-xl border border-white/10 bg-card px-4 py-3 md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {t("onThisPage")}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-open/toc:rotate-180"
                />
              </summary>

              <ul className="mt-3 flex flex-col border-t border-white/10 pt-2">
                {headings.map((heading) => (
                  <li key={heading.id} style={{ paddingLeft: (heading.level - 1) * 14 }}>
                    <a
                      href={`#${heading.id}`}
                      className="block py-1.5 text-sm text-foreground-secondary transition-colors hover:text-accent-primary"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <Reveal>
            <div
              className="
                prose
                prose-sm
                lg:prose-base
                max-w-none
                w-full

                prose-headings:text-foreground
                prose-p:text-foreground-secondary
                prose-strong:text-foreground
                prose-a:text-accent-primary
                prose-a:no-underline
                hover:prose-a:underline
                prose-li:text-foreground-secondary
                prose-li:marker:text-accent-primary
                prose-blockquote:text-foreground-secondary
                prose-blockquote:border-accent-primary
                prose-code:rounded
                prose-code:bg-foreground/10
                prose-code:px-1.5
                prose-code:py-0.5
                prose-code:font-medium
                prose-code:text-accent-primary
                prose-code:before:content-none
                prose-code:after:content-none
                prose-pre:rounded-xl
                prose-pre:border
                prose-pre:border-white/10
                prose-pre:bg-card
                prose-img:rounded-xl
                prose-hr:border-foreground/10
              "
            >
              <MDXRemote source={content} components={components} />
            </div>
          </Reveal>
        </div>
      </div>

      {hasSiblings && (
        <Reveal className="mt-8 w-[83.5vw] sm:w-[85vw]">
          <nav
            aria-label={t("moreProjects")}
            className="grid grid-cols-1 gap-3 border-t border-foreground/10 pt-8 sm:grid-cols-2 sm:gap-4"
          >
            <Link href={`/projects/${prevProject.id}`} className={siblingCard}>
              <ArrowLeft
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-primary transition-transform duration-300 group-hover:-translate-x-1"
              />
              <div className="min-w-0">
                <span className="block text-xs uppercase tracking-widest text-foreground-secondary">
                  {t("previous")}
                </span>
                <span className="mt-1 block truncate font-semibold text-foreground">
                  {projectData(`${prevProject.id}.title`)}
                </span>
              </div>
            </Link>

            <Link href={`/projects/${nextProject.id}`} className={`${siblingCard} justify-end text-right`}>
              <div className="min-w-0">
                <span className="block text-xs uppercase tracking-widest text-foreground-secondary">
                  {t("next")}
                </span>
                <span className="mt-1 block truncate font-semibold text-foreground">
                  {projectData(`${nextProject.id}.title`)}
                </span>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-primary transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </nav>
        </Reveal>
      )}
    </article>
  );
}