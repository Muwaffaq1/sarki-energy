import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Annotator } from "@/components/dev/Annotator";
import { site } from "@/content/site";
import "../styles/tokens.css";
import "./globals.css";

const hostGrotesk = localFont({
  src: "../fonts/HostGrotesk-Variable.ttf",
  weight: "300 800",
  style: "normal",
  display: "swap",
  variable: "--font-host",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Sarki Energy" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" className={hostGrotesk.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        {/* Click-to-note design annotations, dev server only */}
        {process.env.NODE_ENV === "development" && <Annotator />}
      </body>
    </html>
  );
}
