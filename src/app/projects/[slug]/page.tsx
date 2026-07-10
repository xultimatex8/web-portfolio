import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import { TECHNOLOGY_ICONS } from "@/types/project";
import { CATEGORY_STYLES, STATUS_STYLES } from "@/helpers/projectStyles";
import { Badge } from "@/components/Badge";
import { ScrollToTop } from "@/components/ScrollToTop";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) notFound();

  const status = STATUS_STYLES[project.status];
  const category = CATEGORY_STYLES[project.category];

  const filePath = path.join(process.cwd(), "src/app/content/projects", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);
  const headings = extractHeadings(content);

  const components = {
    h1: ({ children }: { children: string }) => (
      <h1
        id={slugify(children)}
        className="mb-2 text-3xl fhd:text-5xl font-bold tracking-tight"
      >
        {children}
      </h1>
    ),

    h2: ({ children }: { children: string }) => (
      <h2
        id={slugify(children)}
        className="mb-3 text-2xl fhd:text-4xl font-semibold tracking-tight"
      >
        {children}
      </h2>
    ),

    h3: ({ children }: { children: string }) => (
      <h3
        id={slugify(children)}
        className="mb-3 text-xl fhd:text-3xl font-semibold"
      >
        {children}
      </h3>
    ),
  };

  return (
    <article className="relative w-full px-15 py-8 flex flex-col items-start justify-start gap-10">
      <ScrollToTop />
      <div className="w-full flex flex-col items-start justify-start gap-5">
        <div className="w-full flex items-start justify-between gap-8">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-4xl fhd:text-6xl qhd:text-7xl font-bold tracking-tight text-foreground">
              {project.title}
            </h1>

            <div className="flex items-center gap-2">
              <Badge
                label={status.label}
                backgroundColor={status.backgroundColor}
                textSize="text-xs fhd:text-sm"
              />
              <Badge
                label={category.label}
                backgroundColor={category.backgroundColor}
                textSize="text-xs fhd:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm fhd:text-lg">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 fhd:px-5 py-2 fhd:py-3 rounded-2xl border-2 border-border text-foreground font-semibold hover:border-accent-primary transition-colors"
              >
                View code
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 fhd:px-5 py-2 fhd:py-3 rounded-2xl bg-accent-primary text-background font-semibold hover:opacity-90 transition-opacity"
              >
                View demo
              </a>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col fhd:flex-row items-start justify-start gap-8">
          <Image
            src={project.image}
            alt={project.title}
            width={1500}
            height={350}
            className="w-full fhd:w-3/5 qhd:w-2/3 h-auto rounded-2xl object-cover border-6 border-surface shadow-sm"
          />

          <div className="flex-1 flex flex-col items-start justify-start gap-5 fhd:gap-10">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-3xl fhd:text-4xl qhd:text-5xl font-semibold tracking-tight text-foreground">
                Project <span className="text-accent-primary">Summary</span>
              </h1>
              <p className="text-lg fhd:text-xl qhd:text-2xl text-foreground-secondary">
                {project.description}
              </p>
            </div>

            <div className="w-full p-4.5 fhd:p-6 flex flex-col items-start justify-start gap-4 bg-surface rounded-2xl">
              <h1 className="text-3xl fhd:text-4xl qhd:text-5xl font-semibold tracking-tight text-foreground">
                Tech <span className="text-accent-primary">Stack</span>
              </h1>
              <div className="grid grid-cols-6 fhd:grid-cols-5 gap-2.5 w-full">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex flex-col items-center justify-center gap-2 pt-4 pb-2 rounded-xl bg-card"
                  >
                    <i className={`${TECHNOLOGY_ICONS[tech]} text-4xl qhd:text-5xl text-foreground`} />
                    <span className="text-center text-sm qhd:text-base font-mono text-foreground-secondary">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start justify-start gap-12">
        <aside className="sticky top-28 w-46 fhd:w-72 shrink-0">
          <div className="rounded-2xl bg-surface p-6">
            <h2 className="mb-5 text-lg fhd:text-2xl font-semibold tracking-tight">
              On this page
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
            prose-lg
            max-w-none
            flex-1

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