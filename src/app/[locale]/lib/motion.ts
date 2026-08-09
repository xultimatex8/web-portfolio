import type { Variants } from "motion/react";

export const fadeUp = (
  reduceMotion: boolean | null = false,
): Variants => ({
  hidden: {
    opacity: 0,
    y: reduceMotion ? 0 : 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      ease: [0.8, 1, 0.6, 1],
    },
  },
});

export const staggerContainer = (
  reduceMotion: boolean | null = false,
  stagger = 0.15,
): Variants => ({
  hidden: {},

  visible: {
    transition: {
      staggerChildren: reduceMotion ? 0 : stagger,
    },
  },
});
