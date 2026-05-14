export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design-build, general contracting, renovations, sustainable building, and concrete structural work — for residential, commercial, and custom projects across Vancouver and the Lower Mainland.",
};

export default function ServicesIndex() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="section-pad bg-canvas">
          <div className="max-w-[1280px] mx-auto">
            <div className="eyebrow mb-6">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              Services
            </div>
            <h1 className="font-display text-ink text-[clamp(40px,7vw,96px)] leading-[1.0] tracking-tight font-light max-w-[18ch]">
              Five disciplines.{" "}
              <span className="font-medium italic">One accountable team.</span>
            </h1>
            <p className="text-ink-body text-lg leading-relaxed max-w-[640px] mt-10">
              Apex Build Co. delivers each discipline below in-house or with
              long-standing trade partners. Every project is led by a single
              principal-in-charge — your one phone call from sketch to keys.
            </p>
          </div>
        </section>

        <section className="bg-canvas-tint border-t border-ink/5">
          <div className="max-w-[1280px] mx-auto">
            {siteConfig.services.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group block border-b border-ink/10 last:border-b-0"
              >
                <div className="grid grid-cols-12 gap-x-6 items-center py-10 md:py-14 px-5 md:px-10 hover:bg-canvas transition-colors duration-300">
                  <span className="col-span-2 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="col-span-10 md:col-span-5 font-display text-ink text-[clamp(24px,4vw,48px)] leading-[1.05] tracking-tight font-light group-hover:font-medium transition-all duration-300">
                    {svc.name}
                  </h2>
                  <p className="col-span-12 md:col-span-5 mt-4 md:mt-0 text-ink-body text-base leading-relaxed">
                    {svc.description}
                  </p>
                  <span
                    aria-hidden
                    className="col-span-12 md:col-span-1 mt-4 md:mt-0 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow group-hover:text-ink transition-colors"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
