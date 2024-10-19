import React from "react";
import Image from "next/image";
import { SquareUserRound, ScrollText, LogOut } from "lucide-react";

export default function CustomerHeaderUser() {
  return (
    <>
      {/* Unauthenticated user */}
      {/* <a
        href="/login"
        className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300"
      >
        <UserRound />
        <span className="ml-1 font-semibold laptop:block desktop:block ">
          Sign in
        </span>
      </a> */}

      {/* Authenticated user */}
      <div className="relative group">
        <a
          href="#"
          className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
        >
          <Image
            src="/imgs/test.jpg"
            alt="tes-timg"
            width={30}
            height={30}
            className="rounded-full mr-2 object-cover w-[30px] h-[30px]"
          />
          <span className="font-semibold laptop:block desktop:block">
            Hi, Yến
          </span>
        </a>

        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
          <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

          <ul className="py-3 space-y-2">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <a
                href="#"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300"
              >
                <SquareUserRound />
                <span className="font-medium">My Account</span>
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <a
                href="#"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300"
              >
                <ScrollText />
                <span className="font-medium">Orders</span>
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600">
              <a
                href="#"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300"
              >
                <LogOut />
                <span className="font-medium">Sign out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
