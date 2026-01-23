import { Metadata } from "next";
import { siteConfig } from "./site";

export const defaultSEO: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "mua xe",
    "bán xe",
    "xe hơi",
    "ô tô",
    "xe ô tô",
    "showroom xe",
    "xe chính hãng",
    "trả góp xe",
    "xe mới",
    "xe cũ",
    "giá xe",
    "đánh giá xe",
    "tư vấn mua xe",
    "bảo hành xe",
    "phụ kiện xe",
    "Vietnam car sales",
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
