import { Container } from "@/components/ui/container";
import { CreativeButton } from "@/components/ui/creative-button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ctaContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

export function CtaSection() {
  return (
    <Section tone="accent" density="tight" labelledBy="cta-title">
      <Container>
        <RevealGroup className="mx-auto max-w-2xl text-center">
          <RevealItem as="span">
            <h2
              id="cta-title"
              className="text-[clamp(1.6rem,1.1rem+2.2vw,2.35rem)] font-bold text-white"
            >
              {ctaContent.title}
            </h2>
          </RevealItem>

          {/* Full white, not the tinted secondary: on the teal-dark band only
              pure white clears 4.5:1 at this size. */}
          <RevealItem
            as="p"
            className="mx-auto mt-4 max-w-[54ch] text-[1.03rem] leading-relaxed text-white"
          >
            {ctaContent.lead}
          </RevealItem>

          <RevealItem className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CreativeButton
              href={`#${sectionIds.contact}`}
              label={ctaContent.primaryAction}
              variant="onTeal"
              size="lg"
              className="w-full sm:w-auto"
            />

            <CreativeButton
              href={`#${sectionIds.services}`}
              label={ctaContent.secondaryAction}
              variant="onTeal"
              tone="subtle"
              size="lg"
              className="w-full sm:w-auto"
            />
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}
