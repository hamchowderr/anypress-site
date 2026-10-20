import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Headlines: a friendly grotesque, used at a calm weight.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Body text.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anypress.io"),
  title: { default: "AnyPress: websites that arrive ready to use", template: "%s · AnyPress" },
  description:
    "AnyPress is WordPress, set up and looked after for you. Pick a website, bookings, a shop or a members' area, and it arrives ready to use. No cut of your sales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
