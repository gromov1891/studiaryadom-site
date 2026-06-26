"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** запускать сразу при маунте, а не по скроллу (для hero) */
  immediate?: boolean;
};

/**
 * Пословное появление текста: каждое слово «выезжает» снизу из-под маски.
 * Свой split на слова (без платного GSAP SplitText). Анимируем только transform.
 * При prefers-reduced-motion текст показывается сразу.
 */
export default function RevealText({
  text,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.08,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // слова и так видимы

    const ctx = gsap.context(() => {
      gsap.set(".rt-word", { yPercent: 115 });
      gsap.to(".rt-word", {
        yPercent: 0,
        duration: 1.05,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, immediate]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <span className="rt-word inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
      {/* доступная копия для скринридеров и SEO */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
