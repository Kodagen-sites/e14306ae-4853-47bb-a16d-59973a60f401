"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Service = {
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
};

type Size = "feature" | "wide" | "tall" | "small";

type Props = {
  service: Service;
  index?: number;
  size?: Size;
};

const SIZE_CLASSES: Record<Size, string> = {
  feature: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
  small: "md:col-span-1 md:row-span-1",
};

export default function ServiceCard({ service, size = "small", index = 0 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const isFeature = size === "feature";
  const isWide = size === "wide";
  const isTall = size === "tall";

  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      className={`group relative block overflow-hidden border border-ink/10 bg-canvas-tint hover:border-ink/30 transition-colors duration-500 ${SIZE_CLASSES[size]}`}
      style={{ aspectRatio: isFeature ? "1/1" : isWide ? "2/1" : isTall ? "1/2" : "1/1" }}
    >
      {service.imageUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={service.imageUrl}
            alt={service.name}
            style={{ y }}
            className="absolute inset-0 h-[120%] w-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 ease-out scale-105 group-hover:scale-100"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0";
            }}
          />
          <div className="absolute inset-0 bg-canvas/30 group-hover:bg-canvas/10 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/40 to-transparent" />
        </div>
      )}

      <div
        className={`relative h-full flex flex-col justify-end ${
          isFeature ? "p-8 md:p-10" : "p-6"
        }`}
      >
        <div className="eyebrow mb-3">
          {String(index + 1).padStart(2, "0")} · Service
        </div>
        <h3
          className={`font-display text-ink font-medium leading-[1.05] tracking-tight ${
            isFeature
              ? "text-3xl md:text-5xl mb-4"
              : isWide
              ? "text-2xl md:text-3xl mb-3"
              : "text-xl md:text-2xl mb-2"
          }`}
        >
          {service.name}
        </h3>
        {(isFeature || isWide || isTall) && (
          <p className="text-ink-body text-sm leading-relaxed line-clamp-3 max-w-md">
            {service.description}
          </p>
        )}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-eyebrow group-hover:text-ink transition-colors mt-4 inline-flex items-center gap-2">
          Read more
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      <div className="absolute top-0 left-0 h-px w-0 bg-ink group-hover:w-full transition-[width] duration-700 ease-out" />
    </Link>
  );
}

export const BENTO_LAYOUT: Size[] = [
  "feature",
  "wide",
  "tall",
  "small",
  "small",
];
