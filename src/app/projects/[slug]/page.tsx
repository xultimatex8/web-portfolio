import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) notFound();

  const filePath = path.join(process.cwd(), "src/app/content/projects", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data: frontmatter } = matter(fileContent);

  return (
    <article className="max-w-4xl mx-auto px-5 py-20">
      <h1 className="text-6xl font-bold tracking-tight text-foreground mb-4">
        {project.title}
      </h1>
      <p className="text-xl text-foreground-secondary mb-8">
        {project.description}
      </p>

      <div className="flex gap-3 mb-10">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-3 py-1 rounded-full bg-accent-secondary/15 text-accent-secondary text-sm">
            {tech}
          </span>
        ))}
      </div>

      {frontmatter.repoUrl && (
        <a href={frontmatter.repoUrl} className="text-accent-primary underline">
          View code
        </a>
      )}

      <div className="prose prose-lg text-foreground mt-10">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}