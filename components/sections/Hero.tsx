"use client";

import dynamic from "next/dynamic";
import HeroOverlay from "./HeroOverlay";
import framesManifest from "@/content/frames-manifest.json";

const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), {
  ssr: false,
});

export default function Hero() {
  const frameCount = framesManifest.frameCount || 0;

  // If frames not yet generated, render a poster hero that still scrolls.
  if (frameCount === 0) {
    return (
      <section className="relative h-[120vh] w-full overflow-hidden bg-ink">
        <img
          src="/frames-source/scene-3-end.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0";
          }}
        />
        <img
          src="/section-gallery-1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-ink/30" />
        <div className="sticky top-0 h-screen">
          <HeroOverlay />
        </div>
      </section>
    );
  }

  return (
    <ScrollCanvas
      frameCount={frameCount}
      pattern={framesManifest.pattern}
      padLength={framesManifest.padLength}
      scrollDistance={5}
    >
      <HeroOverlay />
    </ScrollCanvas>
  );
}
