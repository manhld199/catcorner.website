"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { FileUploader } from "./components";
import { useSession } from "next-auth/react";
import { ORDER_URL } from "@/utils/constants/urls";

interface IProduct {
  id: string;
  name: string;
  variant: string;
  price: number;
  discountPrice: number;
  quantity: number;
  image: string;
}

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Tên sản phẩm tên sản phẩm tên sản phẩm",
    variant: "Tên biến thể",
    price: 1000000000,
    discountPrice: 1000000000,
    quantity: 30,
    image: "/imgs/test.jpg",
  },
  {
    id: "2",
    name: "Tên sản phẩm tên sản phẩm tên sản phẩm",
    variant: "Tên biến thể",
    price: 1000000000,
    discountPrice: 1000000000,
    quantity: 30,
    image: "/imgs/test.jpg",
  },
  {
    id: "3",
    name: "Tên sản phẩm tên sản phẩm tên sản phẩm",
    variant: "Tên biến thể",
    price: 1000000000,
    discountPrice: 1000000000,
    quantity: 30,
    image: "/imgs/test.jpg",
  },
  {
    id: "4",
    name: "Tên sản phẩm tên sản phẩm tên sản phẩm",
    variant: "Tên biến thể",
    price: 1000000000,
    discountPrice: 1000000000,
    quantity: 30,
    image: "/imgs/test.jpg",
  },
];

export default function RatingPage() {
  const { data: session } = useSession();
  //  sử dụng ORDER_URL/[:id] để lấy data về chi tiết đơn hàng

  //   console.log("check authenticated: ", session.user);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
    mockProducts[0]
  );
  const [ratings, setRatings] = useState<{
    [key: string]: {
      stars: number;
      comment: string;
      images: File[];
      video: File[];
    };
  }>(() =>
    mockProducts.reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: { stars: 5, comment: "", images: [], video: [] },
      }),
      {}
    )
  );

  const handleFileChange = (type: "images" | "video", files: File[]) => {
    if (!selectedProduct) return;
    setRatings((prev) => ({
      ...prev,
      [selectedProduct.id]: { ...prev[selectedProduct.id], [type]: files },
    }));
  };

  const handleStarChange = (stars: number) => {
    if (!selectedProduct) return;
    setRatings((prev) => ({
      ...prev,
      [selectedProduct.id]: { ...prev[selectedProduct.id], stars },
    }));
  };

  const handleCommentChange = (comment: string) => {
    if (!selectedProduct) return;
    setRatings((prev) => ({
      ...prev,
      [selectedProduct.id]: { ...prev[selectedProduct.id], comment },
    }));
  };

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Sản phẩm đặt mua */}
      <section className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-md ">
        <h3 className="font-bold mb-2 text-center">Sản phẩm đặt mua</h3>
        <hr className="mb-4 dark:border-white" />
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className={`flex items-center p-4 rounded-md cursor-pointer mb-2 ${
              selectedProduct?.id === product.id ? "bg-pri-2" : "bg-pri-3"
            }`}
            onClick={() => setSelectedProduct(product)}>
            <div className="w-16 h-16 relative">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                className="object-cover rounded-md"
              />
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-sm font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.variant}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">
                  {product.price.toLocaleString()}đ
                </span>
                <span className="font-bold text-teal-600">
                  {product.discountPrice.toLocaleString()}đ
                </span>
              </div>
            </div>
            <span className="text-sm font-bold text-gray-500">
              x{product.quantity}
            </span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <p className="flex justify-between">
            <span>Giá gốc</span>
            <span>1.000.000.000đ</span>
          </p>
          <p className="flex justify-between">
            <span>Giảm giá</span>
            <span>1.000.000.000đ</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Tổng tiền</span>
            <span>1.000.000.000đ</span>
          </p>
        </div>
      </section>

      {/* Đánh giá */}
      <section className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2 text-center">Đánh giá</h3>
        <hr className="mb-4 dark:border-white" />
        {selectedProduct ? (
          <>
            {/* Số sao */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Chất lượng sản phẩm
              </label>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStarChange(index + 1)}
                    className={`text-2xl ${
                      ratings[selectedProduct.id]?.stars > index
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}>
                    <Star fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
            {/* Nhận xét */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Nhận xét</label>
              <Textarea
                placeholder="Nhập nhận xét..."
                maxLength={200}
                rows={5}
                value={ratings[selectedProduct.id]?.comment || ""}
                onChange={(e) => handleCommentChange(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Hình ảnh */}
            <FileUploader
              label="Hình ảnh"
              accept="image/*"
              files={ratings[selectedProduct.id]?.images || []}
              setFiles={(files) => handleFileChange("images", files)}
            />
            {/* Video */}
            <FileUploader
              label="Video"
              accept="video/*"
              files={ratings[selectedProduct.id]?.video || []}
              setFiles={(files) => handleFileChange("video", files)}
            />
          </>
        ) : (
          <p className="text-gray-500">Chọn sản phẩm để đánh giá</p>
        )}
      </section>

      <Button
        className="col-span-1 lg:col-span-4 text-white font-bold mt-4"
        variant="filled">
        Đánh giá ({mockProducts.length})
      </Button>
    </div>
  );
}
