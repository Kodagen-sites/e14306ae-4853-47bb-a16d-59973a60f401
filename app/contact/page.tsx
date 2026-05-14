export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Apex Build Co. about a residential or commercial project in Vancouver and the Lower Mainland. info@apexbuild.com — (416) 555-0100.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="section-pad bg-canvas">
          <div className="max-w-[1280px] mx-auto">
            <div className="eyebrow mb-6">
              <span className="inline-block h-px w-10 align-middle bg-ink/30 mr-3" />
              Contact
            </div>
            <h1 className="font-display text-ink text-[clamp(40px,7vw,96px)] leading-[1.0] tracking-tight font-light max-w-[18ch]">
              Tell us about{" "}
              <span className="font-medium italic">the building.</span>
            </h1>
            <p className="text-ink-body text-lg leading-relaxed max-w-[640px] mt-10">
              Send a short note about your project — scope, timeline, location.
              A principal will reply within one business day.
            </p>
          </div>
        </section>

        {/* CT4 — Split photo + form */}
        <section className="bg-canvas-tint border-t border-ink/5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — photo */}
            <div className="relative h-[60vh] md:h-auto md:min-h-[760px] overflow-hidden bg-canvas-mist">
              <img
                src="/section-gallery-2.jpg"
                alt="Modern Vancouver condominium interior with mountain view"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
              <div className="absolute inset-0 bg-ink/15" />
              <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10 text-canvas">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/80">
                  <span className="inline-block h-px w-8 align-middle bg-canvas/60 mr-3" />
                  Office
                </div>
                <p className="font-display text-2xl md:text-3xl mt-3 leading-tight">
                  {siteConfig.contact.location}
                </p>
                <div className="mt-6 space-y-2">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="block font-mono text-sm text-canvas/90 hover:text-canvas transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="block font-mono text-sm text-canvas/90 hover:text-canvas transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-canvas px-5 md:px-12 lg:px-16 py-16 md:py-24 flex items-center">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
