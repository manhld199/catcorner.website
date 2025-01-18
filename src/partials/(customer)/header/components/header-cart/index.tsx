import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function CustomerHeaderCart() {
  return (
    <div className="relative group">
      {/* Cart */}
      <a
        href="/cart"
        className="relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center">
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

      {/* Cart details dropdown */}
      <div className="absolute right-0 mt-4 w-96 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
        {/* Tam giác trên dropdown */}
        <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

        {/* Authenticated user */}
        <div className="py-4">
          <h3 className="font-medium text-gray-400 dark:text-white px-4 pb-2">
            Sản phẩm mới thêm
          </h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <Image
                src="/imgs/test.jpg"
                alt="tes-timg"
                width={50}
                height={50}
                className="rounded mr-3 object-cover w-[50px] h-[50px]"
              />
              <div>
                <p className="text-sm text-gray-700 dark:text-white font-semibold">
                  Váy Sơ Mi Ngắn Tay Sọc Xanh
                </p>
                <p className="text-sm text-red-500">₫139.000</p>
              </div>
            </li>
            <li className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <Image
                src="/imgs/test.jpg"
                alt="tes-timg"
                width={50}
                height={50}
                className="rounded mr-3 object-cover w-[50px] h-[50px]"
              />
              <div>
                <p className="text-sm text-gray-700 dark:text-white font-semibold">
                  Váy Sơ Mi Ngắn Tay Sọc Xanh
                </p>
                <p className="text-sm text-red-500">₫139.000</p>
              </div>
            </li>
            <li className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <Image
                src="/imgs/test.jpg"
                alt="tes-timg"
                width={50}
                height={50}
                className="rounded mr-3 object-cover w-[50px] h-[50px]"
              />
              <div>
                <p className="text-sm text-gray-700 dark:text-white font-semibold">
                  Váy Sơ Mi Ngắn Tay Sọc Xanh
                </p>
                <p className="text-sm text-red-500">₫139.000</p>
              </div>
            </li>
          </ul>
          <div className="mt-4 flex justify-end px-4">
            <a
              href="/cart"
              className="text-sm text-white bg-teal-600 dark:bg-teal-700 px-4 py-2 rounded-md hover:bg-teal-700 dark:hover:bg-teal-500">
              Xem Giỏ Hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
