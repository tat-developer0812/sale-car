import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import {
  FloatingPhone,
  ZaloButton,
  StickyContactModal,
  ExitIntent,
  MobileBottomBar,
} from "@/components/widgets";
import { GoogleAnalytics } from "@/components/analytics";
import { OrganizationJsonLd } from "@/components/seo";
import { SkipToContent } from "@/components/common";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || "Your Car Showroom";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Chuyên mua bán xe ô tô chính hãng. Tư vấn, hỗ trợ trả góp, bảo hành chính hãng. Liên hệ ngay để được tư vấn tốt nhất!",
  keywords: [
    "mua xe",
    "bán xe",
    "xe hơi",
    "ô tô",
    "xe ô tô",
    "showroom xe",
    "xe chính hãng",
    "trả góp xe",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description:
      "Chuyên mua bán xe ô tô chính hãng. Tư vấn, hỗ trợ trả góp, bảo hành chính hãng.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Chuyên mua bán xe ô tô chính hãng. Tư vấn, hỗ trợ trả góp, bảo hành chính hãng.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <SkipToContent />
            {children}

            {/* Floating Widgets */}
            <FloatingPhone />
            <ZaloButton />
            <StickyContactModal />
            <ExitIntent />
            <MobileBottomBar />

            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
