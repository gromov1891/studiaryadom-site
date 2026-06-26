import Container from "@/components/ui/Container";
import RevealText from "@/components/animations/RevealText";
import { SERVICES } from "@/lib/site";

export default function Services() {
  return (
    <section id="uslugi" className="py-section">
      <Container>
        <div className="mb-16 flex items-baseline justify-between gap-6">
          <RevealText
            as="h2"
            text="Что мы делаем"
            className="font-display text-h2 font-semibold uppercase tracking-[-0.01em] text-fog"
          />
          <span className="font-display text-sm text-mute">(01 — 04)</span>
        </div>

        <ul className="border-t border-line">
          {SERVICES.map((s, i) => (
            <li
              key={s.slug}
              className="group border-b border-line"
            >
              <a
                href={`/uslugi/${s.slug}`}
                data-cursor="hover"
                className="grid grid-cols-12 items-center gap-4 py-8 md:py-10"
              >
                <span className="col-span-2 font-display text-sm text-mute md:col-span-1">
                  0{i + 1}
                </span>
                <h3 className="col-span-10 font-display text-2xl font-medium text-fog transition-colors duration-300 group-hover:text-accent md:col-span-5 md:text-4xl">
                  {s.title}
                </h3>
                <p className="col-span-12 text-mute md:col-span-5 md:col-start-8 md:text-right md:text-pretty">
                  {s.summary}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
