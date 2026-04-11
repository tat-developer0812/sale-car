import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LazyWidgets } from "@/components/widgets/LazyWidgets";
import { GoogleAnalytics } from "@/components/analytics";
import { OrganizationJsonLd } from "@/components/seo";
import { SkipToContent } from "@/components/common";
import { ThemeProvider } from "@/providers/theme-provider";
import { defaultSEO } from "@/config/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = defaultSEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" sizes="180x180" />
        <OrganizationJsonLd />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased pb-14 md:pb-0`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SkipToContent />
          {children}

          {/* All client-only widgets (ssr:false) */}
          <LazyWidgets />
        </ThemeProvider>
      </body>
    </html>
  );
}
