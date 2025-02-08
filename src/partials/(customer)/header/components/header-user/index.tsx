import React from "react";
import Image from "next/image";
import {
  SquareUserRound,
  ScrollText,
  LogOut,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getLastName } from "@/utils/string-utils";

export default function CustomerHeaderUser() {
  const { data: session } = useSession(); // Lấy thông tin session

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  if (!session) {
    return (
      <>
        {/* Unauthenticated user */}
        <div className="relative group">
          <Link
            href="/login"
            className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300"
            data-cy="login-button">
            <UserRound />
            <span className="ml-1 font-semibold laptop:block desktop:block ">
              Đăng nhập
            </span>
          </Link>

          <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
            <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

            <ul className="py-3 space-y-2">
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
                <Link
                  href="/register"
                  className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                  <UserRoundPlus />
                  <span className="font-medium">Đăng ký</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Authenticated user */}
      <div className="relative group">
        <a
          href="#"
          className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center">
          <Image
            src={session.user?.userAvt || "/imgs/test.jpg"}
            alt="User Avatar"
            width={100}
            height={100}
            quality={100}
            className="rounded-full mr-2 object-cover w-[30px] h-[30px]"
            priority
          />
          <span className="font-semibold laptop:block desktop:block">
            Hi, {getLastName(session.user?.name)}
          </span>
        </a>

        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
          <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

          <ul className="py-3 space-y-2">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <Link
                href="/my-profile"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <SquareUserRound />
                <span className="font-medium">Tài khoản của bạn</span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <Link
                href="/order-history"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <ScrollText />
                <span className="font-medium">Quản lý đơn hàng</span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <Link
                href="/address"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <ScrollText />
                <span className="font-medium">Địa chỉ giao hàng</span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <Link
                href="/my-coupons"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <ScrollText />
                <span className="font-medium">Kho ưu đãi</span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <LogOut />
                <span className="font-medium">Thoát</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
