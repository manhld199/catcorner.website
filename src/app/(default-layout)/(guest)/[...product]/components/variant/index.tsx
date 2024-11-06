"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";

interface IVariant {
  name: string;
  url: string;
  image: {
    url: string;
    alt: string;
  };
}

export default function ProductVariant({
  pid,
  variant,
  isActive,
  onClick,
}: {
  pid: string;
  variant: IVariant;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-start p-2 ${
        isActive
          ? "bg-pri-7 text-white border-2 border-pri-7"
          : "border border-gray-300"
      } rounded-md hover:border-pri-7 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-26 h-26`}>
      {/* Ảnh variant */}
      <CldImage
        src={variant.image.url}
        alt={variant.image.alt}
        width={70}
        height={70}
        className="object-cover rounded mb-1"
      />

      {/* Tên variant */}
      <div
        className={`text-center text-sm font-medium ${
          isActive ? "text-white" : "text-gray-800 dark:text-white"
        }`}>
        {variant.name}
      </div>
    </div>
  );
}
