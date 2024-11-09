"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CustomerProductSlider,
  CustomerProductInformation,
  CustomerProductBuyForm,
  CustomerProductReview,
} from "./partials";

import { IProductDetail } from "./interfaces";
import { API_BASE_URL } from "@/utils/constants/urls";

export default function ProductDetailsPage() {
  const [productData, setProductData] = useState<IProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [inputQuantity, setInputQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("info");
  const searchParams = useSearchParams();
  const pid = searchParams.get("pid");

  useEffect(() => {
    const fetchProductData = async () => {
      if (!pid) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/guest/product/${encodeURIComponent(
            pid.replaceAll(" ", "+")
          )}`
        );

        const data = await res.json();

        if (data.success && data.data?.product) {
          setProductData(data.data.product);
          console.log("Fetched product data:", data.data.product);
        } else {
          return;
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [pid]);

  if (isLoading) return <p>Loading...</p>;
  if (!productData) return <p>Product not found</p>;

  const handleVariantSelect = (index: number) => setSelectedVariantIndex(index);
  const handleQuantityChange = (newQuantity: number) =>
    setInputQuantity(newQuantity);

  return (
    <div className="container mx-auto my-28 w-4/5">
      <section className="flex flex-col laptop:flex-row gap-12">
        <div className="laptop:w-1/2">
          <CustomerProductSlider SliderImgs={productData.product_imgs} />
        </div>

        <div className="laptop:w-2/3">
          <CustomerProductBuyForm
            pid={pid as string}
            productName={productData.product_name}
            shortDescription={productData.product_short_description}
            avgRating={{
              rating_point: productData.product_avg_rating.rating_point,
              rating_count: productData.product_avg_rating.rating_count,
            }}
            price={
              productData.product_variants[selectedVariantIndex].variant_price
            }
            discountPrice={
              productData.product_variants[selectedVariantIndex].variant_price *
              (1 -
                productData.product_variants[selectedVariantIndex]
                  .variant_discount_percent /
                  100)
            }
            variants={productData.product_variants}
            selectedVariantIndex={selectedVariantIndex}
            inputQuantity={inputQuantity}
            onVariantSelect={handleVariantSelect}
            onQuantityChange={handleQuantityChange}
            productSoldQuantity={productData.product_sold_quantity}
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="flex gap-4 border-b pb-2">
          <button
            className={`font-medium ${
              activeTab === "info"
                ? "border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}>
            Thông tin
          </button>
          <button
            className={`font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}>
            Đánh giá
          </button>
        </div>
        {activeTab === "info" ? (
          <CustomerProductInformation
            description={productData.product_description}
          />
        ) : (
          <CustomerProductReview reviews={productData.recent_reviews} />
        )}
      </section>
    </div>
  );
}
