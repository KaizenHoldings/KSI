"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";
import { regulatoryConfig } from "@/config/site";

export function AboutSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The photo settles into place from the left as the visitor scrolls it into
  // view — driven directly by scroll position (not a fixed-duration entrance),
  // so it tracks scroll speed and direction the way the referenced effect does.
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "center 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    restDelta: 0.001,
  });
  const imageX = useTransform(progress, [0, 1], ["-45%", "0%"]);
  const imageOpacity = useTransform(progress, [0, 1], [0, 1]);

  return (
    <Section id={sectionIds.about} labelledBy="about-title" className="!py-0">
      <div className="relative">
        {/* Desktop full-bleed image (Left half) */}
        <div
          ref={imageWrapRef}
          className="hidden lg:block absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        >
          <motion.div
            style={prefersReducedMotion ? undefined : { x: imageX, opacity: imageOpacity }}
            className="absolute inset-0"
          >
            <Image
              src="/images/image1.jpg"
              alt={aboutContent.imageAlt}
              fill
              sizes="50vw"
              className="object-cover object-[62%_center]"
            />
          </motion.div>
          {/* Floating caption */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3 font-display text-[0.75rem] font-semibold tracking-[0.14em] text-white shadow-sm uppercase z-10">
            <span aria-hidden="true" className="h-px w-6 bg-white/60" />
            {aboutContent.imageCaption}
          </div>
        </div>

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24 min-h-[100dvh] py-20 lg:py-28">
            {/* Mobile image (hidden on desktop) */}
            <RevealGroup className="order-2 lg:hidden">
              <RevealItem>
                <figure className="relative">
                  <div className="relative overflow-hidden rounded-lg bg-tint">
                    <Image
                      src="/images/image1.jpg"
                      alt={aboutContent.imageAlt}
                      width={1200}
                      height={1500}
                      sizes="(min-width: 640px) 70vw, 92vw"
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

            {/* Spacer for desktop to match the absolute left-half image */}
            <div className="hidden lg:block" aria-hidden="true" />

          <RevealGroup className="order-1 lg:order-2">
            <SectionHeading
              id="about-title"
              kicker={aboutContent.eyebrow}
              title={aboutContent.title}
            />

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
        </Container>
      </div>

    </Section>
  );
}
