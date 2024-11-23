"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "../product-card/index";
import { useState } from "react";

const products = [
  {
    name: "Tên sản phẩm Tên sản phẩm nè",
    image: "/imgs/home/product.png",
    rating: 4,
    weights: ["100 g", "200 g", "300 g"],
    originalPrice: "456.789đ",
    salePrice: "123.456đ",
  },
  {
    name: "Tên sản phẩm Tên sản phẩm nè",
    image: "/imgs/home/product.png",
    rating: 4,
    weights: ["100 g", "200 g", "300 g"],
    originalPrice: "456.789đ",
    salePrice: "123.456đ",
  },
  {
    name: "Tên sản phẩm Tên sản phẩm nè",
    image: "/imgs/home/product.png",
    rating: 4,
    weights: ["100 g", "200 g", "300 g"],
    originalPrice: "456.789đ",
    salePrice: "123.456đ",
  },
];

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 3 : prev - 1));
  };

  return (
    <div className="container w-[80%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-[#1B4242] mb-8">
        CatCorner's Today
      </h2>

      <div className="relative px-12">
        <Button
          variant="none"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={prevSlide}>
          <ChevronLeft className="w-8 h-8" />
        </Button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
            {products.map((product, index) => (
              <div key={index} className="flex-none w-1/3 px-4">
                <div className="flex justify-center">
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="none"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          onClick={nextSlide}>
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
