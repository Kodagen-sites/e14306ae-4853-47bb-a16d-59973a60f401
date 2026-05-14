export const dynamic = "force-dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ValueProp from "@/components/sections/ValueProp";
import Services from "@/components/sections/Services";
import Showcase from "@/components/sections/Showcase";
import TypeStatement from "@/components/sections/TypeStatement";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import CtaSection from "@/components/sections/CtaSection";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Services />
        <Showcase />
        <TypeStatement />
        <Process />
        <Stats />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
