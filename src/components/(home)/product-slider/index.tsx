"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ProductCard from "@/components/(general)/cards/product-card";
import { Product, IProductProps } from "@/types/product";
import { PRODUCT_LIST_URL } from "@/utils/constants/urls";

const products = [
  {
    product_id_hashed: "1",
    product_slug: "san-pham-1",
    product_img: "/imgs/home/product.png",
    product_name: "Tên sản phẩm Tên sản phẩm nè",
    category_name: "Thức ăn",
    product_avg_rating: 4,
    product_sold_quantity: 100,
    variant_name: ["100g", "200g", "300g"],
    product_price: 456789,
    lowest_price: 123456,
    highest_discount: 10,
  },
  {
    product_id_hashed: "2",
    product_slug: "san-pham-2",
    product_img: "/imgs/home/product.png",
    product_name: "Tên sản phẩm Tên sản phẩm nè",
    category_name: "Thức ăn",
    product_avg_rating: 4,
    product_sold_quantity: 100,
    variant_name: ["100g", "200g", "300g"],
    product_price: 456789,
    lowest_price: 123456,
    highest_discount: 10,
  },
  {
    product_id_hashed: "3",
    product_slug: "san-pham-3",
    product_img: "/imgs/home/product.png",
    product_name: "Tên sản phẩm Tên sản phẩm nè",
    category_name: "Thức ăn",
    product_avg_rating: 4,
    product_sold_quantity: 100,
    variant_name: ["100g", "200g", "300g"],
    product_price: 456789,
    lowest_price: 123456,
    highest_discount: 10,
  },
];

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PRODUCT_LIST_URL}/getTopRatedProducts`);
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

  const transformProduct = (product: any): IProductProps => {
    // console.log(product);
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
    setCurrentIndex((prev) => (prev === products.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 3 : prev - 1));
  };

  return (
    <div className="container w-[80%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-[#1B4242] mb-8">
        CatCorner&apos;s Today
      </h2>

      <div className="relative px-12">
        <Button
          variant="none"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={prevSlide}>
          <ChevronLeft
            style={{ height: "48px", width: "48px" }}
            className="w-8 h-8"
          />
        </Button>

        <div className="overflow-hidden px-4">
          <div
            className="flex transition-transform duration-300 ease-in-out pb-6"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
            {products.map((product, index) => (
              <div key={index} className="flex-none w-1/3">
                <div className="flex justify-center">
                  <ProductCard
                    product={transformProduct(product) as any}
                    className="w-[320px]"
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
            style={{ height: "48px", width: "48px" }}
            className="w-8 h-8"
          />
        </Button>
      </div>
    </div>
  );
}
