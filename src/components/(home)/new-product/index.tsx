"use client";

import { Button } from "@/components/ui/button";
import { CardProduct } from "@/components";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product, IProductProps } from "@/types/product";
import { PRODUCT_LIST_URL } from "@/utils/constants/urls";

export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PRODUCT_LIST_URL}/getNewestProducts`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.slice(0, 8)); // Limit to 8 products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
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

  return (
    <div className="container w-full px-4 sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-4 sm:py-6 md:py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#1B4242] dark:text-pri-2 mb-4 sm:mb-6 md:mb-8">
        Sản phẩm mới
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-7 md:mb-8">
        {products.map((product, index) => (
          <div key={`new product ${index}`} className="flex justify-center">
            <CardProduct
              product={transformProduct(product) as any}
              className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/products">
          <Button
            variant="link"
            className="text-sm sm:text-base text-pri-1 dark:text-gray-200 font-bold">
            Tất cả sản phẩm
            <ArrowUpRight className="ml-1 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
