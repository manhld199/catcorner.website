import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/staff") && token?.role === "User") {
      const url = req.nextUrl.clone();
      url.pathname = "/access-denied";
      return NextResponse.redirect(url);
    }

    // Nếu người dùng có vai trò "User" và cố gắng truy cập vào trang admin
    if (path.startsWith("/admin") && token?.role === "User") {
      // Trả về thông báo hoặc chuyển hướng đến trang thông báo
      const url = req.nextUrl.clone();
      url.pathname = "/access-denied"; // Đường dẫn của trang thông báo
      return NextResponse.redirect(url);
    }
    // Protect admin routes
    if (
      path.startsWith("/admin") ||
      (path.startsWith("/staff") && token?.role !== "Admin")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect user routes
    if (path.startsWith("/user") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Configure protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/user/:path*",
    "/profile/:path*",

    // Add other protected routes here
  ],
};
