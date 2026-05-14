export const dynamic = "force-dynamic";
/**
 * AB4 — Type-only manifesto About page.
 */

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <main className="pt-32 md:pt-40">
        <AboutManifesto />
      </main>
      <Footer />
    </>
  );
}
