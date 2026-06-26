import Container from "@/components/ui/Container";
import RevealText from "@/components/animations/RevealText";

export default function Manifesto() {
  return (
    <section id="studiya" className="py-section">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <span className="col-span-12 font-display text-sm text-mute md:col-span-3">
            О студии
          </span>
          <div className="col-span-12 md:col-span-9">
            <RevealText
              as="p"
              text="Мы не делаем «видео для бизнеса». Мы рассказываем истории так, чтобы их досматривали — и запоминали бренд."
              className="font-display text-display font-medium text-fog text-balance"
              stagger={0.04}
            />
            <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
              {[
                { n: "12", l: "лет в продакшне" },
                { n: "240+", l: "проектов" },
                { n: "60", l: "брендов" },
                { n: "8", l: "человек в команде" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-accent md:text-5xl">
                    {s.n}
                  </div>
                  <div className="mt-2 text-sm text-mute text-pretty">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
