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

export default function SearchPage() {
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
      const queryParams: string[] = [];
      const searchKey = searchParams.get("searchKey");
      const category = searchParams.get("category");
      const discount = searchParams.get("discount");
      const sortBy = searchParams.get("sort");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const rating = searchParams.get("rating");

      if (searchKey) queryParams.push(`searchKey=${searchKey}`);
      if (category) queryParams.push(`category=${category}`);
      if (discount) queryParams.push(`discount=${discount}`);
      if (sortBy) queryParams.push(`sortBy=${sortBy}`);
      if (minPrice) queryParams.push(`minPrice=${minPrice}`);
      if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);
      if (rating) queryParams.push(`rating=${rating}`);
      queryParams.push(`page=${page}`);

      const queryString = queryParams.join("&");
      const response = await fetch(
        `${API_BASE_URL}/guest/productList/search?${queryString}`
      );
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
    <div className="container mx-auto bg-white p-6 rounded-lg">
      <h1 className="font-bold text-center mb-8 dark:text-white">
        Kết quả tìm kiếm
      </h1>

      {products.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Player
            autoplay
            loop
            src="/lottie/search.json"
            style={{ height: "250px", width: "250px" }}
          />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Uiss, không tìm thấy sản phẩm phù hợp. Hãy thử lại với từ khoá khác
            bạn nhé!
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
