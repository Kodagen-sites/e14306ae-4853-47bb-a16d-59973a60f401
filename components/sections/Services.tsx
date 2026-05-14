"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { siteConfig } from "@/lib/site-config";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LAYOUT = ["feature", "wide", "tall", "small", "small"] as const;

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      className="section-pad bg-canvas border-b border-ink/5"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow mb-4">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              Services
            </div>
            <h2 className="font-display text-ink text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-tight font-light">
              Five disciplines.
              <br />
              <span className="font-medium">One contract.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 md:pt-3">
            <p className="text-ink-body text-base md:text-lg leading-relaxed max-w-[520px]">
              Design-build means a single accountable team from the first
              sketch to the final walkthrough. No subcontractor finger-pointing.
              No drawings lost in translation. The architect, the estimator,
              and the superintendent sit at the same table.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:auto-rows-[180px]"
        >
          {siteConfig.services.map((svc, i) => (
            <motion.div
              key={svc.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: easeOut },
                },
              }}
              className={
                LAYOUT[i] === "feature"
                  ? "md:col-span-2 md:row-span-2"
                  : LAYOUT[i] === "wide"
                  ? "md:col-span-2 md:row-span-1"
                  : LAYOUT[i] === "tall"
                  ? "md:col-span-1 md:row-span-2"
                  : "md:col-span-1 md:row-span-1"
              }
            >
              <ServiceCard service={svc} index={i} size={LAYOUT[i]} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
