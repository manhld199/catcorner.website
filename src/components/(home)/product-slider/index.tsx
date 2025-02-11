"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CardProduct } from "@/components";
import type { Product, IProductProps } from "@/types/product";
import { PRODUCT_LIST_URL } from "@/utils/constants/urls";

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PRODUCT_LIST_URL}/getDiscountProducts`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1);
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2);
      } else {
        setVisibleProducts(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformProduct = (product: any): IProductProps => {
    const hasMultipleVariants = product.variant_names.length > 1;

    return {
      product_id_hashed: product.product_id_hashed,
      product_slug: product.product_slug,
      product_img: product.product_img,
      product_name: product.product_name,
      category_name: product.category_name,
      product_avg_rating: product.product_avg_rating.rating_point,
      product_sold_quantity: product.product_sold_quantity,
      variant_name: hasMultipleVariants
        ? product.variant_names.map((v: any) => v || "")
        : [],
      product_price: product.lowest_price,
      lowest_price: product.lowest_price * product.highest_discount,
      highest_discount: product.highest_discount,
    };
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === products.length - visibleProducts ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - visibleProducts : prev - 1
    );
  };

  return (
    <div className="container w-full sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-4 sm:py-6 md:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1B4242] dark:text-pri-2 mb-4 sm:mb-6 md:mb-8">
        Hôm nay tại CatCorner
      </h2>

      <div className="relative px-4 sm:px-8 md:px-12">
        <Button
          variant="none"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={prevSlide}>
          <ChevronLeft
            className="w-6 h-6 sm:w-8 sm:h-8"
            style={{ height: "48px", width: "48px" }}
          />
        </Button>

        <div className="overflow-hidden px-2 sm:px-4">
          <div
            className="flex transition-transform duration-300 ease-in-out pb-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
            }}>
            {products.map((product, index) => (
              <div
                key={index}
                className={`flex-none ${visibleProducts === 1 ? "w-full" : visibleProducts === 2 ? "w-1/2" : "w-1/3"}`}
                data-cy={`product-item-${index}`}>
                <div className="flex justify-center px-2 sm:px-4">
                  <CardProduct
                    product={transformProduct(product) as any}
                    className="w-full max-w-[320px]"
                  />
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
          <ChevronRight
            className="w-6 h-6 sm:w-8 sm:h-8"
            style={{ height: "48px", width: "48px" }}
          />
        </Button>
      </div>
    </div>
  );
}
