"use client";

/**
 * T5 image mosaic reveal — gallery of completed work / spaces.
 * 4-tile composition with stagger reveal.
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="showcase"
      className="section-pad bg-canvas-stone border-b border-ink/5"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="eyebrow mb-4">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              Selected work
            </div>
            <h2 className="font-display text-ink text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-tight font-light max-w-[14ch]">
              Built across the
              <br />
              <span className="font-medium">Lower Mainland.</span>
            </h2>
          </div>
          <a
            href="/work"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow hover:text-ink transition-colors inline-flex items-center gap-2 self-start md:self-auto"
          >
            View all projects
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="grid grid-cols-12 grid-rows-[200px_300px_240px] md:grid-rows-[240px_360px_280px] gap-4">
          {/* Tile 1 — large feature top-left */}
          <ShowcaseTile
            inView={inView}
            i={0}
            src={siteConfig.gallery[0].src}
            alt={siteConfig.gallery[0].alt}
            className="col-span-12 md:col-span-7 row-span-2"
          />
          {/* Tile 2 — top right */}
          <ShowcaseTile
            inView={inView}
            i={1}
            src={siteConfig.gallery[1].src}
            alt={siteConfig.gallery[1].alt}
            className="col-span-6 md:col-span-5 row-span-1"
          />
          {/* Tile 3 — middle right */}
          <ShowcaseTile
            inView={inView}
            i={2}
            src={siteConfig.gallery[2].src}
            alt={siteConfig.gallery[2].alt}
            className="col-span-6 md:col-span-5 row-span-1"
          />
          {/* Tile 4 — bottom wide */}
          <ShowcaseTile
            inView={inView}
            i={3}
            src={siteConfig.gallery[3].src}
            alt={siteConfig.gallery[3].alt}
            className="col-span-12 row-span-1"
          />
        </div>
      </div>
    </section>
  );
}

function ShowcaseTile({
  inView,
  i,
  src,
  alt,
  className,
}: {
  inView: boolean;
  i: number;
  src: string;
  alt: string;
  className: string;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={tileRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: i * 0.12, ease: easeOut }}
      className={`relative overflow-hidden bg-canvas-mist ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 h-[116%] w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.opacity = "0";
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/40 to-transparent">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/80">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}
