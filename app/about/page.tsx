export const dynamic = "force-dynamic";
/**
 * About — AB2 image hero + manifesto body (trades/construction → image-led).
 */

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/sections/PageHero";
import AboutManifesto from "@/components/sections/AboutManifesto";

export const metadata: Metadata = {
  title: "About",
  description:
    "Apex Build Co. is a Vancouver design-build firm. We bring the architect, the estimator, and the superintendent to the same table — and we keep them there from sketch to keys.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="About"
          image="/section-gallery-4.jpg"
          title={
            <>
              The drawing and the building{" "}
              <span className="font-medium italic">are the same thing.</span>
            </>
          }
          intro="A Vancouver design-build firm. We bring the architect, the estimator, and the superintendent to the same table — and keep them there from sketch to keys."
        />
        <AboutManifesto />
      </main>
      <Footer />
    </>
  );
}
