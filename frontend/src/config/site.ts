export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "VuKia",
  description:
    "VuKia - Chuyên tư vấn mua bán xe KIA, Mazda chính hãng tại Gò Vấp, TP.HCM. Hỗ trợ trả góp lên đến 80%, bảo hành chính hãng. Liên hệ 0931.456.204 để được tư vấn miễn phí!",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://oto-auto-premium.com",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || "https://oto-auto-premium.com"}/og-image.jpg`,
  links: {
    facebook: "https://facebook.com/vukia.vn",
    youtube: "https://youtube.com/@vukia",
    zalo: "https://zalo.me/0931456204",
  },
  contact: {
    phone: "0931 456 204",
    hotline: "0931 456 204",
    email: "info@vukia.vn",
    address: "KIA - MAZDA Gò Vấp, TP. Hồ Chí Minh",
    workingHours: "8:00 - 20:00 (Thứ 2 - Chủ Nhật)",
  },
  company: {
    name: "VUKIA - KIA MAZDA GÒ VẤP",
    taxCode: "0123456789",
    businessLicense: "0123456789",
  },
  consultant: {
    name: "VuKia",
    title: "Chuyên viên tư vấn xe KIA & Mazda",
    phone: "0931 456 204",
    zalo: "https://zalo.me/0931456204",
    photo: "/consultant.png",
    experience: "Chuyên gia tư vấn xe ô tô với nhiều năm kinh nghiệm trong ngành, chuyên KIA và Mazda tại Gò Vấp.",
  },
};

export type SiteConfig = typeof siteConfig;
