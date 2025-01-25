// product-card.tsx

"use client";

import { IProductProps } from "@/types/interfaces";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { CustomerStarRating } from "@/components";
import { convertNumberToVND } from "@/utils/functions/convert";

interface ProductCardProps {
  product: IProductProps;
}

export default function ProductCard({ product }: ProductCardProps) {
  // console.log("proooooooooooduct", product);
  return (
    <Link
      href={`/${product.product_slug}?pid=${product.product_id_hashed}`}
      className="relative rounded-lg bg-white shadow-md dark:bg-gray-800 h-[440px] hover:cursor-pointer hover:shadow-lg dark:hover:shadow-gray-800">
      {/* Discount Badge */}
      {product.highest_discount ? (
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
          -{product.highest_discount}%
        </div>
      ) : null}

      {/* Product Image */}
      <div className="flex justify-center">
        <CldImage
          src={product.product_img || product.product_imgs[0]}
          alt={product.product_slug}
          width={200}
          height={200}
          className="h-[212px] w-full object-contain rounded-md"
        />
      </div>

      <div className="p-4">
        {/* Product Category */}
        <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-4 py-1 inline-block mb-2 dark:text-black">
          {product.category_name}
        </span>

        {/* Product Name */}
        <h5 className="hover:text-teal-600 dark:hover:text-teal-500 font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 overflow-hidden h-[54px]">
          {product.product_name}
        </h5>

        {/* Star Rating */}
        <CustomerStarRating
          product_avg_rating={product.product_avg_rating ?? 0}
          product_sold_quantity={product.product_sold_quantity ?? 0}
        />

        {/* Variant */}
        <div className="h-[52px]">
          {product.variant_name.length > 0 && (
            <div className="flex gap-2 mb-4">
              {product.variant_name.slice(0, 3).map((variant, index) => (
                <span
                  key={index}
                  className="px-2 text-center w-[64px] py-1 border border-teal-600 rounded-full text-xs text-teal-600 dark:text-teal-500 dark:border-teal-500 truncate"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  {variant}
                </span>
              ))}
              {product.variant_name.length > 3 && (
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-500">
                  ...
                </span>
              )}
            </div>
          )}
        </div>

        <hr className="dark:border-gray-600" />

        {/* Price */}
        <div className="text-center mt-2 mb-2 flex justify-between items-center w-full">
          {product.lowest_price &&
          product.lowest_price !== product.product_price ? (
            <>
              <span className="text-gray-400 dark:text-gray-300 line-through text-sm">
                {convertNumberToVND(product.product_price)}
              </span>
              <span className="text-lg font-bold text-red-500 ml-auto">
                {convertNumberToVND(product.lowest_price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-red-500 ml-auto">
              {convertNumberToVND(product.product_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
