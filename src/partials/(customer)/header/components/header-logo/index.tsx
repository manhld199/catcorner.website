import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function CustomerHeaderLogo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <>
      <a href="/" className="flex items-center space-x-2">
        {/* Logo mobile */}
        <div className="phone:block tablet:block laptop:hidden">
          <Image
            src="/imgs/logo-white.webp"
            alt="Logo CATCORNER white"
            width={80}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Logo >laptop */}
        <div className="hidden laptop:block">
          <Image
            src={
              theme === "dark" ? "/imgs/logo-white.webp" : "/imgs/logo-pri.webp"
            }
            alt={`Logo CATCORNER ${theme === "dark" ? "white" : "primary"}`}
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
      </a>
    </>
  );
}
