import { BrandLockup } from "@/components/layout/brand-lockup";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import {
  contactConfig,
  legalConfig,
  regulatoryConfig,
  siteConfig,
} from "@/config/site";
import { footerContent } from "@/content/home";
import { footerNav } from "@/content/navigation";

const regulatoryFacts = [
  regulatoryConfig.supervisor,
  regulatoryConfig.settlement,
  regulatoryConfig.law,
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-inverse bg-navy text-on-inverse-secondary">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-20">
          <div>
            <BrandLockup tone="dark" size="md" />
            <p className="mt-6 max-w-[46ch] text-[0.92rem] leading-relaxed text-on-inverse-tertiary">
              {footerContent.description}
            </p>

            <a
              href={contactConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center gap-2.5 rounded-sm py-2 font-display text-[0.9rem] font-semibold text-teal-light transition-colors duration-200 hover:text-white"
            >
              <Icon name="whatsapp" className="h-[1.05rem] w-[1.05rem]" />
              {contactConfig.whatsapp.label}
            </a>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="font-display text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase">
              {footerContent.navTitle}
            </h2>
            <ul className="mt-4 grid">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-sm text-[0.9rem] text-on-inverse-tertiary transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase">
              {footerContent.regulationTitle}
            </h2>
            <ul className="mt-5 grid gap-3">
              {regulatoryFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-on-inverse-tertiary"
                >
                  <Icon
                    name="check"
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-teal-light"
                    strokeWidth={2.4}
                  />
                  {fact}
                </li>
              ))}
            </ul>

            <address className="mt-6 text-[0.88rem] leading-relaxed text-on-inverse-tertiary not-italic">
              {contactConfig.office.label}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-[0.8rem] text-on-inverse-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {legalConfig.rights}
          </p>
          <p>
            Regulados por SUNAVAL · {siteConfig.group}
          </p>
        </div>
      </Container>

      <div className="bg-black/25">
        <Container>
          <p className="py-4 text-center text-[0.78rem] leading-relaxed text-white/55">
            {legalConfig.disclaimer}
          </p>
        </Container>
      </div>
    </footer>
  );
}
