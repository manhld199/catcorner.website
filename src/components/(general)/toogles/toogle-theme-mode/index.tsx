"use client";

// import libs
import * as React from "react";
import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";

// import components
import { Button } from "@/components/ui/button";

// import data
import { TOGGGLE_THEME } from "@/data/components";

export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className={`w-full px-2 justify-start items-center bg-transparent border-none ${theme == "light" ? "hover:bg-orange-100" : "hover:bg-blue-900"}`}
      onClick={() => (theme == "light" ? setTheme("dark") : setTheme("light"))}>
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 fill-orange-500 stroke-orange-500" />
      <MoonStar className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 fill-sky-200" />
      <span>{TOGGGLE_THEME["change-theme"]}</span>
    </Button>
  );
}
