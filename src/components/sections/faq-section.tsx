import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

export function FaqSection() {
  return (
    <Section id={sectionIds.faq} tone="soft" labelledBy="faq-title">
      <Container>
        <SectionHeading
          id="faq-title"
          kicker={faqContent.eyebrow}
          title={faqContent.title}
          lead={faqContent.lead}
          align="center"
        />

        <div className="mt-12 lg:mt-14">
          <FaqAccordion entries={faqContent.entries} />
        </div>
      </Container>
    </Section>
  );
}
