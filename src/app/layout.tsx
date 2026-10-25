import type { Metadata } from "next";
import { Caveat, Hanken_Grotesk } from "next/font/google";
import { ANIM_BOOT, DrawAnimator } from "@/components/DrawAnimator";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { BASE_URL } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";
import "./globals.css";
import "./sketch.css";

// Everything except the handwriting: a friendly grotesque, heavy for headlines.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

// Handwritten notes next to the drawings.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anypress.io"),
  title: { default: "AnyPress: managed WordPress, set up and looked after for you", template: "%s · AnyPress" },
  description:
    "AnyPress is WordPress, set up and looked after for you. Pick a website, bookings, a shop or a members' area, and it arrives ready to use. From $12 a month, no cut of your sales.",
  applicationName: "AnyPress",
  formatDetection: { telephone: false, email: false, address: false },
};

// Who we are, for search engines: shown once, on every page.
const ORG_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#org`,
    name: "AnyPress",
    url: BASE_URL,
    logo: `${BASE_URL}/logo-512.png`,
    email: CONTACT_EMAIL,
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL, availableLanguage: "English" },
  },
  { "@context": "https://schema.org", "@type": "WebSite", "@id": `${BASE_URL}/#site`, name: "AnyPress", url: BASE_URL, publisher: { "@id": `${BASE_URL}/#org` } },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${caveat.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={ORG_LD} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <DrawAnimator />
      </body>
    </html>
  );
}
