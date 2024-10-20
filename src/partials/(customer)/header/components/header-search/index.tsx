"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cỏ mèo dán tường Catnip",
    price: "47.700₫",
    oldPrice: "53.000₫",
    image: "/imgs/test.jpg",
  },
  {
    id: 2,
    name: "Cỏ bạc hà cho mèo Catnip",
    price: "46.199₫",
    image: "/imgs/test.jpg",
  },
  {
    id: 3,
    name: "Combo hạt giống cỏ mèo + đất + chậu trồng cỏ",
    price: "46.999₫",
    image: "/imgs/test.jpg",
  },
  {
    id: 4,
    name: "Thức ăn cho mèo Reflex Plus Thổ Nhĩ Kỳ",
    price: "258.999₫",
    image: "/imgs/test.jpg",
  },
  {
    id: 5,
    name: "Thêm sản phẩm khác",
    price: "300.000₫",
    image: "/imgs/test.jpg",
  },
];

export default function CustomerHeaderSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredProducts.slice(0, 4)); // Hiển thị tối đa 4 sản phẩm
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  const totalRemainingProducts = products.length - suggestions.length; // Điều chỉnh biến này

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div
      className="relative phone:w-full tablet:w-8/12 laptop:w-full mr-6"
      ref={searchRef}
    >
      {/* Search Bar */}
      <div className="flex items-center w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-4 pr-14 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-300"
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pri-1 dark:bg-teal-700 p-2 rounded-full hover:bg-teal-700 dark:hover:bg-teal-500"
            type="submit"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Gợi ý sản phẩm khi có từ khóa tìm kiếm và nếu có kết quả */}
      {isSuggestionsVisible && suggestions.length > 0 && (
        <div className="left-0 absolute top-full left-0 phone:w-full laptop:w-[40vw] desktop:w-[30vw] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-2 rounded-lg shadow-lg max-h-90 overflow-y-auto z-10">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-700 dark:text-white font-semibold">
                    {product.name}
                  </p>
                  <div className="flex gap-3 items-center">
                    <p className="text-sm text-red-500 font-medium">
                      {product.price}
                    </p>
                    {product.oldPrice && (
                      <p className="text-xs text-gray-400 line-through">
                        {product.oldPrice}
                      </p>
                    )}
                  </div>
                </div>
                <Image
                  src="/imgs/test.jpg"
                  alt="tes-timg"
                  width={40}
                  height={40}
                  className="rounded mr-2 object-cover w-[40px] h-[40px]"
                />
              </li>
            ))}
          </ul>
          <div className="p-4 text-center">
            <a
              href="#"
              className="text-sm text-gray-700 dark:text-white hover:text-teal-600 dark:hover:text-teal-300 font-medium"
            >
              Xem thêm{" "}
              <span className="text-base font-bold text-teal-600">
                {totalRemainingProducts}
              </span>{" "}
              sản phẩm
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
