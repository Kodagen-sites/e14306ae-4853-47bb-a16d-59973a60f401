"use client";

/**
 * ST1 — Three-across counters. Numbers count up on scroll-in.
 * Off-white bg tone (canvas-tint) — distinct from showcase + services.
 */

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-pad bg-canvas-tint border-b border-ink/5">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8">
          {siteConfig.stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  inView,
}: {
  stat: { value: number; suffix: string; label: string };
  index: number;
  inView: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, stat.value, {
      duration: 2,
      delay: 0.1 + index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, count, stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: easeOut }}
      className="border-t border-ink/15 pt-6"
    >
      <div className="font-display text-ink text-[clamp(56px,9vw,128px)] leading-none tracking-[-0.04em] font-light flex items-baseline">
        <motion.span>{rounded}</motion.span>
        <span className="text-ink-eyebrow ml-1">{stat.suffix}</span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow mt-4">
        {stat.label}
      </p>
    </motion.div>
  );
}
