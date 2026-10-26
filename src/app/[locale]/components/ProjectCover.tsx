"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

interface ProjectCoverProps {
  src: string;
  alt: string;
}

export function ProjectCover({ src, alt }: ProjectCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <div
      ref={ref}
      className="relative h-48 max-h-[50svh] w-full overflow-hidden sm:h-72 lg:h-96"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-background/50 to-transparent"
      />
    </div>
  );
}