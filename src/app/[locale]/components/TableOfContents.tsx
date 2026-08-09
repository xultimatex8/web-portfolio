"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  title: string;
  headings: Heading[];
}

export function TableOfContents({ title, headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const link = linkRefs.current[activeId];
    if (!link) return;

    const navTop = navRef.current.getBoundingClientRect().top;
    const linkRect = link.getBoundingClientRect();

    setIndicator({
      top: linkRect.top - navTop,
      height: linkRect.height,
    });
  }, [activeId]);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-secondary">
        {title}
      </span>

      <nav ref={navRef} className="relative flex flex-col">
        <motion.span
          className="absolute left-0 w-0.5 rounded-full bg-accent-primary"
          animate={{ top: indicator.top, height: indicator.height }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />

        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <a
              key={heading.id}
              ref={(el) => {
                linkRefs.current[heading.id] = el;
              }}
              href={`#${heading.id}`}
              className={`border-l border-transparent py-1.5 pl-4 leading-snug transition-colors duration-200 ${
                heading.level === 1
                  ? "text-base font-semibold"
                  : heading.level === 2
                    ? "text-sm font-normal"
                    : "text-xs font-light"
              } ${
                isActive
                  ? "text-foreground"
                  : "text-foreground-secondary/70 hover:text-foreground-secondary"
              }`}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}