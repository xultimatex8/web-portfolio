"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

function Word({
  word,
  index,
  total,
  progress,
  reduce,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = (index / total) * 0.85;
  const opacity = useTransform(progress, [start, start + 0.15], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className="mr-[0.25em] inline-block"
    >
      {word}
    </motion.span>
  );
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </p>
  );
}