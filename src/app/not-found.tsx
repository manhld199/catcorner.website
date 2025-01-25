"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center dark:bg-zinc-900">
      <h1 className="text-4xl font-bold text-pri-7  dark:text-white mb-4">
        404 Error
      </h1>
      <h2 className="text-4xl font-bold text-pri-7 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-xl text-gray-600 mb-8 px-4 dark:text-gray-200">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại!
      </p>
      <div className="relative w-96 h-96 mb-8">
        <Image
          src="/imgs/404-white.webp"
          alt="404 Error Light"
          layout="fill"
          className="object-cover dark:hidden"
        />
        <Image
          src="/imgs/404-dark.webp"
          alt="404 Error Dark"
          layout="fill"
          className="object-cover hidden dark:block"
        />
      </div>
      <Link
        href="/"
        className="px-12 py-3 bg-pri-1 dark:bg-pri-7 text-white rounded-full dark:hover:bg-pri-1 hover:bg-pri-7 transition">
        Trở về trang chủ
      </Link>
    </div>
  );
}
