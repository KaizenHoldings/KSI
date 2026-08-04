import { ProcessRail } from "@/components/sections/process-rail";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function CubesPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id="cubes-steps" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(1.75)">
          <g id="c-steps">
            <polygon points="0,-34.641 30,-17.321 0,0 -30,-17.321" fill="currentColor" className="opacity-[0.01]" />
            <polygon points="0,0 30,-17.321 30,17.321 0,34.641" fill="currentColor" className="opacity-[0.02]" />
            <polygon points="0,0 0,34.641 -30,17.321 -30,-17.321" fill="currentColor" className="opacity-[0.03]" />
          </g>
          <use href="#c-steps" x="0" y="0" />
          <use href="#c-steps" x="60" y="0" />
          <use href="#c-steps" x="30" y="51.9615" />
          <use href="#c-steps" x="0" y="103.923" />
          <use href="#c-steps" x="60" y="103.923" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cubes-steps)" />
    </svg>
  );
}

export function ProcessSteps() {
  return (
    <Section tone="neutral" density="loose" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none text-navy opacity-50">
        <CubesPattern className="w-full h-full" />
      </div>
      <Container className="relative z-10">
        <ProcessRail />
      </Container>
    </Section>
  );
}
