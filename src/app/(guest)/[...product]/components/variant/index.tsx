"use client";

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
      className={`flex items-center justify-center p-1 ${
        isActive
          ? "bg-pri-7 text-white border-2 border-pri-7"
          : "border border-gray-300"
      } rounded-md hover:border-pri-7 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-22 h-8`}
    >
      <div
        className={`text-center text-xs font-medium ${
          isActive ? "text-white" : "text-gray-800 dark:text-white"
        }`}
      >
        {variant.name}
      </div>
    </div>
  );
}
