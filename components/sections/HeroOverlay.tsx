"use client";

/**
 * HeroOverlay — HO6 corner-minimal layout with H3 gradient-text + E2 word-split entrance.
 * Renders over the ScrollCanvas frame sequence.
 */

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Fade out as user scrolls past the hero
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [1, 1, 0]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.5], [1, 1, 0]);

  const headlineWords = siteConfig.hero.headline;

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {/* Top-left corner: eyebrow */}
      <motion.div
        style={{ opacity: eyebrowOpacity }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
        className="absolute top-32 left-5 md:top-36 md:left-10 font-mono text-[11px] uppercase tracking-[0.22em] text-white/85 mix-blend-difference"
      >
        <span className="inline-block h-px w-10 align-middle bg-white/60 mr-3" />
        {siteConfig.hero.eyebrow}
      </motion.div>

      {/* Bottom-left corner: headline (HO6 anchor) */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-28 left-5 md:bottom-24 md:left-10 max-w-[860px]"
      >
        <h1 className="font-display text-white text-[clamp(40px,8vw,108px)] leading-[0.95] tracking-[-0.03em]">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "40%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3 + i * 0.12,
                ease: easeOut,
              }}
              className={`inline-block ${
                word.weight === "light" ? "font-light" : "font-medium"
              } ${i === headlineWords.length - 1 ? "" : "mr-2"}`}
              style={{
                color:
                  word.weight === "light"
                    ? "rgba(255,255,255,0.92)"
                    : "rgba(255,255,255,1)",
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
          className="font-display text-white/80 text-[clamp(20px,2.4vw,32px)] leading-[1.15] mt-4 font-light italic"
        >
          {siteConfig.hero.sub}
        </motion.p>
      </motion.div>

      {/* Bottom-right corner: scroll cue */}
      <motion.div
        style={{ opacity: eyebrowOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 right-5 md:bottom-12 md:right-10 flex flex-col items-end gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-white/50"
        />
      </motion.div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />
    </div>
  );
}
