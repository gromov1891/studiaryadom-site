import Container from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-3xl font-semibold uppercase tracking-[0.1em] text-fog">
            {SITE.name}
          </div>
          <p className="mt-3 max-w-xs text-sm text-mute text-pretty">
            {SITE.tagline} в {SITE.city}.
          </p>
        </div>

        <nav className="flex gap-8 text-sm text-mute" aria-label="Подвал">
          <a href="#uslugi" data-cursor="hover" className="hover:text-fog">Услуги</a>
          <a href="#keysy" data-cursor="hover" className="hover:text-fog">Кейсы</a>
          <a href="#studiya" data-cursor="hover" className="hover:text-fog">Студия</a>
          <a href="#kontakty" data-cursor="hover" className="hover:text-fog">Контакты</a>
        </nav>

        <div className="text-sm text-mute">
          © 2025 {SITE.name}
        </div>
      </Container>
    </footer>
  );
}
