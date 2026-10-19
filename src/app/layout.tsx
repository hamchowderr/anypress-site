import type { Metadata } from "next";
import { Anybody, Atkinson_Hyperlegible_Next } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Headlines and step numbers: a heavy grotesque that widens, like the numbers in an assembly booklet.
const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Body text: built for easy reading.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anypress.io"),
  title: { default: "AnyPress: pick a website, we'll put it together", template: "%s · AnyPress" },
  description:
    "AnyPress is WordPress, set up and looked after for you. Pick a website, a shop, bookings or a members' area, and we hand it over ready to use. No cut of your sales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anybody.variable} ${atkinson.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
