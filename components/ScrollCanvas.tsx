"use client";

/**
 * ScrollCanvas — scroll-scrubbed frame sequence renderer.
 * Uses framer-motion's useScroll. Pinned via sticky positioning.
 */

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

type Props = {
  frameCount: number;
  pattern?: string;
  padLength?: number;
  scrollDistance?: number;
  children?: React.ReactNode;
  onProgress?: (progress: number) => void;
};

export default function ScrollCanvas({
  frameCount,
  pattern = "/frames/frame-{n}.jpg",
  padLength = 4,
  scrollDistance = 5,
  children,
  onProgress,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;
    let cancelled = false;

    const buildUrl = (i: number) => {
      const n = String(i + 1).padStart(padLength, "0");
      return pattern.replace("{n}", n);
    };

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (cancelled) return;
          images[i] = img;
          loadedCount++;
          setLoaded(loadedCount);
          resolve();
        };
        img.src = buildUrl(i);
      });

    (async () => {
      const firstBatch = Math.min(30, frameCount);
      await Promise.all(
        Array.from({ length: firstBatch }, (_, i) => loadOne(i))
      );
      if (cancelled) return;
      imagesRef.current = images;
      setReady(true);

      const queue = Array.from(
        { length: frameCount - firstBatch },
        (_, i) => i + firstBatch
      );
      const workers = Array.from({ length: 8 }, async () => {
        while (queue.length && !cancelled) {
          const idx = queue.shift()!;
          await loadOne(idx);
        }
      });
      await Promise.all(workers);
    })();

    return () => {
      cancelled = true;
    };
  }, [frameCount, pattern, padLength]);

  // Set up canvas + size
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(currentFrameRef.current);
    };

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.width) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    (canvas as any)._draw = draw;
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!ready) return;
    const target = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * (frameCount - 1)))
    );
    if (target !== currentFrameRef.current) {
      currentFrameRef.current = target;
      const canvas = canvasRef.current as any;
      canvas?._draw?.(target);
    }
    onProgress?.(latest);
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${scrollDistance * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-screen w-screen"
          style={{ background: "#0a0a0a" }}
        />

        {!ready && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white">
            <div className="flex flex-col items-center gap-4">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                Loading
              </div>
              <div className="h-px w-48 overflow-hidden bg-white/10">
                <div
                  className="h-full bg-white transition-[width] duration-150"
                  style={{
                    width: `${Math.round((loaded / frameCount) * 100)}%`,
                  }}
                />
              </div>
              <div className="font-mono text-[10px] text-white/40">
                {loaded} / {frameCount}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none relative z-10 h-full">
          {children}
        </div>
      </div>
    </section>
  );
}
