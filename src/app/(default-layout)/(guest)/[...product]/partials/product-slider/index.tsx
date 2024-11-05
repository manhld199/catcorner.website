"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderImg {
  link: string;
  alt: string;
}

interface SliderImgProps {
  SliderImgs: SliderImg[];
}

export default function CustomerProductSlider({ SliderImgs }: SliderImgProps) {
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

  const handleScrollLeft = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : SliderImgs.length - 1;
    setCurrentIndex(newIndex);
  };

  const handleScrollRight = () => {
    const newIndex =
      currentIndex < SliderImgs.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="relative">
      {/* Ảnh chính */}
      <div className="relative w-full h-96 overflow-hidden">
        <div className="absolute inset-0 border border-neutral-300">
          <Image
            src={SliderImgs[currentIndex].link}
            alt={SliderImgs[currentIndex].alt}
            layout="fill"
            className="object-cover"
          />
        </div>
        {/* Nút điều hướng trái */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-300/70 p-2 shadow-md rounded-full hover:bg-slate-300 dark:hover:bg-white"
          onClick={handleScrollLeft}>
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        {/* Nút điều hướng phải */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-300/70 p-2 shadow-md rounded-full hover:bg-slate-300 dark:hover:bg-white"
          onClick={handleScrollRight}>
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
        {/* Chỉ số ảnh hiện tại */}
        <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded-md z-10">
          {currentIndex + 1}/{SliderImgs.length}
        </div>
      </div>

      {/* Ảnh thu nhỏ */}
      <div className="flex mt-4 space-x-2">
        <button onClick={handleScrollLeft} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>

        <div
          className="flex overflow-x-auto space-x-4"
          ref={thumbnailsContainer}>
          {SliderImgs.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer ${getClassNames(
                index
              )}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleThumbnailClick(index)}>
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
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
      </div>
    </section>
  );
}
