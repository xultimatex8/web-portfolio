"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ExternalLink, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Project } from "@/app/[locale]/types/project";
import { Badge } from "./Badge";
import {
  STATUS_STYLES,
  CATEGORY_STYLES,
} from "@/app/[locale]/helpers/projectStyles";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("ProjectData");
  const tCommon = useTranslations("Projects");

  const [isLoading, setIsLoading] = useState(false);

  const title = t(`${project.id}.title`);
  const description = t(`${project.id}.description`);

  const status = STATUS_STYLES[project.status];
  const category = CATEGORY_STYLES[project.category];


  return (
    <article
      className="group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg transition-[scale,border-color,box-shadow] duration-300 ease-out hover:z-10 hover:scale-[1.04] hover:border-white/20 hover:shadow-2xl"
    >
      <Link
        href={`/projects/${project.id}`}
        title={title}
        onNavigate={() => setIsLoading(true)}
        aria-disabled={isLoading}
        className={`group block ${isLoading ? "cursor-default" : "cursor-pointer"}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-102 ${
              isLoading ? "opacity-70" : "opacity-100"
            }`}
          />

          {!isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="translate-y-3 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0 lg:text-base">
                {tCommon("viewDetails")} - {title}
              </span>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <LoaderCircle aria-hidden="true" className="h-6 w-6 animate-spin" />
            </div>
          )}

          <div
            className={`absolute bottom-3 left-3 z-20 flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-1 ${
              isLoading ? "opacity-70" : "opacity-100"
            }`}
          >
            <span
              className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1.25 text-[0.65rem] font-semibold text-white ${status.backgroundColor}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {status.label}
            </span>

            <span
              className={`rounded-sm border border-white/20 bg-black/65 px-2 py-1 text-[0.65rem] font-medium text-white ${category.backgroundColor}`}
            >
              {category.label}
            </span>
          </div>
        </div>
      </Link>

      <div className={`flex flex-1 flex-col p-4 ${isLoading ? "opacity-70" : "opacity-100"}`}>
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.id}`}
            className={`min-w-0 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent-primary lg:text-base ${isLoading ? "cursor-default" : "cursor-pointer"}`}
          >
            {title}
          </Link>

          <div className="relative z-50 flex shrink-0 items-center gap-1.5">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tCommon("viewCode")}
                title={tCommon("viewCode")}
                className="relative top-0.5 text-foreground-secondary transition-all duration-200 hover:-rotate-12 hover:scale-125 hover:text-foreground"
              >
                <i
                  aria-hidden="true"
                  className="devicon-github-original text-[15px]"
                />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tCommon("viewDemo")}
                title={tCommon("viewDemo")}
                className="text-foreground-secondary transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:scale-110 hover:text-foreground"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <p className="mt-1.5 text-xs leading-relaxed text-foreground-secondary lg:text-sm">
          {description}
        </p>

        <Link
          href={`/projects/${project.id}`}
          onNavigate={() => setIsLoading(true)}
          className="group/link mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-accent-primary lg:hidden"
        >
          {tCommon("viewDetails")}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-1.5">
          {project.technologies.map((technology) => (
            <Badge
              key={technology}
              label={technology}
              textSize="text-[0.6rem]"
            />
          ))}
        </div>
      </div>
    </article>
  );
}