import { MeetingRequestForm } from "@/components/sections/meeting-request-form";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

export function ContactSection() {
  return (
    <Section
      id={sectionIds.contact}
      tone="neutral"
      density="tight"
      labelledBy="contact-title"
    >
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-10">
          <SectionHeading
            id="contact-title"
            kicker={contactContent.eyebrow}
            title={contactContent.title}
            lead={contactContent.lead}
            align="center"
          />

          <RevealGroup delay={0.08} className="w-full">
            <RevealItem>
              <MeetingRequestForm />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
