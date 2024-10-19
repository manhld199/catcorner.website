import { ToogleThemeModeMobile } from "@/components";
import { Ellipsis, MessageCircleQuestion, Settings } from "lucide-react";
import React from "react";

export default function CustomerHeaderMore() {
  return (
    <>
      {/* Navigation Links */}
      <div className="relative group flex cursor-pointer">
        <Ellipsis className="text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300" />
        <div className="absolute right-0 top-full mt-4 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
          {/* Mũi tên của dropdown */}
          <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

          <ul className="py-3 space-y-2">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <div className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <ToogleThemeModeMobile />
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <a
                href="#"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300"
              >
                <MessageCircleQuestion />
                <span className="font-medium">Help Center</span>
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <a
                href="#"
                className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300"
              >
                <Settings />
                <span className="font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}