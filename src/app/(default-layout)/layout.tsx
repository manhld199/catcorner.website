"use client";

import { usePathname } from "next/navigation";
import { CustomerFooter, CustomerHeader } from "@/partials";
import { BreadCrumb, ScrollUp } from "@/components";

// Định nghĩa breadcrumbMap
const breadcrumbMap: Record<string, { label: string; href?: string }[]> = {
  "/[slug]": [
    { label: "Trang chủ", href: "/" },
    { label: "Chi tiết sản phẩm" },
  ],
  "/cart": [{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng" }],
  "/profile": [
    { label: "Trang chủ", href: "/" },
    { label: "Trang cá nhân", href: "/profile" },
    { label: "Thông tin tài khoản" },
  ],
  "/address": [
    { label: "Trang chủ", href: "/" },
    { label: "Trang cá nhân", href: "/profile" },
    { label: "Địa chỉ nhận hàng" },
  ],
  "/order-history": [
    { label: "Trang chủ", href: "/" },
    { label: "Trang cá nhân", href: "/profile" },
    { label: "Đơn hàng của tôi" },
  ],
  "/order-information": [
    { label: "Trang chủ", href: "/" },
    { label: "Đặt hàng" },
  ],
  "/rating": [
    { label: "Trang chủ", href: "/" },
    { label: "Trang cá nhân", href: "/profile" },
    { label: "Đơn hàng của tôi", href: "/order-history" },
    { label: "Đánh giá đơn hàng" },
  ],
  "/payment": [
    { label: "Trang chủ", href: "/" },
    { label: "Thanh toán an toàn" },
  ],
  "/order-success": [
    { label: "Trang chủ", href: "/" },
    { label: "Đặt hàng thành công" },
  ],
  "/about-us": [{ label: "Trang chủ", href: "/" }, { label: "Về chúng tôi" }],
  "/blogs": [{ label: "Trang chủ", href: "/" }, { label: "Bài viết" }],
  "/blogs/[slug]": [
    { label: "Trang chủ", href: "/" },
    { label: "Bài viết", href: "/blogs" },
    { label: "Chi tiết bài viết" },
  ],
  "/contact-us": [{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }],
  "/delivery-and-payment": [
    { label: "Trang chủ", href: "/" },
    { label: "Chính sách đổi trả" },
  ],
  "/order-tracking": [
    { label: "Trang chủ", href: "/" },
    { label: "Theo dõi đơn hàng" },
  ],
  "/privacy-policy": [
    { label: "Trang chủ", href: "/" },
    { label: "Chính sách bảo mật" },
  ],
  "/search-result": [
    { label: "Trang chủ", href: "/" },
    { label: "Kết quả tìm kiếm" },
  ],
};

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Xử lý breadcrumb cho dynamic routes
  const cleanedPathname = pathname.split("?")[0]; // Loại bỏ query string
  const breadcrumbs =
    breadcrumbMap[cleanedPathname] ||
    (cleanedPathname.startsWith("/blogs/") && breadcrumbMap["/blogs/[slug]"]) ||
    (cleanedPathname.startsWith("/") && breadcrumbMap["/[slug]"]) ||
    [];

  return (
    <>
      <CustomerHeader />
      {breadcrumbs.length > 0 && <BreadCrumb breadcrumbs={breadcrumbs} />}
      <main className="my-36 md:my-32 lg:my-6 mx-auto md:w-[93%] lg:w-11/12 max-w-[1152px] min-h-[80vh]">
        {children}
      </main>
      <ScrollUp />
      <CustomerFooter />
    </>
  );
}
