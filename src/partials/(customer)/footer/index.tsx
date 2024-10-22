import React from "react";
import Image from "next/image";

export default function CustomerFooter() {
  return (
    <footer className="bg-zinc-900 text-white py-4 w-full">
      <div className="container mx-auto flex flex-col tablet:flex-row tablet:justify-between tablet:items-center desktop:w-4/5 tablet:w-11/12">
        {/* Logo */}
        <div className="flex justify-center items-center tablet:justify-start">
          <Image
            src="/imgs/logo-white.webp"
            alt="Logo CATCORNER"
            width={241}
            height={85}
            className="object-contain desktop:w-[241px] desktop:h-[85px] phone:w-[calc(0.8*241px)] phone:h-[calc(0.8*85px)]"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col tablet:flex-row tablet:space-x-8 laptop:space-x-16 desktop:space-x-20 laptop:text-lg desktop:text-xl font-medium mt-4 tablet:mt-0">
          <a
            href="#"
            className="hover:text-teal-300 transition-colors flex justify-center py-3 tablet:py-0"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-teal-300 transition-colors flex justify-center py-3 tablet:py-0"
          >
            About Us
          </a>
          <a
            href="#"
            className="hover:text-teal-300 transition-colors flex justify-center py-3 tablet:py-0"
          >
            Blogs
          </a>
          <a
            href="#"
            className="hover:text-teal-300 transition-colors flex justify-center py-3 tablet:py-0"
          >
            Policies
          </a>
          <a
            href="#"
            className="hover:text-teal-300 transition-colors flex justify-center py-3 tablet:py-0"
          >
            Delivery and Payment
          </a>
        </div>
      </div>

      {/* Text ở cuối */}
      <div className="container mx-auto text-center mt-4">
        <p className="desktop:text-sm phone:text-xs text-gray-400 font-light">
          © CatCorner 2024. All rights reserved
        </p>
      </div>
    </footer>
  );
}
