import React from "react";
import { ShoppingBag } from "lucide-react";

export default function CustomerHeaderCart() {
  return (
    <>
      {/* Cart */}
      <a
        href="#"
        className="relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
      >
        <div className="relative flex">
          <ShoppingBag />
          <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
            12
          </span>
        </div>
        <span className="ml-2 font-semibold tablet:block laptop:block desktop:block">
          Shopping bag
        </span>
      </a>
    </>
  );
}
