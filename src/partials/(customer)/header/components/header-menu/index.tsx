import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Flame, Home, LayoutDashboard, Menu, Percent } from "lucide-react";
import { ToogleThemeModeMobile } from "@/components";
import Link from "next/link";

export default function CustomerHeaderMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="flex content-center space-x-4 phone:block laptop:hidden">
        <Menu className="w-6 h-6 text-white" onClick={toggleMenu} />
      </div>
      {/* Popup Menu */}
      <div
        className={`fixed inset-0 bg-black dark:bg-neutral-500 opacity-50 z-40 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={toggleMenu}></div>

      <div
        className={`tablet:w-7/12 fixed inset-y-0 right-0 w-4/5 h-full z-50 bg-white dark:bg-zinc-900 shadow-md p-8 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}>
        <h2 className="text-xl phone_large:text-2xl font-bold mb-6 text-pri-1 py-4 dark:text-white">
          BẢNG ĐIỀU KHIỂN
        </h2>
        <ul className="space-y-8">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <Home className="w-6 h-6 text-pri-1 dark:text-white" />
              <span className="font-semibold">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <Percent className="w-6 h-6 text-pri-1 dark:text-white" />
              <span className="font-semibold">Hot Sale</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <Flame className="w-6 h-6 text-pri-1 dark:text-white" />
              <span className="font-semibold">Hot Products</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <LayoutDashboard className="w-6 h-6 text-pri-1 dark:text-white" />
              <span className="font-semibold">Categories</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <ToogleThemeModeMobile />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
