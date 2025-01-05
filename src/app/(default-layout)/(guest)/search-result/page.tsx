"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CustomerProductCard } from "@/components";
import { IProductProps } from "@/types/interfaces";
import { CustomerSearchFilter, CustomerSearchSort } from "./partials";
import { API_BASE_URL } from "@/utils/constants/urls";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm gọi API lấy dữ liệu sản phẩm tìm kiếm
  const getSearchProduct = async (searchParams: Record<string, string>) => {
    try {
      const queryParams = [];
      if (searchParams.searchKey)
        queryParams.push(`searchKey=${searchParams.searchKey}`);
      if (searchParams.category)
        queryParams.push(`category=${searchParams.category}`);
      if (searchParams.discount)
        queryParams.push(`discount=${searchParams.discount}`);
      if (searchParams.topRate) queryParams.push(`sortBy=hot`);

      // Thêm page vào queryParams
      queryParams.push(`page=${searchParams.page || 1}`);

      const queryString = queryParams.join("&");

      const res = await fetch(
        `${API_BASE_URL}/guest/productList/search?${queryString}`
        // {
        //   cache: "no-cache", // Không lưu cache để luôn lấy dữ liệu mới nhất
        // }
      );
      const data = await res.json();
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx:", data.data);
      return data.data;
    } catch (error) {
      console.error("Lỗi khi gọi API tìm kiếm sản phẩm:", error);
      return [];
    }
  };

  // useEffect để gọi API khi component được render
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      // Lấy searchKey từ searchParams
      const searchKey = searchParams.get("searchKey");

      // Kiểm tra nếu searchKey tồn tại
      if (searchKey) {
        const searchParamsObj = { searchKey };
        const productsData = await getSearchProduct(searchParamsObj);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", productsData);
        setProducts(productsData || []);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="container mx-auto my-28">
      <h1 className="font-bold text-center mb-8 dark:text-white">
        Search Results
      </h1>
      <div className="flex gap-12">
        {/* Sidebar Filter */}
        <CustomerSearchFilter />

        {/* Search Results */}
        <section className="flex-1">
          {/* Sorter */}
          <CustomerSearchSort />

          {/* Hiển thị Loading hoặc Kết quả tìm kiếm */}
          {isLoading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <CustomerProductCard
                  key={product.product_id_hashed}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
