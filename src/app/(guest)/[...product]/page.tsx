"use client";

import { useState, useEffect } from "react";
import { CustomerProductSlider } from "./partials";
import { CustomerProductVariant } from "./components";
import { CustomerQuantityInputGroup } from "@/components";

// Demo data
const demoVariants = [
  {
    name: "Variant 1",
    url: "/product/variant-1",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 1 Image",
    },
    quantity: 5, // Số lượng tối đa cho biến thể 1
  },
  {
    name: "Variant 2",
    url: "/product/variant-2",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 2 Image",
    },
    quantity: 10, // Số lượng tối đa cho biến thể 2
  },
  {
    name: "Variant 3",
    url: "/product/variant-3",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 3 Image",
    },
    quantity: 20, // Số lượng tối đa cho biến thể 3
  },
];

export default function ProductDetailsPage() {
  const pid = "12345"; // Example product ID
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0); // Mặc định chọn biến thể đầu tiên
  const [inputQuantity, setInputQuantity] = useState(1);

  // Khi thay đổi biến thể, kiểm tra và cập nhật số lượng nếu cần
  useEffect(() => {
    const maxQuantity = demoVariants[selectedVariantIndex].quantity;
    if (inputQuantity > maxQuantity) {
      setInputQuantity(maxQuantity);
    }
  }, [selectedVariantIndex]);

  const handleQuantityChange = (newQuantity: number) => {
    setInputQuantity(newQuantity);
  };

  const handleVariantSelect = (index: number) => {
    const maxQuantity = demoVariants[index].quantity;
    if (inputQuantity > maxQuantity) {
      setInputQuantity(maxQuantity);
    }
    setSelectedVariantIndex(index);
  };

  return (
    <div className="container mx-auto my-6 w-4/5">
      <div className="flex flex-col laptop:flex-row gap-12">
        <div className="laptop:w-1/2">
          <CustomerProductSlider />
        </div>

        {/* Right side - Product details */}
        <div className="laptop:w-2/3">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">
            Pate Mèo Trưởng Thành Royal Canin Instinctive 85g
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mb-4">
            Short description of the product
          </p>

          {/* Ratings and reviews */}
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2 text-gray-500 dark:text-gray-300">
              (4.1 rating, 137 reviews)
            </span>
          </div>

          {/* Product variants */}
          <div className="mb-4">
            <p className="font-medium dark:text-gray-200">Chọn phân loại:</p>
            <div className="grid grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 mt-2">
              {demoVariants.map((variant, index) => (
                <CustomerProductVariant
                  key={index}
                  pid={pid}
                  variant={variant}
                  isActive={index === selectedVariantIndex}
                  onClick={() => handleVariantSelect(index)}
                />
              ))}
            </div>
          </div>

          {/* Quantity selection */}
          <div className="mb-4">
            <p className="font-medium mb-2 dark:text-gray-200">
              Chọn số lượng:
            </p>
            <CustomerQuantityInputGroup
              initValue={{
                defaultValue: inputQuantity,
                minValue: 1,
                maxValue: demoVariants[selectedVariantIndex].quantity,
              }}
              takeQuantity={handleQuantityChange}
            />
          </div>

          {/* Price */}
          <div className="flex items-center mb-6 gap-12">
            <p className="text-gray-500 dark:text-gray-400 line-through mr-4">
              1,112,442đ
            </p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              567,988đ
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="border border-pri-1 text-pri-1 dark:border-teal-500 dark:text-teal-500 w-48 py-3 rounded-lg hover:bg-teal-700 hover:text-white dark:hover:text-white dark:hover:bg-teal-600">
              Thêm vào giỏ hàng
            </button>
            <button className="bg-pri-1 dark:bg-teal-500 text-white w-48 py-3 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Product description and reviews tabs */}
      <div className="mt-8">
        <div className="flex gap-4 border-b pb-2">
          <button className="font-medium border-b-2 border-teal-500 dark:border-teal-400">
            Thông tin
          </button>
          <button className="font-medium text-gray-500 dark:text-gray-300">
            Đánh giá
          </button>
        </div>

        <div className="mt-4 dark:text-gray-200">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Pate Mèo Trưởng Thành Royal Canin Instinctive 85g
          </h2>
          <ul className="list-disc pl-5 mb-4">
            <li>Thương hiệu: Royal Canin</li>
            <li>Phù hợp cho: Mèo trưởng thành</li>
          </ul>

          <h3 className="text-lg font-bold mb-2 dark:text-gray-200">
            Lợi ích:
          </h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Tạo ra nguồn dinh dưỡng phù hợp tối ưu cho mèo trưởng thành</li>
            <li>Hỗ trợ tăng cường hệ thống miễn dịch</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
