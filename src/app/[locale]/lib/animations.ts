import type { Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function revealUp(reduce: boolean | null): Variants {
  return {
    hidden: { y: reduce ? 0 : "110%" },
    visible: { y: 0, transition: { duration: reduce ? 0 : 0.8, ease: EASE } },
  };
}

export function stagger(step = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };
}