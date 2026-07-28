import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

/**
 * Sora carries display, navigation, labels and buttons; Inter carries reading
 * copy. These are the only two families the brand allows.
 */
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const pageTitle = `${siteConfig.name} | Inversión estructurada en Venezuela`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "sociedad de inversión",
    "SUNAVAL",
    "mercado de valores venezolano",
    "estructuración de inversiones",
    "financiamiento empresarial",
    "Caja Venezolana de Valores",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.group,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: pageTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#00283C",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-VE"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Entrance animations are an enhancement: without scripting every
            revealed block must still render at full opacity. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
