"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const f = siteConfig.footer;

  return (
    <footer ref={ref} className="relative bg-ink text-canvas overflow-hidden">
      {/* Top edge hairline */}
      <div className="h-px bg-canvas/15" />

      {/* CTA + brand statement (asymmetric editorial) */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 px-5 md:px-10 pt-20 md:pt-32 pb-16 md:pb-20">
        <motion.div
          style={{ y: headlineY }}
          className="col-span-12 md:col-span-8"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/50 mb-6">
            Next step
          </div>
          <h2 className="font-display text-canvas text-[clamp(40px,8vw,110px)] leading-[0.95] tracking-[-0.02em] font-light">
            {f.ctaHeadline}
          </h2>
          <p className="text-canvas/70 max-w-md mt-6 text-base md:text-lg leading-relaxed">
            {f.ctaSubheadline}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-canvas border border-canvas/30 hover:border-canvas hover:bg-canvas hover:text-ink px-6 py-4 transition-colors duration-300"
          >
            Begin a conversation
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <div className="col-span-12 md:col-span-4 md:pt-12">
          <p className="text-canvas/70 leading-relaxed text-sm">
            {f.brandStatement}
          </p>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/40 mb-1">
                Office
              </dt>
              <dd className="text-canvas text-sm">{f.address}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/40 mb-1">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${f.contactEmail}`}
                  className="text-canvas hover:text-canvas/70 transition-colors text-sm"
                >
                  {f.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/40 mb-1">
                Phone
              </dt>
              <dd>
                <a
                  href={`tel:${f.contactPhone}`}
                  className="text-canvas hover:text-canvas/70 transition-colors text-sm"
                >
                  {f.contactPhone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Bottom legal row */}
      <div className="border-t border-canvas/10 px-5 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-canvas text-lg tracking-tight leading-none">
            <span className="font-medium">Apex</span>
            <span className="text-canvas/50">·</span>
            <span className="font-light">Build</span>
          </Link>
          <span className="font-mono text-[11px] text-canvas/40">
            {f.copyright}
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/services" className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/60 hover:text-canvas transition-colors">
            Services
          </Link>
          <Link href="/work" className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/60 hover:text-canvas transition-colors">
            Work
          </Link>
          <Link href="/about" className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/60 hover:text-canvas transition-colors">
            About
          </Link>
          <Link href="/contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/60 hover:text-canvas transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
