"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  items: ReactNode[];
  /** px в секунду */
  speed?: number;
  className?: string;
};

/**
 * Бесконечная ВЕРТИКАЛЬНАЯ лента карточек с 3D-наклоном.
 * - бесшовный цикл через gsap modifiers (контент дублируется);
 * - пауза при hover (плавно через timeScale);
 * - синхронизация со скроллом: скорость/направление зависят от velocity скролла;
 * - prefers-reduced-motion: лента статична, просто список.
 * Анимируем только transform.
 */
export default function InfiniteMarquee({
  items,
  speed = 38,
  className = "",
}: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useIsoLayoutEffect(() => {
    const el = track.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const half = el.scrollHeight / 2; // высота одной копии
      if (half <= 0) return;

      tween.current = gsap.to(el, {
        y: -half,
        duration: half / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          // бесшовная петля: держим y в диапазоне (-half, 0]
          y: gsap.utils.unitize((y: number) => (parseFloat(String(y)) % half)),
        },
      });

      // Скролл подкручивает ленту: быстрее при активном скролле
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const ts = 1 + gsap.utils.clamp(0, 4, Math.abs(v) / 400);
          gsap.to(tween.current, { timeScale: ts, duration: 0.5, overwrite: true });
          // вернуть к базовой скорости, когда скролл затих
          gsap.to(tween.current, { timeScale: 1, duration: 0.8, delay: 0.6, overwrite: false });
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [speed, items.length]);

  const onEnter = () =>
    tween.current && gsap.to(tween.current, { timeScale: 0, duration: 0.4 });
  const onLeave = () =>
    tween.current && gsap.to(tween.current, { timeScale: 1, duration: 0.4 });

  return (
    <div
      ref={scope}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* мягкие края ленты */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink to-transparent" />

      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(8deg) rotateY(-14deg)",
        }}
      >
        <div ref={track} className="flex flex-col gap-5 will-change-transform">
          {/* две копии для бесшовного цикла */}
          {[...items, ...items].map((node, i) => (
            <div key={i}>{node}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
