"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

export default function ToogleThemeModeMobile() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="p-0 bg-transparent border-none focus:outline-none flex items-center justify-center">
        <div className="relative">
          <SunIcon className="h-6 w-6 transition-all duration-300 ease-in-out transform dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="h-6 w-6 absolute top-0 left-0 transition-all duration-300 ease-in-out transform rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </div>
        <span className="sr-only">Toggle theme</span>
      </button>
      <span className="font-medium">
        {mounted && theme === "light" ? "Chế độ sáng" : "Chế độ tối"}
      </span>
    </>
  );
}
