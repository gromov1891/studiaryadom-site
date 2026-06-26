import Container from "@/components/ui/Container";
import RevealText from "@/components/animations/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/site";

export default function ContactCTA() {
  return (
    <section id="kontakty" className="py-section">
      <Container>
        <div className="flex flex-col gap-12">
          <RevealText
            as="h2"
            text="Расскажите о проекте"
            className="font-display text-display font-semibold uppercase tracking-[-0.01em] text-fog text-balance"
            stagger={0.05}
          />

          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
            <MagneticButton href={`mailto:${SITE.email}`}>
              Обсудить проект
            </MagneticButton>

            <div className="flex flex-col gap-2 text-lead text-fog/80 md:items-end">
              <a
                href={`mailto:${SITE.email}`}
                data-cursor="hover"
                className="transition-colors hover:text-accent"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                data-cursor="hover"
                className="transition-colors hover:text-accent"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
