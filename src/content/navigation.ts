import type { NavLink } from "@/types/content";

export const sectionIds = {
  hero: "inicio",
  about: "nosotros",
  services: "servicios",
  sectors: "sectores",
  process: "proceso",
  advantages: "ventajas",
  compliance: "cumplimiento",
  faq: "faq",
  contact: "contacto",
} as const;

export const primaryNav: readonly NavLink[] = [
  { href: `#${sectionIds.about}`, label: "Nosotros" },
  { href: `#${sectionIds.services}`, label: "Servicios" },
  { href: `#${sectionIds.process}`, label: "Proceso" },
  { href: `#${sectionIds.advantages}`, label: "Ventajas" },
  { href: `#${sectionIds.faq}`, label: "Preguntas" },
  { href: `#${sectionIds.contact}`, label: "Contacto" },
];

export const footerNav: readonly NavLink[] = [
  { href: `#${sectionIds.hero}`, label: "Inicio" },
  { href: `#${sectionIds.about}`, label: "Quiénes somos" },
  { href: `#${sectionIds.services}`, label: "Servicios" },
  { href: `#${sectionIds.sectors}`, label: "Sectores" },
  { href: `#${sectionIds.process}`, label: "Cómo funciona" },
  { href: `#${sectionIds.advantages}`, label: "Ventajas" },
  { href: `#${sectionIds.faq}`, label: "Preguntas frecuentes" },
  { href: `#${sectionIds.contact}`, label: "Contacto" },
];

export const primaryCta = {
  label: "Agende una reunión",
  href: `#${sectionIds.contact}`,
} as const;
