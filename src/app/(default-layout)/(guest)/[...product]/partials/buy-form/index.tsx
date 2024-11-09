"use client";

import { useState, useEffect } from "react";
import { CustomerProductVariant } from "../../components";
import { CustomerQuantityInputGroup, CustomerStarRating } from "@/components";
interface BuyFormProps {
  pid: string;
  productName: string;
  shortDescription: string;
  avgRating: {
    rating_point: number;
    rating_count: number;
  };
  price: number;
  discountPrice: number;
  variants: {
    variant_name: string;
    variant_slug: string;
    variant_img: string;
    variant_price: number;
    variant_stock_quantity: number;
    variant_discount_percent: number;
    _id: string;
  }[];
  selectedVariantIndex: number;
  inputQuantity: number;
  productSoldQuantity: number;
  onVariantSelect: (index: number) => void;
  onQuantityChange: (newQuantity: number) => void;
}

export default function CustomerProductBuyForm({
  pid,
  variants,
  selectedVariantIndex,
  inputQuantity,
  onVariantSelect,
  onQuantityChange,
  productName,
  shortDescription,
  avgRating,
  productSoldQuantity,
}: BuyFormProps) {
  useEffect(() => {
    const maxQuantity = variants[selectedVariantIndex].variant_stock_quantity;
    if (inputQuantity > maxQuantity) {
      onQuantityChange(maxQuantity);
    }
  }, [selectedVariantIndex]);

  return (
    <div>
      <h1 className="font-bold mb-2 dark:text-white">{productName}</h1>
      <p className="text-gray-500 dark:text-gray-300 mb-4">
        {shortDescription}
      </p>
      {/* Star Rating */}
      <CustomerStarRating
        product_avg_rating={avgRating.rating_point ?? 0}
        product_sold_quantity={productSoldQuantity ?? 0}
      />

      <div className="mb-4">
        <p className="font-medium dark:text-gray-200">Chọn phân loại:</p>
        <div className="grid grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 mt-2">
          {variants.map((variant, index) => (
            <CustomerProductVariant
              key={variant._id}
              pid={pid}
              variant={{
                name: variant.variant_name,
                url: variant.variant_slug,
                image: {
                  url: variant.variant_img,
                  alt: `${productName} - ${variant.variant_name}`,
                },
              }}
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
            maxValue: variants[selectedVariantIndex].variant_stock_quantity,
          }}
          takeQuantity={onQuantityChange}
        />
      </div>

      <div className="flex items-center mb-6 gap-12">
        <p className="text-gray-500 dark:text-gray-400 line-through mr-4">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(variants[selectedVariantIndex].variant_price)}
        </p>
        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            variants[selectedVariantIndex].variant_price *
              (1 -
                variants[selectedVariantIndex].variant_discount_percent / 100)
          )}
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
