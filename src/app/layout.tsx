import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dannyxs.com"),
  title: {
    default: `${profile.nickname} - ${profile.role}`,
    template: `%s - ${profile.nickname}`,
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.name} (${profile.nickname}) - ${profile.role}`,
    description: profile.intro,
    url: "https://dannyxs.com",
    siteName: profile.nickname,
    images: [{ url: "/brand/hero-art.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} (${profile.nickname})`,
    description: profile.intro,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
