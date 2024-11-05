// partials/buy-form/index.tsx

"use client";

import { useState, useEffect } from "react";
import { CustomerProductVariant } from "../../components";
import { CustomerQuantityInputGroup } from "@/components";

interface BuyFormProps {
  pid: string;
  demoVariants: any[];
  selectedVariantIndex: number;
  inputQuantity: number;
  onVariantSelect: (index: number) => void;
  onQuantityChange: (newQuantity: number) => void;
}

export default function CustomerProductBuyForm({
  pid,
  demoVariants,
  selectedVariantIndex,
  inputQuantity,
  onVariantSelect,
  onQuantityChange,
}: BuyFormProps) {
  useEffect(() => {
    const maxQuantity = demoVariants[selectedVariantIndex].quantity;
    if (inputQuantity > maxQuantity) {
      onQuantityChange(maxQuantity);
    }
  }, [selectedVariantIndex]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 dark:text-white">
        Pate Mèo Trưởng Thành Royal Canin Instinctive 85g
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-4">
        Short description of the product
      </p>

      <div className="flex items-center mb-4">
        <span className="text-yellow-500">★★★★☆</span>
        <span className="ml-2 text-gray-500 dark:text-gray-300">
          (4.1 rating, 137 reviews)
        </span>
      </div>

      <div className="mb-4">
        <p className="font-medium dark:text-gray-200">Chọn phân loại:</p>
        <div className="grid grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 mt-2">
          {demoVariants.map((variant, index) => (
            <CustomerProductVariant
              key={index}
              pid={pid}
              variant={variant}
              isActive={index === selectedVariantIndex}
              onClick={() => onVariantSelect(index)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2 dark:text-gray-200">Chọn số lượng:</p>
        <CustomerQuantityInputGroup
          initValue={{
            defaultValue: inputQuantity,
            minValue: 1,
            maxValue: demoVariants[selectedVariantIndex].quantity,
          }}
          takeQuantity={onQuantityChange}
        />
      </div>

      <div className="flex items-center mb-6 gap-12">
        <p className="text-gray-500 dark:text-gray-400 line-through mr-4">
          1,112,442đ
        </p>
        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          567,988đ
        </p>
      </div>

      <div className="flex gap-4">
        <button className="border border-pri-1 text-pri-1 dark:border-teal-500 dark:text-teal-500 w-48 py-3 rounded-lg hover:bg-teal-700 hover:text-white dark:hover:bg-teal-600">
          Thêm vào giỏ hàng
        </button>
        <button className="bg-pri-1 dark:bg-teal-500 text-white w-48 py-3 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600">
          Mua ngay
        </button>
      </div>
    </div>
  );
}
