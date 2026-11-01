"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

/**
 * Drop-in replacement for <video> in MDX: plays only while it is on screen
 * and pauses when it leaves. Respects prefers-reduced-motion by showing
 * native controls instead of auto-playing.
 */
export function LazyVideo({
  autoPlay: _autoPlay,
  preload = "metadata",
  className,
  ...props
}: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    if (reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      {...props}
      ref={ref}
      muted
      loop
      playsInline
      preload={preload}
      controls={reducedMotion || props.controls}
      className={className}
    />
  );
}