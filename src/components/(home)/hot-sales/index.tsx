"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/(general)/cards/product-card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Product, IProductProps } from "@/types/product";
import { PRODUCT_LIST_URL } from "@/utils/constants/urls";

export default function HotSales() {
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

  return (
    <div className="container w-[80%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-[#1B4242] dark:text-pri-2 mb-8">
        Hot Sales
      </h2>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard
            key={`hot sale ${index}`}
            product={transformProduct(product) as any}
          />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {products.slice(4, 8).map((product, index) => (
          <ProductCard
            key={`hot sale 2 ${index}`}
            product={transformProduct(product) as any}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/products">
          <Button
            variant="link"
            className="text-base text-pri-1 dark:text-white font-bold">
            Tất cả sản phẩm
            <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
