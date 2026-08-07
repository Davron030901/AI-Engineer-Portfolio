import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { ui } from "@/content/ui";
import { links, person } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { DEFAULT_LOCALE } from "@/lib/types";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { ThemeProvider, themeScript } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: ui.meta.title[DEFAULT_LOCALE],
    template: `%s — ${person.name}`,
  },
  description: ui.meta.description[DEFAULT_LOCALE],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: person.name,
    title: ui.meta.title[DEFAULT_LOCALE],
    description: ui.meta.description[DEFAULT_LOCALE],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: ui.meta.title[DEFAULT_LOCALE] }],
  },
  twitter: {
    card: "summary_large_image",
    title: ui.meta.title[DEFAULT_LOCALE],
    description: ui.meta.description[DEFAULT_LOCALE],
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#090c13" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: siteUrl,
  jobTitle: ui.hero.role[DEFAULT_LOCALE],
  description: ui.meta.description[DEFAULT_LOCALE],
  sameAs: [links.github, links.linkedin, links.telegram].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        {/* Must run before first paint — see ThemeProvider. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LocaleProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
