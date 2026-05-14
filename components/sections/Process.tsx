"use client";

/**
 * T15 pinned split-scroll process section.
 * Left column: sticky image. Right column: scrolling steps.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const p = siteConfig.process;

  return (
    <section
      id="process"
      className="bg-canvas border-b border-ink/5 relative"
    >
      <div className="section-pad max-w-[1280px] mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-16 md:mb-20 max-w-[640px]"
        >
          <div className="eyebrow mb-4">
            <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
            {p.eyebrow}
          </div>
          <h2 className="font-display text-ink text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-tight font-light">
            {p.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Sticky image column */}
          <div className="col-span-12 md:col-span-5 md:sticky md:top-32 self-start">
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-canvas-tint">
              <img
                src={p.image}
                alt="Architectural drawings and tools"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
              <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-canvas mix-blend-difference">
                Pre-construction · Drafting
              </div>
            </div>
          </div>

          {/* Scrolling step column */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-16 md:space-y-24">
            {p.steps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: { number: string; title: string; body: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="flex items-baseline gap-6 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow">
          {step.number}
        </span>
        <span className="flex-1 h-px bg-ink/10" />
      </div>
      <h3 className="font-display text-ink text-[clamp(24px,3vw,36px)] leading-tight tracking-tight font-medium mb-4">
        {step.title}
      </h3>
      <p className="text-ink-body text-base leading-relaxed max-w-[480px]">
        {step.body}
      </p>
    </motion.div>
  );
}
