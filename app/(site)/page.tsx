import SiteHeader from "@/components/sections/SiteHeader";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CasesMarquee from "@/components/sections/CasesMarquee";
import Manifesto from "@/components/sections/Manifesto";
import ContactCTA from "@/components/sections/ContactCTA";
import SiteFooter from "@/components/sections/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <CasesMarquee />
        <Manifesto />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
