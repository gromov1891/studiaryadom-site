import Container from "@/components/ui/Container";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Услуги", href: "#uslugi" },
  { label: "Кейсы", href: "#keysy" },
  { label: "Студия", href: "#studiya" },
  { label: "Контакты", href: "#kontakty" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <Container className="flex items-center justify-between py-6">
        <a
          href="#"
          data-cursor="hover"
          className="font-display text-lg font-semibold uppercase tracking-[0.15em] text-fog"
        >
          {SITE.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основное меню">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-cursor="hover"
              className="text-sm text-fog/80 transition-colors hover:text-fog"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakty"
          data-cursor="hover"
          className="hidden text-sm text-fog md:inline-block"
        >
          {SITE.city}
        </a>
      </Container>
    </header>
  );
}
