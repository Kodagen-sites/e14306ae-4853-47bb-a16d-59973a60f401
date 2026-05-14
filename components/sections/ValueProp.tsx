"use client";

/**
 * T7 oversized type section — value proposition word-by-word mask reveal.
 * Light-grey bg (bg-secondary tone — distinct from hero & services bg).
 */

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ValueProp() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const sentence = siteConfig.hero.body;
  const words = sentence.split(/\s+/);

  return (
    <section className="section-pad bg-canvas-tint border-b border-ink/5">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="mb-12 md:mb-16 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow">
          <span className="inline-block h-px w-10 bg-ink/30" />
          What we do
        </div>

        <p className="font-display text-ink font-light text-[clamp(28px,5vw,68px)] leading-[1.1] tracking-tight max-w-[1200px]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.18, y: "10%" }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.02 * i,
                ease: easeOut,
              }}
              className="inline-block mr-[0.18em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
