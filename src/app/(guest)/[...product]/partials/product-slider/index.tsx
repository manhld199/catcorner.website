"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dữ liệu demo
const productImgs = [
  { link: "/imgs/test.jpg", alt: "Product Image 1" },
  { link: "/imgs/test-1.jpg", alt: "Product Image 2" },
  { link: "/imgs/test.jpg", alt: "Product Image 3" },
  { link: "/imgs/test.jpg", alt: "Product Image 4" },
  { link: "/imgs/test-1.jpg", alt: "Product Image 5" },
];

export default function CustomerProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getClassNames = (index: number) => {
    if (index === currentIndex) {
      return "border border-neutral-300";
    } else if (index === hoveredIndex) {
      return "opacity-100";
    } else {
      return "opacity-50 hover:opacity-100";
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  const thumbnailsContainer = useRef<HTMLDivElement>(null);
  const SCROLL_OFFSET = 200;

  const handleScrollLeft = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : productImgs.length - 1;
    setCurrentIndex(newIndex);
  };

  const handleScrollRight = () => {
    const newIndex =
      currentIndex < productImgs.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="relative">
      {/* Ảnh chính */}
      <div className="relative w-full h-96 overflow-hidden">
        {" "}
        <div className="absolute inset-0 border border-neutral-300">
          <Image
            src={productImgs[currentIndex].link}
            alt={productImgs[currentIndex].alt}
            layout="fill"
            className="object-cover"
          />
        </div>
        {/* Nút điều hướng trái */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
          onClick={handleScrollLeft}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        {/* Nút điều hướng phải */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
          onClick={handleScrollRight}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
        {/* Chỉ số ảnh hiện tại */}
        <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded-md z-10">
          {currentIndex + 1}/{productImgs.length}
        </div>
      </div>

      {/* Ảnh thu nhỏ */}
      <div className="flex mt-4 space-x-2">
        <button onClick={handleScrollLeft} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div
          className="flex overflow-x-auto space-x-4"
          ref={thumbnailsContainer}
        >
          {productImgs.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer ${getClassNames(
                index
              )}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={img.link}
                alt={img.alt}
                layout="fill"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button onClick={handleScrollRight} className="p-2">
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
