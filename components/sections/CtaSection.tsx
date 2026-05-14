"use client";

/**
 * CTA1 — centered oversized type + T4 parallax bg image.
 * Section ALWAYS has a non-solid background (rule 33 — never plain solid CTA).
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden"
    >
      {/* Parallax background image */}
      <div className="absolute inset-0">
        <motion.img
          src="/section-cta.jpg"
          alt="Apex Build Co. completed development at dusk"
          style={{ y: bgY }}
          className="absolute inset-0 h-[130%] w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0";
          }}
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/30" />
      </div>

      <div ref={ref} className="relative section-pad max-w-[1100px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-canvas/70 mb-8"
        >
          <span className="inline-block h-px w-10 align-middle bg-canvas/50 mr-3" />
          Begin a project
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOut }}
          className="font-display text-canvas text-[clamp(40px,8vw,108px)] leading-[0.98] tracking-tight font-light"
        >
          Tell us about
          <br />
          <span className="font-medium italic">the building.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-canvas/75 text-base md:text-lg max-w-[520px] mx-auto mt-8 leading-relaxed"
        >
          We're taking on selected residential and commercial projects for
          2026 completion. A 30-minute conversation, no obligations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-canvas text-ink px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-canvas/90 transition-colors duration-300"
          >
            Start a Project
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href="mailto:info@apexbuild.com"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/80 hover:text-canvas transition-colors px-4 py-5"
          >
            info@apexbuild.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
