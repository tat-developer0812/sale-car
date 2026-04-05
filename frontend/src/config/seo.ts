import { Metadata } from "next";
import { siteConfig } from "./site";

export const defaultSEO: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: "/favicon.svg",
  },
  description: siteConfig.description,
  keywords: [
    "VuKia",
    "mua xe ô tô",
    "bán xe ô tô",
    "đại lý xe ô tô uy tín",
    "xe ô tô chính hãng",
    "xe ô tô trả góp",
    "giá xe ô tô mới nhất 2026",
    "mua xe ô tô tại TP HCM",
    "mua xe ô tô Hà Nội",
    "tư vấn mua xe ô tô",
    "xe hơi giá rẻ",
    "xe sedan",
    "xe SUV",
    "xe MPV",
    "xe điện",
    "xe hybrid",
    "so sánh giá xe",
    "đánh giá xe ô tô",
    "trả góp mua xe",
    "bảo hành xe chính hãng",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  canonical,
  noindex = false,
  nofollow = false,
}: SEOProps): Metadata {
  const metadata: Metadata = {
    ...defaultSEO,
    title: title || defaultSEO.title,
    description: description || siteConfig.description,
  };

  if (keywords.length > 0) {
    metadata.keywords = [
      ...(defaultSEO.keywords as string[]),
      ...keywords,
    ];
  }

  if (canonical) {
    metadata.alternates = {
      canonical,
    };
  }

  if (noindex || nofollow) {
    metadata.robots = {
      index: !noindex,
      follow: !nofollow,
    };
  }

  if (image) {
    metadata.openGraph = {
      ...defaultSEO.openGraph,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    };
    metadata.twitter = {
      ...defaultSEO.twitter,
      images: [image],
    };
  }

  return metadata;
}
