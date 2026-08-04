"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { imageRevealVariants, viewportRepeat } from "@/config/motion";
import { processContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";
import { useMotionVariants } from "@/hooks/use-motion-variants";

export function ProcessSection() {
  const imageVariants = useMotionVariants(imageRevealVariants);

  return (
    <Section
      id={sectionIds.process}
      tone="neutral"
      labelledBy="process-title"
      className="!py-0"
    >
      <div className="relative">
        {/* Desktop full-bleed image (Right half) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
            variants={imageVariants}
            className="absolute inset-0"
          >
            <Image
              src="/images/newsection2.jpg"
              alt={processContent.imageAlt}
              fill
              sizes="50vw"
              className="object-cover object-[50%_35%]"
            />
          </motion.div>
          {/* Floating caption aligned to the left side of the image */}
          <div className="absolute bottom-8 left-12 right-12 flex items-center gap-6 font-display text-[0.75rem] font-semibold tracking-[0.14em] text-white shadow-sm uppercase z-10">
            <span className="text-left leading-relaxed max-w-[50ch]">
              {processContent.imageCaption}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-white/60 shrink-0" />
          </div>
        </div>

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24 min-h-[100dvh] py-20 lg:py-28">
            
            {/* Text Content (Left side) */}
            <div className="order-1">
              <SectionHeading
                id="process-title"
                kicker={processContent.eyebrow}
                title={processContent.title}
                lead={processContent.lead}
              />
            </div>

            {/* Mobile image (hidden on desktop) */}
            <RevealGroup className="order-2 lg:hidden">
              <RevealItem>
                <figure className="relative">
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-tint shadow-[var(--shadow-raised)]">
                    <Image
                      src="/images/newsection2.jpg"
                      alt={processContent.imageAlt}
                      fill
                      sizes="(min-width: 640px) 70vw, 92vw"
                      className="object-cover object-[50%_35%]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center gap-2.5 font-display text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
                    {processContent.imageCaption}
                  </figcaption>
                </figure>
              </RevealItem>
            </RevealGroup>

            {/* Spacer for desktop to match the absolute right-half image */}
            <div className="hidden lg:block order-2" aria-hidden="true" />
          </div>
        </Container>
      </div>
    </Section>
  );
}
