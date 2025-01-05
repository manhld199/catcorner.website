"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { IProductProps } from "@/types/interfaces";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { PUBLIC_CUSTOMER_PRODUCT_LIST_URL } from "@/utils/constants/urls";

export default function CustomerHeaderSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<IProductProps[]>([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      fetchSearchResults(term);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  const fetchSearchResults = async (inputValue: string) => {
    try {
      const response = await fetch(
        `${PUBLIC_CUSTOMER_PRODUCT_LIST_URL}/searchRecommended?searchKey=${encodeURIComponent(
          inputValue
        )}`
      );
      const data = await response.json();

      if (data.data.searchKey === inputValue) {
        // console.log("Data gợi ý ở header:", data.data);
        setSuggestions(data.data.recommendedProducts.slice(0, 4));
        setTotalSearchResults(data.data.totalProducts);
        setIsSuggestionsVisible(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tìm kiếm:", error);
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search-result?searchKey=${searchTerm}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  return (
    <div
      className="relative phone:w-full tablet:w-8/12 laptop:w-full mr-6"
      ref={searchRef}>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Bạn tìm gì..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-4 pr-14 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-300"
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pri-1 dark:bg-teal-700 p-2 rounded-full hover:bg-teal-700 dark:hover:bg-teal-500"
            type="submit">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>

      {/* Suggested Products */}
      {isSuggestionsVisible && suggestions.length > 0 && (
        <div className="absolute left-0 top-full w-full laptop:w-[40vw] desktop:w-[30vw] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-2 rounded-lg shadow-lg max-h-90 overflow-y-auto z-10">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {suggestions.map((product) => (
              <Link
                key={product.product_id_hashed} // Thêm key vào thẻ Link
                href={`/${product.product_slug}?pid=${product.product_id_hashed}`}>
                <li className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-white font-semibold">
                      {product.product_name}
                    </p>
                    <div className="flex gap-3 items-center">
                      <p className="text-sm text-red-500 font-medium">
                        {product.lowest_price}
                      </p>
                      {product.product_price && (
                        <p className="text-xs text-gray-400 line-through">
                          {product.product_price}
                        </p>
                      )}
                    </div>
                  </div>
                  <CldImage
                    src={product.product_img || "/imgs/test.jpg"}
                    alt={product.product_name}
                    width={40}
                    height={40}
                    className="rounded mr-2 object-cover w-[40px] h-[40px]"
                    crop="fill"
                    gravity="auto"
                  />
                </li>
              </Link>
            ))}
          </ul>
          {totalSearchResults > 4 && (
            <div className="p-4 text-center">
              <Link
                href={`/search-result?searchKey=${searchTerm}`}
                className="text-sm text-gray-700 dark:text-white hover:text-teal-600 dark:hover:text-teal-300 font-medium">
                Xem thêm{" "}
                <span className="text-base font-bold text-teal-600">
                  {totalSearchResults - 4}
                </span>{" "}
                sản phẩm
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
