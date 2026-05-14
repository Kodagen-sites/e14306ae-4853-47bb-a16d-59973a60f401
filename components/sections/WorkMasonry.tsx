"use client";

/**
 * WK1 — Masonry grid editorial.
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECTS = [
  {
    title: "Ironworks Residences",
    type: "Multi-family residential · 84 units",
    location: "Mount Pleasant, Vancouver",
    year: "2025",
    image: "/section-gallery-1.jpg",
    span: "md:col-span-7 md:row-span-2",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Cedar Hollow",
    type: "Custom single-family · 6,800 sqft",
    location: "West Vancouver",
    year: "2024",
    image: "/section-gallery-4.jpg",
    span: "md:col-span-5 md:row-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Quayside Lofts",
    type: "Mixed-use · 12 units + retail",
    location: "Olympic Village",
    year: "2024",
    image: "/section-gallery-2.jpg",
    span: "md:col-span-5 md:row-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Maplewood Estate",
    type: "Custom residential · Passive House",
    location: "North Vancouver",
    year: "2023",
    image: "/section-gallery-3.jpg",
    span: "md:col-span-6 md:row-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Granville Studios",
    type: "Tenant fit-out · 14,000 sqft",
    location: "False Creek",
    year: "2023",
    image: "/service-renovations.jpg",
    span: "md:col-span-6 md:row-span-1",
    aspect: "aspect-[4/3]",
  },
];

export function WorkMasonry() {
  return (
    <section className="bg-canvas-tint border-t border-ink/5 py-16 md:py-24 px-5 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[280px] gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectTile key={p.title} project={p} index={i} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow">
            Detailed case studies coming Spring 2026
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectTile({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: easeOut }}
      className={`group relative overflow-hidden bg-canvas-mist ${project.span} col-span-1`}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        style={{ y }}
        className="absolute inset-0 h-[116%] w-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-[filter] duration-700"
        onError={(e) => {
          (e.target as HTMLImageElement).style.opacity = "0";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/90">
          {String(index + 1).padStart(2, "0")} · {project.year}
        </span>

        <div>
          <h3 className="font-display text-canvas text-2xl md:text-3xl leading-tight font-medium">
            {project.title}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/75 mt-2">
            {project.type}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/60 mt-1">
            {project.location}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
