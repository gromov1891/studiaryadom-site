"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Кастомный курсор: точка с инерцией, увеличивается над ссылками/кнопками.
 * Только на устройствах с точным указателем (мышь). Скрыт при reduced-motion и на тач.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(el, "x", { duration: reduce ? 0 : 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: reduce ? 0 : 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX - 6);
      yTo(e.clientY - 6);
    };

    const grow = () => gsap.to(el, { scale: 2.6, duration: 0.3, ease: "power3.out" });
    const shrink = () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" });

    window.addEventListener("pointermove", move);

    const targets = document.querySelectorAll(
      'a, button, [data-cursor="hover"]'
    );
    targets.forEach((t) => {
      t.addEventListener("mouseenter", grow);
      t.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("pointermove", move);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", grow);
        t.removeEventListener("mouseleave", shrink);
      });
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dot} className="cursor-dot" aria-hidden />;
}
