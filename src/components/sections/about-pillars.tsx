import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { aboutContent } from "@/content/home";

function CubesPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id="cubes" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(1.75)">
          <g id="c">
            <polygon points="0,-34.641 30,-17.321 0,0 -30,-17.321" fill="currentColor" className="opacity-[0.01]" />
            <polygon points="0,0 30,-17.321 30,17.321 0,34.641" fill="currentColor" className="opacity-[0.02]" />
            <polygon points="0,0 0,34.641 -30,17.321 -30,-17.321" fill="currentColor" className="opacity-[0.03]" />
          </g>
          <use href="#c" x="0" y="0" />
          <use href="#c" x="60" y="0" />
          <use href="#c" x="30" y="51.9615" />
          <use href="#c" x="0" y="103.923" />
          <use href="#c" x="60" y="103.923" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cubes)" />
    </svg>
  );
}

export function AboutPillars() {
  return (
    <Section id="pillars" className="relative overflow-hidden" density="tight">
      <div className="absolute inset-0 pointer-events-none text-navy">
        <CubesPattern className="w-full h-full" />
      </div>

      <Container className="relative z-10">
        <RevealGroup
          as="ul"
          className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
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
