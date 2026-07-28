import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { servicesContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

/**
 * The service catalogue reads as a ruled list, not a grid of tiles: hairlines
 * and a shared baseline let six entries be scanned in one pass and keep the
 * card treatment reserved for the sections that earn it.
 */
export function ServicesSection() {
  return (
    <Section id={sectionIds.services} tone="soft" labelledBy="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          kicker={servicesContent.eyebrow}
          title={servicesContent.title}
          lead={servicesContent.lead}
        />

        <RevealGroup
          as="ol"
          stagger={0.06}
          className="mt-12 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-12 lg:mt-16 lg:gap-x-20"
        >
          {servicesContent.items.map((service, index) => (
            <RevealItem
              key={service.id}
              as="li"
              className="group relative border-b border-line py-7 sm:py-8"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Number and glyph share one rail so every title starts on the
                    same vertical line down the whole list. */}
                <span className="flex shrink-0 flex-col items-center gap-2.5 pt-0.5">
                  <Icon
                    name={service.icon}
                    className="h-6 w-6 text-teal transition-colors duration-300 group-hover:text-navy"
                  />
                  <span
                    aria-hidden="true"
                    className="tabular font-display text-[0.72rem] font-semibold tracking-[0.08em] text-muted transition-colors duration-300 group-hover:text-teal-dark"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.06rem] font-bold transition-colors duration-300 group-hover:text-teal-dark">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-content-secondary">
                    {service.description}
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-teal transition-transform duration-400 ease-[var(--ease-brand)] group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
