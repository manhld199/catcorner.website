"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import { CustomerProductCard } from "@/components";
import { IProductProps } from "@/types/interfaces";
import { CustomerSearchFilter, CustomerSearchSort } from "./partials";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { API_BASE_URL } from "@/utils/constants/urls";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 1,
    totalResults: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSearchResults = async (page = 1) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();

      // Lấy các tham số từ searchParams
      const searchKey = searchParams.get("searchKey");
      const category = searchParams.get("category");
      const discount = searchParams.get("discount");
      const sortBy = searchParams.get("sortBy");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const rating = searchParams.get("rating");

      // Thêm các điều kiện vào queryParams
      if (searchKey) queryParams.append("searchKey", searchKey);
      if (category) {
        const categories = category.split(",").map((cat) => cat.trim());
        queryParams.append("category", categories.join(","));
      }
      if (discount) queryParams.append("discount", discount);
      if (sortBy) queryParams.append("sortBy", sortBy);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (rating) {
        const ratings = rating.split(",").map((r) => r.trim());
        queryParams.append("rating", ratings.join(","));
      }

      queryParams.append("page", page.toString());

      const queryString = queryParams.toString();
      const apiUrl = `${API_BASE_URL}/guest/productList/search?${queryString}`;

      // console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();

      setProducts(data.data || []);
      setPagination(
        data.pagination || { totalPages: 0, currentPage: 1, totalResults: 0 }
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults(pagination.currentPage);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.totalPages) {
      fetchSearchResults(page);
    }
  };

  return (
    <div className="container mx-auto bg-white dark:bg-black p-6 rounded-lg">
      <h1 className="font-bold text-center mb-8 dark:text-white">
        Kết quả tìm kiếm
      </h1>

      {/* Phần lọc và sắp xếp luôn hiển thị */}
      <div className="flex gap-4">
        <CustomerSearchFilter />

        <section className="flex-1">
          <CustomerSearchSort />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <Player
                autoplay
                loop
                src="/lottie/search.json"
                style={{ height: "250px", width: "250px" }}
              />
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Đang tải sản phẩm...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <Player
                autoplay
                loop
                src="/lottie/search.json"
                style={{ height: "250px", width: "250px" }}
              />
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Uiss, không tìm thấy sản phẩm phù hợp. Hãy thử lại nhé!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <CustomerProductCard
                    key={product.product_id_hashed}
                    product={product}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                      />
                    </PaginationItem>
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            isActive={pagination.currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
