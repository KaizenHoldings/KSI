import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { regulatoryConfig } from "@/config/site";
import { complianceContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

/**
 * The trust argument of the whole site. It carries the regulatory citation in
 * full because that, not any yield figure, is what KFG can actually prove.
 */
export function ComplianceSection() {
  return (
    <Section id={sectionIds.compliance} labelledBy="compliance-title">
      <Container>
        <SectionHeading
          id="compliance-title"
          kicker={complianceContent.eyebrow}
          title={complianceContent.title}
          lead={complianceContent.lead}
          align="center"
        />

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {complianceContent.items.map((item) => (
            <RevealItem
              key={item.id}
              as="li"
              className="group flex flex-col bg-white px-7 py-8 transition-colors duration-300 hover:bg-tint"
            >
              <Icon
                name={item.icon}
                className="h-6 w-6 text-teal transition-colors duration-300 group-hover:text-navy"
              />
              <h3 className="mt-5 text-[1rem] font-bold">{item.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-content-secondary">
                {item.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-8">
          <RevealItem>
            <p className="mx-auto max-w-[76ch] text-center text-[0.9rem] leading-relaxed text-content-secondary">
              KFG Sociedad de Inversión opera bajo la{" "}
              <strong className="font-semibold text-navy">
                {regulatoryConfig.law}
              </strong>
              , supervisada por la {regulatoryConfig.supervisor} y con
              liquidación a través de la {regulatoryConfig.settlement}.
            </p>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
