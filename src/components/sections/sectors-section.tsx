import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectorsContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

export function SectorsSection() {
  return (
    <Section id={sectionIds.sectors} labelledBy="sectors-title" className="relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(135deg, rgba(15, 23, 42, 0.03) 0px, rgba(15, 23, 42, 0.03) 60px, rgba(15, 23, 42, 0.015) 70px, rgba(15, 23, 42, 0) 130px)'
        }}
      />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:items-end lg:gap-16">
          <SectionHeading
            id="sectors-title"
            kicker={sectorsContent.eyebrow}
            title={sectorsContent.title}
            lead={sectorsContent.lead}
          />

          <RevealGroup
            as="ul"
            stagger={0.055}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
          >
            {sectorsContent.items.map((sector) => (
              <RevealItem
                key={sector.id}
                as="li"
                // Five sectors never divide evenly into two or three columns,
                // so the last cell stretches instead of leaving a blank track.
                className="group flex min-h-30 flex-col items-center justify-center gap-3 bg-white px-3 py-6 text-center transition-colors duration-300 last:col-span-2 hover:bg-tint lg:last:col-span-1"
              >
                <Icon
                  name={sector.icon}
                  className="h-6 w-6 text-teal transition-colors duration-300 group-hover:text-navy"
                />
                <h3 className="font-display text-[0.9rem] font-semibold text-navy">
                  {sector.title}
                </h3>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
