import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";
import { regulatoryConfig } from "@/config/site";

export function AboutSection() {
  return (
    <Section id={sectionIds.about} labelledBy="about-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <RevealGroup className="order-2 lg:order-1">
            <RevealItem>
              <figure className="relative">
                <div className="relative overflow-hidden rounded-lg bg-tint">
                  <Image
                    src="/images/image1.jpg"
                    alt={aboutContent.imageAlt}
                    width={1200}
                    height={1500}
                    sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 92vw"
                    className="aspect-4/5 w-full object-cover object-[62%_center]"
                  />
                </div>
                <figcaption className="mt-3 flex items-center gap-2.5 font-display text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
                  {aboutContent.imageCaption}
                </figcaption>
              </figure>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="order-1 lg:order-2">
            <RevealItem>
              <SectionHeading
                id="about-title"
                kicker={aboutContent.eyebrow}
                title={aboutContent.title}
              />
            </RevealItem>

            {aboutContent.paragraphs.map((paragraph) => (
              <RevealItem
                key={paragraph.slice(0, 32)}
                as="p"
                className="mt-5 max-w-[62ch] text-[1.03rem] leading-relaxed text-content-secondary"
              >
                {paragraph}
              </RevealItem>
            ))}

            <RevealItem>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
                {[
                  { term: "Supervisión", detail: "SUNAVAL" },
                  { term: "Liquidación", detail: regulatoryConfig.settlement },
                  { term: "Marco legal", detail: "G.O. 36.027 (1996)" },
                ].map((entry) => (
                  <div key={entry.term} className="bg-white px-5 py-4">
                    <dt className="font-display text-[0.64rem] font-semibold tracking-[0.16em] text-muted uppercase">
                      {entry.term}
                    </dt>
                    <dd className="mt-1.5 font-display text-[0.88rem] leading-snug font-semibold text-navy">
                      {entry.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </RevealGroup>
        </div>

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {aboutContent.pillars.map((pillar) => (
            <RevealItem
              key={pillar.id}
              as="li"
              className="rule-top group pt-6 transition-[border-color] duration-300 hover:border-teal"
            >
              <Icon
                name={pillar.icon}
                className="h-6 w-6 text-teal transition-colors duration-300 group-hover:text-navy"
              />
              <h3 className="mt-4 text-[1.08rem] font-bold">{pillar.title}</h3>
              <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-content-secondary">
                {pillar.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
