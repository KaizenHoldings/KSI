import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactSection } from "@/components/sections/contact-section";

export default function ContactPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main id="contenido" className="flex-1 pt-[var(--header-height)]">
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
