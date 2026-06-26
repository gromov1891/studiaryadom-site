import Container from "@/components/ui/Container";
import RevealText from "@/components/animations/RevealText";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32 pb-10">
      {/* верхняя строка-метаданные */}
      <Container className="flex items-start justify-between text-sm text-mute">
        <span className="max-w-[16ch] text-pretty">
          {SITE.city} · студия<br />видеопродакшна
        </span>
        <span className="hidden md:block">©&nbsp;2025 — настоящее</span>
      </Container>

      {/* главный заголовок */}
      <Container className="relative">
        <h1 className="font-display text-hero font-semibold uppercase tracking-[-0.02em] text-fog">
          <RevealText as="span" text="Снимаем" immediate delay={0.2} className="block" />
          <RevealText
            as="span"
            text="кино из брендов"
            immediate
            delay={0.32}
            className="block text-accent"
          />
        </h1>
      </Container>

      {/* нижняя строка: дескриптор + индикатор скролла */}
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[42ch] text-lead text-fog/80 text-pretty">
          Рекламные ролики, бренд-фильмы и клипы полного цикла — от идеи и
          раскадровки до цвета и звука.
        </p>
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-mute">
          <span>Листайте</span>
          <span className="h-10 w-px bg-line" />
        </div>
      </Container>
    </section>
  );
}
