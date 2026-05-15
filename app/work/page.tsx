export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/sections/PageHero";
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
      <main>
        <PageHero
          eyebrow="Selected work"
          image="/section-gallery-1.jpg"
          title={
            <>
              Buildings that{" "}
              <span className="font-medium italic">held up.</span>
            </>
          }
          intro="A representative sample of recent residential and commercial projects. We work primarily within a 60-minute drive of the office — close enough that the principal can walk the site every Monday morning."
        />

        <WorkMasonry />
      </main>
      <Footer />
    </>
  );
}
