export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItem[];
}

export type MainNavItem = NavItem;

export type SidebarNavItem = NavItemWithChildren;

export const mainNav: MainNavItem[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Xe ô tô",
    href: "/xe-o-to",
  },
  {
    title: "Thương hiệu",
    href: "/thuong-hieu",
  },
  {
    title: "Tin tức",
    href: "/tin-tuc",
  },
  {
    title: "Giới thiệu",
    href: "/gioi-thieu",
  },
  {
    title: "Liên hệ",
    href: "/lien-he",
  },
];

// Brand dropdown items (populated dynamically from API)
export const brandNavItems: NavItem[] = [
  {
    title: "Toyota",
    href: "/thuong-hieu/toyota",
  },
  {
    title: "Honda",
    href: "/thuong-hieu/honda",
  },
  {
    title: "Mazda",
    href: "/thuong-hieu/mazda",
  },
  {
    title: "Hyundai",
    href: "/thuong-hieu/hyundai",
  },
  {
    title: "Xem tất cả",
    href: "/thuong-hieu",
  },
];

// Footer navigation
export const footerNav = {
  company: [
    {
      title: "Giới thiệu",
      href: "/gioi-thieu",
    },
    {
      title: "Tuyển dụng",
      href: "/tuyen-dung",
    },
    {
      title: "Liên hệ",
      href: "/lien-he",
    },
  ],
  support: [
    {
      title: "Hỗ trợ khách hàng",
      href: "/ho-tro",
    },
    {
      title: "Chính sách bảo hành",
      href: "/chinh-sach-bao-hanh",
    },
    {
      title: "Chính sách đổi trả",
      href: "/chinh-sach-doi-tra",
    },
    {
      title: "Hướng dẫn mua xe trả góp",
      href: "/huong-dan-tra-gop",
    },
  ],
  legal: [
    {
      title: "Điều khoản sử dụng",
      href: "/dieu-khoan-su-dung",
    },
    {
      title: "Chính sách bảo mật",
      href: "/chinh-sach-bao-mat",
    },
  ],
};
