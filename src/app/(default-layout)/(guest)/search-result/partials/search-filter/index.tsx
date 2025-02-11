"use client";

import React, { useState, useEffect } from "react";
import { Plus, Star, X, ChevronDown, ChevronUp } from "lucide-react";
import { GUEST_CATEGORIES_URL } from "@/utils/constants/urls";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

const budgets = ["0k-100k", "100k-500k", "500k-1tr", "1tr-2tr"];
const ratings = [5, 4, 3, 2, 1];
const sales = ["Hot sale"];

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
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

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

  const validatePrices = (min: number | null, max: number | null) => {
    if (min !== null && min < 0) {
      toast.error("Giá trị Min không được âm!");
      return false;
    }
    if (max !== null && max < 0) {
      toast.error("Giá trị Max không được âm!");
      return false;
    }
    if (min !== null && max !== null && min > max) {
      toast.error("Giá trị Min không được lớn hơn Max!");
      return false;
    }
    return true;
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (validatePrices(value, selectedMaxPrice)) {
      setSelectedMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (validatePrices(selectedMinPrice, value)) {
      setSelectedMaxPrice(value);
    }
  };

  const toggleBudgetSelection = (budget: string) => {
    toggleSelection(budget, selectedBudgets, setSelectedBudgets);
  };

  const applyFilters = () => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Lọc danh mục
    if (selectedCategories.length > 0) {
      currentParams.set("category", selectedCategories.join(","));
    } else {
      currentParams.delete("category");
    }

    // Lọc giá
    let minPrice = selectedMinPrice;
    let maxPrice = selectedMaxPrice;

    if (selectedBudgets.length > 0) {
      const budgetMin = Math.min(
        ...selectedBudgets.map(parseBudgetRange).map((b) => b.min)
      );
      const budgetMax = Math.max(
        ...selectedBudgets.map(parseBudgetRange).map((b) => b.max || Infinity)
      );
      minPrice = minPrice !== null ? Math.min(minPrice, budgetMin) : budgetMin;
      maxPrice = maxPrice !== null ? Math.max(maxPrice, budgetMax) : budgetMax;
    }

    if (minPrice !== null) {
      currentParams.set("minPrice", minPrice.toString());
    } else {
      currentParams.delete("minPrice");
    }

    if (maxPrice !== null) {
      currentParams.set("maxPrice", maxPrice.toString());
    } else {
      currentParams.delete("maxPrice");
    }

    // Lọc đánh giá
    if (selectedRatings.length > 0) {
      currentParams.set("rating", selectedRatings.join(","));
    } else {
      currentParams.delete("rating");
    }

    // Lọc giảm giá
    if (selectedSales.includes("Hot sale")) {
      currentParams.set("discount", "true");
    } else {
      currentParams.delete("discount");
    }

    // Gắn query string vào URL
    router.push(`/search-result?${currentParams.toString()}`);
  };

  const parseBudgetRange = (budget: string) => {
    if (budget.includes(">")) {
      const min = parseInt(budget.replace(/[^\d]/g, ""), 10) * 1000;
      return { min, max: null };
    } else {
      const [min, max] = budget
        .replace(/k/gi, "000")
        .replace(/tr/gi, "000000")
        .split("-")
        .map((value) => parseInt(value, 10));
      return { min: min || 0, max: max || null };
    }
  };

  return (
    <aside className="w-[30%] p-4 border rounded-lg h-fit dark:bg-gray-800">
      <h2 className="font-bold mb-4">Bộ lọc:</h2>

      {/* Categories */}
      <div className="mb-4">
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
                  ? "bg-pri-7 text-white dark:text-gray-400"
                  : "bg-white dark:bg-teal-100 text-gray-700 border-gray-300"
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
            className="text-teal-600 dark:text-teal-300 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreCategories ? "Thu gọn" : "Xem thêm"}
            {showMoreCategories ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <hr className="mb-4 dark:border-white" />

      {/* Ratings */}
      <div className="mb-4">
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
                  ? "bg-pri-7 text-white dark:text-gray-400"
                  : "bg-white dark:bg-teal-100 text-gray-700 border-gray-300"
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
            className="text-teal-600 dark:text-teal-300 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreRatings ? "Thu gọn" : "Xem thêm"}
            {showMoreRatings ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <hr className="mb-4 dark:border-white" />

      {/* Budget */}
      <div className="mb-4">
        <h5 className="font-semibold mb-2">Giá:</h5>

        {/* Min and Max Input */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <input
            type="number"
            placeholder="Min"
            step="10000"
            className="px-3 py-2 rounded-md border text-center text-gray-700 border-gray-300 dark:border-none focus:outline-none focus:ring-1 focus:ring-teal-600"
            value={selectedMinPrice || ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            placeholder="Max"
            step="10000"
            className="px-3 py-2 rounded-md border text-center text-gray-700 border-gray-300 dark:border-none focus:outline-none focus:ring-1 focus:ring-teal-600"
            value={selectedMaxPrice || ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Budget Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {getVisibleItems(budgets, showMoreBudgets).map((budget) => (
            <button
              key={budget}
              onClick={() => toggleBudgetSelection(budget)}
              className={`px-3 py-2 rounded-md border text-center flex items-center justify-between ${
                selectedBudgets.includes(budget)
                  ? "bg-pri-7 text-white dark:text-gray-400"
                  : "bg-white dark:bg-teal-100 text-gray-700 border-gray-300"
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

        {/* Show More/Show Less */}
        {budgets.length > MAX_VISIBLE_ITEMS && (
          <button
            onClick={() => setShowMoreBudgets(!showMoreBudgets)}
            className="text-teal-600 dark:text-teal-300 mt-2 flex items-center text-sm justify-center w-full">
            {showMoreBudgets ? "Thu gọn" : "Xem thêm"}
            {showMoreBudgets ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <hr className="mb-4 dark:border-white" />

      {/* Sale */}
      <div className="mb-4">
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
                  ? "bg-pri-7 text-white dark:text-gray-400"
                  : "bg-white dark:bg-teal-100 text-gray-700 border-gray-300"
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
            className="text-teal-600 dark:text-teal-300 mt-2 flex items-center text-sm justify-center w-full">
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
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-center"
          onClick={applyFilters}>
          Áp dụng
        </button>
      </div>
    </aside>
  );
}
