import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { SVGFilters } from "@/components/SVGFilters";
import { Footer } from "@/components/Footer";
import { createClient } from "@/prismicio";

const bowlby = Bowlby_One_SC({
  variable: "--font-bowlby-sc",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        <main>{children}</main>
        <SVGFilters />
      </body>
    </html>
  );
}
