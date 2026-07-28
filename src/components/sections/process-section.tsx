import Image from "next/image";

import { ProcessRail } from "@/components/sections/process-rail";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { processContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

export function ProcessSection() {
  return (
    <Section
      id={sectionIds.process}
      tone="neutral"
      density="loose"
      labelledBy="process-title"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <RevealGroup>
            <RevealItem>
              <SectionHeading
                id="process-title"
                kicker={processContent.eyebrow}
                title={processContent.title}
                lead={processContent.lead}
              />
            </RevealItem>
          </RevealGroup>

          <RevealGroup>
            <RevealItem>
              <figure>
                {/* Framed on the chart texture in the lower-left of the photo.
                    The screen's own legible figures are cropped out on purpose:
                    they belong to another product and must never read as KFG's
                    results. */}
                <div className="relative aspect-16/9 overflow-hidden rounded-lg border border-line bg-white shadow-[var(--shadow-raised)]">
                  <Image
                    src="/images/image3.jpg"
                    alt={processContent.imageAlt}
                    width={2947}
                    height={2121}
                    sizes="(min-width: 1024px) 125vw, 250vw"
                    className="absolute bottom-0 left-[-5.3%] h-auto w-[263%] max-w-none"
                  />
                </div>
                <figcaption className="mt-3 max-w-[52ch] text-[0.88rem] leading-relaxed text-content-secondary">
                  {processContent.imageCaption}
                </figcaption>
              </figure>
            </RevealItem>
          </RevealGroup>
        </div>

        <div className="mt-16 lg:mt-24">
          <ProcessRail />
        </div>
      </Container>
    </Section>
  );
}
