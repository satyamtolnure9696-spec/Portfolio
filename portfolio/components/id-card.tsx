"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IDCard() {
  const [imgFailed, setImgFailed] = useState(false);
  const swingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swingRef.current || !cardRef.current || !strapRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1 });

      // strap unspools from the anchor point at the top of the page
      tl.fromTo(
        strapRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, ease: "power2.out", transformOrigin: "top" }
      )
        // card drops in and lands with a bounce
        .fromTo(
          cardRef.current,
          { y: -280, opacity: 0, rotate: -6 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.15,
            ease: "bounce.out",
          },
          "-=0.15"
        )
        // the impact sends the whole badge swinging like a real cord —
        // a springy, decaying oscillation rather than a straight rotation
        .fromTo(
          swingRef.current,
          { rotate: -14 },
          {
            rotate: 0,
            duration: 2.2,
            ease: "elastic.out(1, 0.28)",
            transformOrigin: "top center",
          },
          "-=0.1"
        )
        // once it settles, a slow, small idle sway continues forever
        .to(swingRef.current, {
          rotate: 2.5,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "top center",
        })
        // the strap itself flexes slightly out of phase, like real cord under tension
        .to(
          strapRef.current,
          {
            skewX: 2.5,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute right-6 top-16 z-10 hidden h-[62%] lg:block xl:right-12 xl:top-20">
      <div
        ref={swingRef}
        className="flex h-full flex-col items-center pt-0"
        style={{ transformOrigin: "top center" }}
      >
        {/* single lanyard strap — square edges, spans from the top of the page to the card */}
        <div
          ref={strapRef}
          className="flex w-9 flex-1 flex-col items-center justify-start rounded-none border border-neutral-200 bg-white/95 py-3 shadow-sm xl:w-10"
          style={{ transformOrigin: "top" }}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500"
            style={{ writingMode: "vertical-rl" }}
          >
            SIGNAL · SIGNAL · SIGNAL
          </p>
        </div>

        {/* clip */}
        <div className="h-2.5 w-9 rounded-none border border-neutral-300 bg-neutral-100 xl:w-10" />

        {/* card — always a white badge, regardless of site theme */}
        <div ref={cardRef} className="relative -mt-1">
          <div className="w-52 overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)] xl:w-56">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
              {!imgFailed ? (
                // Drop a portrait photo at /public/id-photo.jpg to replace this
                <img
                  src="/id-photo.jpg"
                  alt="Satyam"
                  className="h-full w-full object-cover grayscale"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-signal-violet/15 to-signal-amber/15">
                  <span className="font-display text-5xl font-medium text-neutral-800">
                    S
                  </span>
                </div>
              )}
            </div>
            <div className="mt-3.5 space-y-0.5 text-center">
              <p className="font-display text-base font-medium text-neutral-900">
                Satyam
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Comp. Eng · VIT Pune
              </p>
            </div>
          </div>

          {/* side tag */}
          <div className="absolute -right-10 top-20 rotate-90 rounded-full bg-void/80 px-3 py-1.5 backdrop-blur xl:-right-11">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-cyan">
              ID · 026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
