export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Your Car Showroom",
  description:
    "Chuyên mua bán xe ô tô chính hãng. Tư vấn, hỗ trợ trả góp, bảo hành chính hãng. Liên hệ ngay để được tư vấn tốt nhất!",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`,
  links: {
    facebook: "",
    youtube: "",
    zalo: "",
  },
  contact: {
    phone: "0123 456 789",
    email: "contact@yourcarshowroom.com",
    address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
    workingHours: "8:00 - 18:00 (Thứ 2 - Chủ Nhật)",
  },
  company: {
    name: "CÔNG TY CỔ PHẦN XE HƠI ABC",
    taxCode: "0123456789",
    businessLicense: "0123456789",
  },
};

export type SiteConfig = typeof siteConfig;
