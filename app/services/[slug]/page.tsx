export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) return { title: "Service not found" };
  return {
    title: svc.name,
    description: svc.description,
  };
}

export default async function ServiceDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const idx = siteConfig.services.findIndex((s) => s.slug === slug);
  const next = siteConfig.services[(idx + 1) % siteConfig.services.length];

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="section-pad bg-canvas">
          <div className="max-w-[1280px] mx-auto">
            <Link
              href="/services"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow hover:text-ink transition-colors inline-flex items-center gap-2 mb-12"
            >
              <span aria-hidden>←</span>
              All Services
            </Link>

            <div className="eyebrow mb-6">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              Service · {String(idx + 1).padStart(2, "0")} of{" "}
              {siteConfig.services.length}
            </div>

            <h1 className="font-display text-ink text-[clamp(40px,7vw,96px)] leading-[1.0] tracking-tight font-light max-w-[15ch]">
              {svc.name}.
            </h1>

            <p className="text-ink-body text-lg md:text-xl leading-relaxed max-w-[680px] mt-10">
              {svc.description}
            </p>
          </div>
        </section>

        {/* Hero image */}
        <section className="bg-canvas-tint">
          <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
            <img
              src={svc.imageUrl}
              alt={svc.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Body content */}
        <section className="section-pad bg-canvas">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
              <div className="col-span-12 md:col-span-4">
                <div className="eyebrow mb-4">
                  <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
                  How it works
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-8">
                <p className="font-display text-ink text-[clamp(22px,3vw,36px)] leading-[1.25] tracking-tight font-light">
                  Every {svc.name.toLowerCase()} engagement begins the same way:
                  a one-hour sit-down with the principal-in-charge to align on
                  scope, budget, and the timeline that is actually achievable.
                </p>
                <p className="text-ink-body text-base md:text-lg leading-relaxed">
                  We don't price by guesswork. Pre-construction includes a
                  full constructability review of the architectural set, a
                  budget reconciliation against drawings, subcontractor
                  scoping, and a schedule model — before a shovel hits the
                  ground.
                </p>
                <p className="text-ink-body text-base md:text-lg leading-relaxed">
                  During construction, an on-site superintendent is present
                  every working day. Weekly owner reports include photo
                  documentation, schedule status, the live RFI log, and
                  cost-to-complete projections. Nothing is hidden, ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Next service */}
        <section className="section-pad bg-canvas-stone border-t border-ink/5">
          <div className="max-w-[1280px] mx-auto">
            <Link href={`/services/${next.slug}`} className="group block">
              <div className="eyebrow mb-4">Next service</div>
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-display text-ink text-[clamp(28px,5vw,72px)] leading-[1.05] tracking-tight font-light group-hover:font-medium transition-all">
                  {next.name}
                </h2>
                <span
                  aria-hidden
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-eyebrow group-hover:text-ink transition-colors inline-flex items-center gap-2"
                >
                  Read more
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
