"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { HeroIntro } from "@/components/sections/hero-intro";
import { Container } from "@/components/ui/container";
import { NodeNetwork } from "@/components/ui/node-network";
import { sectionIds } from "@/content/navigation";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * First viewport. The offer is stated once, and the single action is visible
 * immediately in a full-screen layout.
 *
 * The section pins for an extra viewport of scroll: the photographic backdrop
 * slowly zooms and blurs away — the informal, unstructured scene receding —
 * while the network of connections and the offer itself soften and lift clear
 * on the same timeline, handing off to the ruled, hairline world the rest of
 * the page is built from. One authored moment, not a decoration repeated per
 * section. Scroll drives a spring rather than the raw scroll value: a filter
 * this heavy repaints every frame, and smoothing it is what keeps the effect
 * from reading as a stutter instead of a motion.
 */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const reduceMotion = hydrated ? prefersReducedMotion : false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    restDelta: 0.001,
  });

  // The backdrop starts already oversized (see the -inset-[10%] wrapper below)
  // so the blur radius never has to sample past the image into empty space —
  // that gap is what reads as a hard, wrong-looking edge.
  const backdropScale = useTransform(progress, [0, 1], [1, 1.2]);
  const backdropBlur = useTransform(progress, [0, 1], [0, 26]);
  const backdropFilter = useTransform(backdropBlur, (value) => `blur(${value}px)`);
  const backdropOpacity = useTransform(progress, [0, 1], [1, 0.3]);

  // Foreground fades and softens on the same [0, 1] span as the backdrop
  // instead of finishing early — the two layers were drifting out of sync,
  // which is what made the handoff feel abrupt rather than one motion.
  const foregroundOpacity = useTransform(progress, [0.1, 0.9], [1, 0]);
  const foregroundBlur = useTransform(progress, [0, 1], [0, 6]);
  const foregroundFilter = useTransform(foregroundBlur, (value) => `blur(${value}px)`);
  const foregroundY = useTransform(progress, [0, 1], [0, -160]);

  const backdropStyle = reduceMotion
    ? undefined
    : {
        scale: backdropScale,
        filter: backdropFilter,
        opacity: backdropOpacity,
        willChange: "transform, filter, opacity",
      };
  // The network stays crisp while it's visible — only fading, no blur or lift
  // — so it reads as the one plane that stays in focus while the photo behind
  // it and the text in front of it both soften away.
  const networkStyle = reduceMotion
    ? undefined
    : { opacity: foregroundOpacity, willChange: "opacity" };
  const contentStyle = reduceMotion
    ? undefined
    : {
        opacity: foregroundOpacity,
        y: foregroundY,
        filter: foregroundFilter,
        willChange: "transform, filter, opacity",
      };

  return (
    <section
      ref={containerRef}
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative h-[200vh]"
    >
      <div className="on-inverse bg-gradient-brand sticky top-0 isolate flex h-dvh flex-col justify-between overflow-hidden text-white">
        {/* Corporate architecture sits behind the gradient as depth, never as a
            surface the visitor has to read text against. It recedes on scroll
            instead of sitting inert once the visitor commits to the page. */}
        <motion.div
          aria-hidden="true"
          style={backdropStyle}
          className="pointer-events-none absolute -inset-[10%] -z-10"
        >
          <Image
            src="/images/image2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.16]"
          />
          {/* Two scrims: one settles the whole frame, one keeps the reading side
              calm so the headline never competes with the architecture. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_40_60/0.5)_0%,rgb(0_40_60/0.3)_45%,rgb(0_40_60/0.78)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(0_40_60/0.62)_0%,rgb(0_40_60/0.34)_46%,transparent_78%)]" />
          <div className="absolute top-[10%] right-[10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgb(125_184_192/0.2),transparent_68%)]" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={networkStyle}
          className="pointer-events-none absolute inset-0"
        >
          <NodeNetwork />
        </motion.div>

        <motion.div
          style={contentStyle}
          className="relative z-10 flex flex-1 flex-col justify-center pt-[calc(var(--header-height)+2rem)] pb-10 sm:pt-[calc(var(--header-height)+3rem)] sm:pb-14"
        >
          <Container>
            <HeroIntro />
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
