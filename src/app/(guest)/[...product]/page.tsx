"use client";

import { useState } from "react";
import { CustomerProductSlider } from "./partials";
import { CustomerProductVariant } from "./components";
import Image from "next/image";
import { QuantityInputGroup } from "@/components";

// Demo data
const demoVariants = [
  {
    name: "Variant 1",
    url: "/product/variant-1",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 1 Image",
    },
    quantity: 5,
  },
  {
    name: "Variant 2",
    url: "/product/variant-2",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 2 Image",
    },
    quantity: 10,
  },
  {
    name: "Variant 3",
    url: "/product/variant-3",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 3 Image",
    },
    quantity: 20,
  },
];

export default function ProductDetailsPage() {
  const pid = "12345"; // Example product ID
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0); // The first variant is selected by default

  // Quản lý số lượng riêng cho từng biến thể
  const [variantQuantities, setVariantQuantities] = useState(
    demoVariants.map((variant) => variant.quantity)
  );

  // Hàm lấy số lượng và cập nhật số lượng tương ứng với biến thể đang chọn
  const handleQuantityChange = (newQuantity: number) => {
    setVariantQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[selectedVariantIndex] = newQuantity;
      return updatedQuantities;
    });
  };

  return (
    <div className="container mx-auto my-6 w-4/5">
      <div className="flex flex-col laptop:flex-row gap-12">
        <div className="laptop:w-1/2">
          <CustomerProductSlider />
        </div>

        {/* Right side - Product details */}
        <div className="laptop:w-2/3">
          <h1 className="text-2xl font-bold mb-2">
            Pate Mèo Trưởng Thành Royal Canin Instinctive 85g
          </h1>
          <p className="text-gray-500 mb-4">Short description of the product</p>

          {/* Ratings and reviews */}
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2 text-gray-500">
              (4.1 rating, 137 reviews)
            </span>
          </div>

          {/* Product variants */}
          <div className="mb-4">
            <p className="font-medium">Chọn phân loại:</p>
            <div className="grid grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 mt-2">
              {demoVariants.map((variant, index) => (
                <CustomerProductVariant
                  key={index}
                  pid={pid}
                  variant={variant}
                  isActive={index === selectedVariantIndex}
                  onClick={() => setSelectedVariantIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Quantity selection */}
          <div className="mb-4">
            <p className="font-medium mb-2">Chọn số lượng:</p>
            <QuantityInputGroup
              initValue={{
                defaultValue: 1,
                minValue: 1,
                maxValue: demoVariants[selectedVariantIndex].quantity,
              }}
              takeQuantity={handleQuantityChange}
            />
          </div>

          {/* Price */}
          <div className="flex items-center mb-6 gap-12">
            <p className="text-gray-500 line-through mr-4">1,112,442đ</p>
            <p className="text-2xl font-bold text-teal-600">567,988đ</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
              Thêm vào giỏ hàng
            </button>
            <button className="border border-teal-500 text-teal-500 px-6 py-2 rounded-md hover:bg-teal-500 hover:text-white">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Product description and reviews tabs */}
      <div className="mt-8">
        <div className="flex gap-4 border-b pb-2">
          <button className="font-medium border-b-2 border-teal-500">
            Thông tin
          </button>
          <button className="font-medium text-gray-500">Đánh giá</button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">
            Pate Mèo Trưởng Thành Royal Canin Instinctive 85g
          </h2>
          <ul className="list-disc pl-5 mb-4">
            <li>Thương hiệu: Royal Canin</li>
            <li>Phù hợp cho: Mèo trưởng thành</li>
          </ul>

          <h3 className="text-lg font-bold mb-2">Lợi ích:</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Tạo ra nguồn dinh dưỡng phù hợp tối ưu cho mèo trưởng thành</li>
            <li>Hỗ trợ tăng cường hệ thống miễn dịch</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
