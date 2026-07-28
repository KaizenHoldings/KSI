/**
 * Central site configuration.
 *
 * Only facts confirmed in the project brief live here. Nothing in this file may
 * be invented: contact data, regulatory references and the brand name are taken
 * verbatim from PRODUCT.md and ksi_reference.html.
 */

export const siteConfig = {
  name: "KFG Sociedad de Inversión",
  shortName: "KFG",
  group: "Kaizen Financial Group",
  locale: "es-VE",
  description:
    "KFG Sociedad de Inversión. Estructuramos, gestionamos y acompañamos inversiones con enfoque financiero, legal y operativo, bajo supervisión de la SUNAVAL.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kfg.com.ve",
} as const;

export const contactConfig = {
  whatsapp: {
    label: "+1 305 697 5259",
    /** E.164 without symbols, as required by the wa.me deep link format. */
    number: "13056975259",
    href: "https://wa.me/13056975259",
  },
  office: {
    label: "Torre Caracas Campus, Piso 4, La Trinidad, Caracas, Venezuela",
    mapQuery: "Torre Caracas Campus, La Trinidad, Caracas",
  },
} as const;

export const regulatoryConfig = {
  supervisor: "SUNAVAL — Superintendencia Nacional de Valores",
  settlement: "Caja Venezolana de Valores",
  law: "Ley de Entidades de Inversión Colectiva (G.O. 36.027, 1996)",
} as const;

export const legalConfig = {
  disclaimer:
    "La información presentada en este sitio no constituye oferta pública de valores ni asesoría de inversión. Toda inversión implica riesgos.",
  rights: "Todos los derechos reservados.",
} as const;
