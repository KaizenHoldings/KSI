/**
 * DIRECTION CONTRACT — KFG Sociedad de Inversión (Persuade)
 *
 * THESIS: KFG's only provable differentiator is regulated structure, so the page
 * is built as a ruled instrument — hairlines, a shared baseline, a drawn process
 * rail — and refuses the category default of five identical icon-card grids and
 * the invented hero metric.
 *
 * OWN-WORLD: Navy and white ground, teal reserved as an accent, tint and pearl
 * for breathing bands. Sora display over Inter reading copy. Rounded 14px
 * containers, pill actions, hairline dividers, soft navy-tinted shadows,
 * one 24px line-icon family.
 *
 * STORY: A regulated Venezuelan investment entity that structures capital ->
 * supervised by SUNAVAL, settled via the Caja Venezolana de Valores -> book a
 * meeting. No self-serve flow, no yield promise.
 *
 * FIRST VIEWPORT: Full-bleed brand gradient over corporate architecture, one
 * headline with a single teal-light emphasis, lead line, two actions, and a
 * regulatory credential strip anchored to the fold instead of statistics.
 *
 * FORM: Institutional ledger. The visual world is pinned by BRAND.md and
 * ksi_reference.html, so no concept roll was run — the brief already committed
 * the palette, the two type families and the section order.
 */

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { AdvantagesSection } from "@/components/sections/advantages-section";
import { ComplianceSection } from "@/components/sections/compliance-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="contenido" className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SectorsSection />
        <ProcessSection />
        <AdvantagesSection />
        <ComplianceSection />
        <CtaSection />
        <FaqSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
