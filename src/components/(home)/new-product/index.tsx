"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/(general)/product-card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Product, IProductProps } from "@/types/product";
import { PRODUCT_URL } from "@/utils/constants/urls";

export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${PRODUCT_URL}?sort=lastes&page=1&limit=8`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const transformProduct = (product: Product): IProductProps => {
    const hasMultipleVariants = product.product_variants.length > 1;

    return {
      product_id_hashed: product._id,
      product_slug: product.product_slug,
      product_img: product.product_imgs,
      product_name: product.product_name,
      category_name: product.category.name,
      product_avg_rating: product.product_avg_rating,
      product_sold_quantity: product.product_sold_quantity,
      variant_name: hasMultipleVariants
        ? product.product_variants.map((v) => v.variant_name)
        : [],
      product_price: product.product_variants[0]?.variant_price || 0,
      lowest_price: Math.min(
        ...product.product_variants.map((v) => v.discounted_price)
      ),
      highest_discount: product.highest_discount,
    };
  };

  return (
    <div className="container w-[80%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-[#1B4242] mb-8">
        New Products
      </h2>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {products.slice(0, 4).map((product) => (
          <div key={product._id}>
            {/* Sau này xóa any đi fix chỗ này */}
            <ProductCard product={transformProduct(product) as any} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {products.slice(4, 8).map((product) => (
          <div key={product._id}>
            {/* Sau này xóa any đi fix chỗ này */}
            <ProductCard product={transformProduct(product) as any} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/products">
          <Button variant="link" className="text-base text-pri-1 font-bold">
            All Products
            <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
