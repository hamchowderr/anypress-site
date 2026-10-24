import type { Metadata } from "next";
import { Caveat, Hanken_Grotesk } from "next/font/google";
import { ANIM_BOOT, DrawAnimator } from "@/components/DrawAnimator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
  title: { default: "AnyPress: your business deserves a real website", template: "%s · AnyPress" },
  description:
    "AnyPress is WordPress, set up and looked after for you. Pick a website, bookings, a shop or a members' area, and it arrives ready to use. From $12 a month, no cut of your sales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${caveat.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <DrawAnimator />
      </body>
    </html>
  );
}
