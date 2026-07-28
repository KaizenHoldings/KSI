import { AudienceTabs } from "@/components/sections/audience-tabs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { advantagesContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

export function AdvantagesSection() {
  return (
    <Section
      id={sectionIds.advantages}
      tone="inverse"
      density="loose"
      labelledBy="advantages-title"
    >
      <Container>
        <SectionHeading
          id="advantages-title"
          kicker={advantagesContent.eyebrow}
          title={advantagesContent.title}
          lead={advantagesContent.lead}
          tone="dark"
        />

        <div className="mt-11">
          <AudienceTabs tracks={advantagesContent.tracks} />
        </div>
      </Container>
    </Section>
  );
}
