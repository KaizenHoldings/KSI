import Image from "next/image";

import { HeroIntro } from "@/components/sections/hero-intro";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { heroContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

/**
 * First viewport. The offer is stated once, the single action is visible
 * immediately, and the proof underneath is regulatory rather than numeric —
 * KFG has no published returns and must not imply any.
 */
export function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="on-inverse bg-gradient-brand relative isolate overflow-hidden text-white"
    >
      {/* Corporate architecture sits behind the gradient as depth, never as a
          surface the visitor has to read text against. */}
      <Image
        src="/images/image2.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 object-cover object-center opacity-[0.16]"
      />
      {/* Two scrims: one settles the whole frame, one keeps the reading side
          calm so the headline never competes with the architecture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_40_60/0.5)_0%,rgb(0_40_60/0.3)_45%,rgb(0_40_60/0.78)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(0_40_60/0.62)_0%,rgb(0_40_60/0.34)_46%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 -right-40 -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgb(125_184_192/0.2),transparent_68%)]"
      />

      <Container className="relative flex min-h-[max(33rem,78svh)] flex-col justify-center pt-[calc(var(--header-height)+3rem)] pb-14 sm:pb-16">
        <HeroIntro />
      </Container>

      <div className="relative border-t border-white/12 bg-navy/40 backdrop-blur-[2px]">
        <Container>
          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
            <h2 className="font-display text-[0.68rem] font-semibold tracking-[0.2em] text-teal-light uppercase">
              {heroContent.credentialsLabel}
            </h2>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {heroContent.credentials.map((credential) => (
                <li
                  key={credential}
                  className="flex items-center gap-2 text-[0.875rem] text-on-inverse-secondary"
                >
                  <Icon
                    name="check"
                    className="h-3.5 w-3.5 text-teal-light"
                    strokeWidth={2.4}
                  />
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
