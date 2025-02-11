"use client";
import Link from "next/link";
import Image from "next/image";

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center dark:bg-zinc-900">
      <h1 className="text-4xl font-bold text-pri-7 dark:text-white mb-4">
        Access Denied
      </h1>
      <h2 className="text-2xl font-semibold text-pri-7 dark:text-white mb-4">
        Bạn không có quyền truy cập vào trang này
      </h2>
      <p className="text-xl text-gray-600 mb-8 px-4 dark:text-gray-200">
        Xin lỗi, bạn không có quyền truy cập vào trang quản trị. Nếu bạn nghĩ
        rằng đây là một lỗi, vui lòng liên hệ với quản trị viên.
      </p>
      <div className="relative w-96 h-96 mb-8">
        <Image
          src="/imgs/noti/cat-1.png"
          alt="Access Denied Light"
          layout="fill"
          className="object-cover dark:hidden"
        />
        <Image
          src="/imgs/noti/cat-1.png"
          alt="Access Denied Dark"
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
