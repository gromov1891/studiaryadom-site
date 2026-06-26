"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * Прелоадер со счётчиком 0–100% и тонкой полосой прогресса.
 * Блокирует скролл на время загрузки, затем уезжает вверх.
 * При prefers-reduced-motion мгновенно убирается.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.display = "none";
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const obj = { v: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(obj, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(obj.v)),
      });
      tl.to(".pre-bar", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0);
      tl.to(
        ".pre-meta",
        { yPercent: -130, opacity: 0, duration: 0.6, ease: "power3.in" },
        "+=0.1"
      );
      tl.to(
        el,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "expo.inOut",
          onComplete: () => {
            el.style.display = "none";
            document.body.style.overflow = "";
            ScrollTrigger.refresh();
          },
        },
        "-=0.25"
      );
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col justify-end bg-ink px-6 pb-8 md:px-10 md:pb-12"
    >
      <div className="pre-meta flex items-end justify-between">
        <span className="font-display text-sm uppercase tracking-[0.25em] text-mute">
          Загрузка
        </span>
        <span
          className="font-display text-[18vw] leading-[0.8] text-fog md:text-[12vw]"
          aria-hidden
        >
          {count}
        </span>
      </div>
      <div className="mt-6 h-px w-full origin-left bg-line">
        <div className="pre-bar h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
