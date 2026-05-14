"use client";

/**
 * T7 oversized type statement — single mission sentence, bold.
 * Deep ink bg (4th distinct tone for rule 33.1 — minimum 4 bg tones).
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function TypeStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-pad bg-ink relative overflow-hidden">
      {/* Motion-bg: geometric grid pulse (subtle, modernist) */}
      <div className="absolute inset-0 grid-bg opacity-[0.08] animate-grid-pulse pointer-events-none" />

      <div ref={ref} className="relative max-w-[1280px] mx-auto">
        <div className="eyebrow mb-12" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span className="inline-block h-px w-10 align-middle bg-canvas/40 mr-3" />
          Position
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOut }}
          className="font-display text-canvas text-[clamp(36px,7vw,96px)] leading-[1.05] tracking-tight font-light max-w-[1100px]"
        >
          We don't sell square footage.{" "}
          <span className="font-medium italic">We sell the assurance</span>{" "}
          that the building will be exactly what the architect drew —{" "}
          <span className="text-canvas/65">delivered when we said it would be.</span>
        </motion.h2>
      </div>
    </section>
  );
}
