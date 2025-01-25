"use client";

import React, { useState, useEffect } from "react";
import { Plus, Star, X, ChevronDown, ChevronUp } from "lucide-react";
import { GUEST_CATEGORIES_URL } from "@/utils/constants/urls";

const budgets = ["100-500K", "500K-1tr", "1tr-2tr", ">2tr"];
const ratings = [5, 4, 3, 2, 1];
const sales = ["New", "Hot sale", "None"];

const MAX_VISIBLE_ITEMS = 4;

// Generic toggle function
const toggleSelection = <T extends string | number>(
  item: T,
  selectedItems: T[],
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>
) => {
  setSelectedItems((prev) =>
    prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
  );
};

// Component hiển thị số sao
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} fill="currentColor" className="text-yellow-500 w-4 h-4" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star key={i} className="text-gray-300 w-4 h-4 dark:text-gray-500" />
      ))}
    </div>
  );
}

export default function SearchFilter() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreRatings, setShowMoreRatings] = useState(false);
  const [showMoreBudgets, setShowMoreBudgets] = useState(false);
  const [showMoreSales, setShowMoreSales] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(GUEST_CATEGORIES_URL);
        const data = await response.json();
        const categoryNames =
          data?.data?.map(
            (category: { category_name: string }) => category.category_name
          ) || [];
        setCategories(categoryNames);
      } catch (error) {
        console.error("Không thể lấy danh mục từ API:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to control the visibility of items
  const getVisibleItems = <T,>(items: T[], showMore: boolean): T[] =>
    showMore ? items : items.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <aside className="w-[30%] p-4 border rounded-md h-fit">
      <h2 className="font-bold mb-4">Bộ lọc:</h2>

      {/* Categories */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Danh mục:</h5>
        <div className="grid grid-cols-2 gap-2">
          {getVisibleItems(categories, showMoreCategories).map((category) => (
            <button
              key={category}
              onClick={() =>
                toggleSelection(
                  category,
                  selectedCategories,
                  setSelectedCategories
                )
              }
              className={`px-3 py-2 rounded-md border text-center flex items-center justify-between ${
                selectedCategories.includes(category)
                  ? "bg-pri-7 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              <span className="truncate line-clamp-1">{category}</span>{" "}
              {selectedCategories.includes(category) ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
        {categories.length > MAX_VISIBLE_ITEMS && (
          <button
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="text-teal-600 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreCategories ? "Thu gọn" : "Xem thêm"}
            {showMoreCategories ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Đánh giá:</h5>
        <div className="grid grid-cols-2 gap-2">
          {getVisibleItems(ratings, showMoreRatings).map((rating) => (
            <button
              key={rating}
              onClick={() =>
                toggleSelection(rating, selectedRatings, setSelectedRatings)
              }
              className={`px-3 py-3 rounded-md border flex items-center justify-between ${
                selectedRatings.includes(rating)
                  ? "bg-pri-7 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              <StarRating rating={rating} />
              {selectedRatings.includes(rating) ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
        {ratings.length > MAX_VISIBLE_ITEMS && (
          <button
            onClick={() => setShowMoreRatings(!showMoreRatings)}
            className="text-teal-600 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreRatings ? "Thu gọn" : "Xem thêm"}
            {showMoreRatings ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Budget */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Giá:</h5>
        <div className="grid grid-cols-2 gap-2">
          {getVisibleItems(budgets, showMoreBudgets).map((budget) => (
            <button
              key={budget}
              onClick={() =>
                toggleSelection(budget, selectedBudgets, setSelectedBudgets)
              }
              className={`px-3 py-2 rounded-md border text-center flex items-center justify-between ${
                selectedBudgets.includes(budget)
                  ? "bg-pri-7 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              {budget}{" "}
              {selectedBudgets.includes(budget) ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
        {budgets.length > MAX_VISIBLE_ITEMS && (
          <button
            onClick={() => setShowMoreBudgets(!showMoreBudgets)}
            className="text-teal-600 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreBudgets ? "Thu gọn" : "Xem thêm"}
            {showMoreBudgets ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Sale */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Ưu đãi:</h5>
        <div className="grid grid-cols-2 gap-2">
          {getVisibleItems(sales, showMoreSales).map((sale) => (
            <button
              key={sale}
              onClick={() =>
                toggleSelection(sale, selectedSales, setSelectedSales)
              }
              className={`px-3 py-2 rounded-md border text-center flex items-center justify-between ${
                selectedSales.includes(sale)
                  ? "bg-pri-7 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}>
              {sale}{" "}
              {selectedSales.includes(sale) ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
        {sales.length > MAX_VISIBLE_ITEMS && (
          <button
            onClick={() => setShowMoreSales(!showMoreSales)}
            className="text-teal-600 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreSales ? "Thu gọn" : "Xem thêm"}
            {showMoreSales ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Filter buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedBudgets([]);
            setSelectedRatings([]);
            setSelectedSales([]);
          }}
          className="px-4 py-2 border rounded-md text-center dark:border-gray-600">
          Huỷ
        </button>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-center">
          Áp dụng
        </button>
      </div>
    </aside>
  );
}
