import Container from "@/components/ui/Container";
import RevealText from "@/components/animations/RevealText";
import InfiniteMarquee from "@/components/animations/InfiniteMarquee";
import { CASES } from "@/lib/site";

function CaseCard({
  client,
  title,
  tag,
  year,
}: {
  client: string;
  title: string;
  tag: string;
  year: string;
}) {
  return (
    <article
      data-cursor="hover"
      className="w-[300px] overflow-hidden rounded-sm border border-line bg-surface md:w-[360px]"
    >
      {/* плейсхолдер превью кейса (позже — видео/постер) */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1c1c20] to-[#0f0f12]">
        <span className="absolute left-4 top-4 font-display text-xs uppercase tracking-[0.2em] text-mute">
          {tag}
        </span>
        <span className="absolute right-4 top-4 font-display text-xs text-mute">
          {year}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mute">{client}</p>
          <h3 className="mt-1 font-display text-xl text-fog">{title}</h3>
        </div>
        <span className="text-accent">→</span>
      </div>
    </article>
  );
}

export default function CasesMarquee() {
  const cards = CASES.map((c) => <CaseCard key={c.title} {...c} />);

  return (
    <section id="keysy" className="overflow-hidden py-section">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* левая колонка — текст */}
          <div className="max-w-xl">
            <span className="font-display text-sm text-mute">Избранные работы</span>
            <RevealText
              as="h2"
              text="Кейсы, которые говорят за нас"
              className="mt-5 font-display text-h2 font-semibold uppercase tracking-[-0.01em] text-fog text-balance"
            />
            <p className="mt-6 max-w-md text-lead text-fog/75 text-pretty">
              Лента живёт от скролла и замирает под курсором. Здесь будут реальные
              проекты студии — ролики, фильмы и клипы.
            </p>
            <a
              href="/keysy"
              data-cursor="hover"
              className="mt-8 inline-flex items-center gap-2 border-b border-fog/30 pb-1 text-fog transition-colors hover:border-accent hover:text-accent"
            >
              Все кейсы <span>→</span>
            </a>
          </div>

          {/* правая колонка — 3D-лента */}
          <div className="relative h-[560px]">
            <InfiniteMarquee items={cards} className="h-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
