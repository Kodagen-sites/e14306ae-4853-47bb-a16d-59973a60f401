"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PHRASES = [
  "We were tired of",
  "construction sites where",
  "the drawings and the",
  "building no longer matched.",
];

const BODY: Array<{ eyebrow: string; body: string }> = [
  {
    eyebrow: "Who we are",
    body:
      "Apex Build Co. was founded in Vancouver in 2008 by a structural engineer and a registered architect who had spent a decade watching beautiful drawings get gutted on site. We're a design-build firm — meaning we own the entire line from concept through occupancy.",
  },
  {
    eyebrow: "What that means in practice",
    body:
      "The person estimating your project is the same person who'll be on site at framing inspection. The architect doesn't hand off to a contractor — they walk the slab pour. There's no one to point at when something doesn't match the drawings, because we drew them.",
  },
  {
    eyebrow: "How we choose work",
    body:
      "We take on six to eight projects a year. Most are multi-family residential in the Lower Mainland; some are custom single-family on the North Shore; a few are commercial fit-outs in mid-rise office and retail. We say no when the timeline isn't credible, when the budget isn't real, or when the project simply isn't the kind of building we'd be proud to put our name on.",
  },
  {
    eyebrow: "What stays the same",
    body:
      "The principal you meet in the first call is the principal who signs your certificate of occupancy. We don't hand projects down a chain. That single piece of continuity is, more than anything else, what we sell.",
  },
];

export default function AboutManifesto() {
  return <AboutManifestoInner />;
}

export function AboutManifestoInner() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <article className="bg-canvas">
      {/* Manifesto block */}
      <section ref={headerRef} className="section-pad bg-canvas">
        <div className="max-w-[1280px] mx-auto">
          <div className="eyebrow mb-12">
            <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
            About
          </div>

          <div className="font-display text-ink text-[clamp(36px,7vw,108px)] leading-[1.0] tracking-[-0.03em] font-light max-w-[1200px]">
            {PHRASES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.18,
                  ease: easeOut,
                }}
                className={i === PHRASES.length - 1 ? "font-medium italic" : ""}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow"
          >
            — Founders' note, 2008
          </motion.div>
        </div>
      </section>

      {/* Section text blocks alternating tones */}
      {BODY.map((block, i) => (
        <BlockSection key={i} block={block} index={i} />
      ))}
    </article>
  );
}

function BlockSection({
  block,
  index,
}: {
  block: { eyebrow: string; body: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const tones = ["bg-canvas-tint", "bg-canvas", "bg-canvas-stone", "bg-canvas"];
  const tone = tones[index % tones.length];

  return (
    <section className={`section-pad ${tone} border-t border-ink/5`}>
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOut }}
            className="col-span-12 md:col-span-4"
          >
            <div className="eyebrow">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              {block.eyebrow}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
            className="col-span-12 md:col-span-7 md:col-start-6"
          >
            <p className="font-display text-ink text-[clamp(22px,3vw,36px)] leading-[1.25] tracking-tight font-light">
              {block.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
