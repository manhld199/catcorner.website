import React from "react";
import Image from "next/image";

export default function CustomerHeaderLogo() {
  return (
    <>
      <a href="/" className="flex items-center space-x-2">
        {/* Logo mobile */}
        <div className="phone:block tablet:block laptop:hidden">
          <Image
            src="/imgs/logo-white.png"
            alt="Logo CATCORNER white"
            width={80}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Logo >laptop */}
        <div className="hidden laptop:block">
          <Image
            src="/imgs/logo-pri.png"
            alt="Logo CATCORNER primary"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
      </a>
    </>
  );
}
