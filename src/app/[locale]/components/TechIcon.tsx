"use client";

import { useEffect, useRef, useState } from "react";

const SIMPLE_ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@13/icons";

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]/g, "");

type Status = "font" | "probing" | "remote" | "letter";

type TechIconProps = {
  name: string;
  iconClass?: string;
  className?: string;
};

export function TechIcon({ name, iconClass, className = "" }: TechIconProps) {
  const fontRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>(iconClass ? "font" : "probing");
  const url = `${SIMPLE_ICONS}/${toSlug(name)}.svg`;

  useEffect(() => {
    let cancelled = false;

    if (status === "font") {
      const el = fontRef.current;
      if (!el) return;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        const content = getComputedStyle(el, "::before").content;
        const rendered =
          !!content && content !== "none" && content !== "normal" && content !== '""';
        if (!rendered) setStatus("probing");
      });
    }

    if (status === "probing") {
      const img = new Image();
      img.onload = () => !cancelled && setStatus("remote");
      img.onerror = () => !cancelled && setStatus("letter");
      img.src = url;
    }

    return () => {
      cancelled = true;
    };
  }, [status, url]);

  if (status === "font") {
    return (
      <i
        ref={fontRef}
        aria-hidden="true"
        className={`${iconClass} ${className}`}
      />
    );
  }

  if (status === "remote") {
    return (
      <span
        aria-hidden="true"
        className={`inline-block ${className}`}
        style={{
          width: "1em",
          height: "1em",
          backgroundColor: "currentColor",
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-bold leading-none ${className}`}
      style={{ width: "1em", height: "1em" }}
    >
      {status === "letter" && (
        <span style={{ fontSize: "0.7em" }}>{name.charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}