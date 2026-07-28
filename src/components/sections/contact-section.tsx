import { MeetingRequestForm } from "@/components/sections/meeting-request-form";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactConfig } from "@/config/site";
import { contactContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contactConfig.office.mapQuery,
)}&output=embed`;

export function ContactSection() {
  return (
    <Section
      id={sectionIds.contact}
      tone="neutral"
      density="loose"
      labelledBy="contact-title"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <RevealGroup>
            <RevealItem>
              <SectionHeading
                id="contact-title"
                kicker={contactContent.eyebrow}
                title={contactContent.title}
                lead={contactContent.lead}
              />
            </RevealItem>

            <RevealItem as="ul" className="mt-9 grid gap-3">
              <li>
                <a
                  href={contactConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-md border border-line bg-white px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-teal hover:shadow-[var(--shadow-subtle)]"
                >
                  <Icon
                    name="whatsapp"
                    className="mt-0.5 h-6 w-6 text-teal transition-colors duration-300 group-hover:text-navy"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-[0.95rem] font-semibold text-navy">
                      {contactContent.whatsappTitle}
                    </span>
                    <span className="mt-0.5 block text-[0.93rem] text-content-secondary transition-colors duration-300 group-hover:text-teal-dark">
                      {contactConfig.whatsapp.label}
                    </span>
                    <span className="mt-1 block text-[0.8rem] text-muted">
                      {contactContent.whatsappHint}
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-4 rounded-md border border-line bg-white px-5 py-4">
                <Icon name="pin" className="mt-0.5 h-6 w-6 text-teal" />
                <span className="min-w-0">
                  <span className="block font-display text-[0.95rem] font-semibold text-navy">
                    {contactContent.officeTitle}
                  </span>
                  <address className="mt-0.5 text-[0.93rem] leading-relaxed text-content-secondary not-italic">
                    {contactConfig.office.label}
                  </address>
                  <span className="mt-1 block text-[0.8rem] text-muted">
                    {contactContent.officeHint}
                  </span>
                </span>
              </li>
            </RevealItem>

            <RevealItem className="mt-6">
              <div className="overflow-hidden rounded-md border border-line bg-tint shadow-[var(--shadow-subtle)]">
                <iframe
                  src={mapSrc}
                  title={contactContent.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block aspect-16/9 w-full border-0"
                />
              </div>
            </RevealItem>
          </RevealGroup>

          <RevealGroup delay={0.08}>
            <RevealItem>
              <MeetingRequestForm />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
