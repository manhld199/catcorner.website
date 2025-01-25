"use client";

import React, { useState } from "react";
import { Plus, Star, X } from "lucide-react";

const categories = ["Food", "Toys", "Clothes", "Balo"];
const budgets = ["100-500K", "500K-1tr", "1tr-2tr", ">2tr"];
const ratings = [5, 4, 3, 2, 1];
const sales = ["New", "Hot sale", "None"];

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSales, setSelectedSales] = useState<string[]>([]);

  return (
    <aside className="w-[30%] p-4 border rounded-md h-fit">
      <h2 className="font-bold mb-4">Bộ lọc:</h2>

      {/* Categories */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Danh mục:</h5>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
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
              {category}{" "}
              {selectedCategories.includes(category) ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Đánh giá:</h5>
        <div className="grid grid-cols-2 gap-2">
          {ratings.map((rating) => (
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
      </div>

      {/* Budget */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Giá:</h5>
        <div className="grid grid-cols-2 gap-2">
          {budgets.map((budget) => (
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
      </div>

      {/* Sale */}
      <div className="mb-6">
        <h5 className="font-semibold mb-2">Ưu đãi:</h5>
        <div className="grid grid-cols-2 gap-2">
          {sales.map((sale) => (
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
