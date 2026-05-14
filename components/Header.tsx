"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-canvas/90 backdrop-blur-md border-b border-ink/5" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 py-5 md:py-6">
          {/* Left edge — wordmark */}
          <Link href="/" className="font-display text-ink text-lg tracking-tight leading-none">
            <span className="font-medium">Apex</span>
            <span className="text-ink-eyebrow">·</span>
            <span className="font-light">Build</span>
          </Link>

          {/* Center — nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-body hover:text-ink transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right edge — CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-canvas px-5 py-3 transition-colors duration-300 inline-flex items-center gap-2"
            >
              Start a Project
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-canvas md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 pt-28">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * NAV.length, duration: 0.4 }}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-canvas bg-ink px-6 py-4"
                >
                  Start a Project →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
