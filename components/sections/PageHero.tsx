import type { ReactNode } from "react";

/**
 * PageHero — full-bleed image hero band for inner pages (Services, About,
 * Work, Contact). Sits flush under the fixed header (header floats over it),
 * which removes the doubled top-padding whitespace the old text-only headers had.
 *
 * Server Component — no event handlers, no "use client".
 */
type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  image: string;
  intro?: string;
};

export default function PageHero({ eyebrow, title, image, intro }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-ink md:min-h-[64vh]">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "contrast(1.05) saturate(0.9) brightness(0.82)" }}
      />
      {/* Dark gradient — darker at the bottom for title legibility, lighter
          at the top so the fixed header still reads. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />

      <div className="relative w-full px-5 pb-14 pt-44 md:px-10 md:pb-20 md:pt-48">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-white/50" />
            {eyebrow}
          </div>
          <h1 className="max-w-[18ch] font-display text-[clamp(40px,7vw,92px)] font-light leading-[1.0] tracking-[-0.02em] text-white">
            {title}
          </h1>
          {intro ? (
            <p className="mt-8 max-w-[640px] text-lg leading-relaxed text-white/75">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
