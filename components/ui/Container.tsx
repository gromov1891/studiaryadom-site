import type { ReactNode } from "react";

/** Контейнер с общими полями. Широкий, с воздухом по бокам. */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
