export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WorkMasonry } from "@/components/sections/WorkMasonry";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected residential and commercial projects built by Apex Build Co. across Vancouver and the Lower Mainland.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="section-pad bg-canvas">
          <div className="max-w-[1280px] mx-auto">
            <div className="eyebrow mb-6">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              Selected work
            </div>
            <h1 className="font-display text-ink text-[clamp(40px,7vw,96px)] leading-[1.0] tracking-tight font-light max-w-[16ch]">
              Buildings that{" "}
              <span className="font-medium italic">held up.</span>
            </h1>
            <p className="text-ink-body text-lg leading-relaxed max-w-[640px] mt-10">
              A representative sample of recent residential and commercial
              projects. We work primarily within a 60-minute drive of the
              office — close enough that the principal can walk the site
              every Monday morning.
            </p>
          </div>
        </section>

        <WorkMasonry />
      </main>
      <Footer />
    </>
  );
}
