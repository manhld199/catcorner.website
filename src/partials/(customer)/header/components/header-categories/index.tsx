"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PRODUCT_BY_CATEGORY_URL } from "@/utils/constants/urls";
import { ChevronDown } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  image: string;
}

interface Category {
  name: string;
  image: string;
  products: Product[];
}

export default function CustomerHeaderCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch danh mục và sản phẩm từ API
  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(PRODUCT_BY_CATEGORY_URL);
        console.log("API gọi:", PRODUCT_BY_CATEGORY_URL);

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ API");
        }

        const data = await response.json();
        console.log("Dữ liệu trả về từ API:", data);

        if (data.success && Array.isArray(data.data.categories)) {
          const formattedCategories = data.data.categories.map((c: any) => ({
            name: c.category_name,
            image: c.category_img, // Sửa lỗi, lấy hình ảnh danh mục
            products: c.products.map((p: any) => ({
              _id: p._id,
              name: p.product_name,
              price: p.product_variants[0]?.variant_price || 0, // Lấy giá đầu tiên nếu có
              discountPrice: p.product_variants[0]?.discounted_price || 0,
              image: p.product_imgs || "/imgs/test.jpg", // Sửa lỗi, lấy hình ảnh sản phẩm
            })),
          }));

          setCategories(formattedCategories);
          if (!selectedCategory && formattedCategories.length > 0) {
            setSelectedCategory(formattedCategories[0].name);
          }
        } else {
          throw new Error("Dữ liệu danh mục không hợp lệ");
        }
      } catch (err) {
        console.error("Lỗi khi tải danh mục và sản phẩm:", err);
        setError("Lỗi khi tải danh mục và sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  // Lọc sản phẩm theo danh mục đã chọn
  const selectedProducts =
    categories.find((category) => category.name === selectedCategory)
      ?.products || [];

  return (
    <div className="relative group">
      {/* Trigger */}
      <div className="hidden laptop:flex cursor-pointer text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300">
        <span className="ml-2 font-semibold mr-2">Danh mục</span>
        <ChevronDown />
      </div>

      {/* Dropdown */}
      <div className="z-50 absolute left-1/2 transform -translate-x-1/2 mt-4 laptop:w-[90vw] desktop:w-[80vw] bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
        <div className="flex">
          {/* Danh mục bên trái */}
          <div className="w-1/4 bg-teal-50 dark:bg-gray-800 py-4">
            {loading ? (
              <p className="px-4 py-2 text-gray-500">Đang tải danh mục...</p>
            ) : error ? (
              <p className="px-4 py-2 text-red-500">{error}</p>
            ) : (
              <ul>
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className={`px-4 py-2 hover:bg-teal-300/10 dark:hover:bg-gray-700 cursor-pointer flex items-center ${
                      selectedCategory === category.name
                        ? "bg-teal-300/10 dark:bg-gray-700"
                        : ""
                    }`}
                    onMouseEnter={() => setSelectedCategory(category.name)}>
                    <Image
                      src={category.image || "/imgs/test.jpg"}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="object-cover rounded w-[40px] h-[40px] mr-3"
                    />
                    {category.name} ({category.products.length})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sản phẩm bên phải */}
          <div className="w-3/4 p-4">
            <h3 className="font-bold mb-4">
              Sản phẩm bán chạy trong {selectedCategory || "danh mục"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <p className="text-gray-500">Đang tải sản phẩm...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : selectedProducts.length > 0 ? (
                selectedProducts.map((product, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Image
                      src={product.image || "/imgs/test.jpg"}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                    <h4 className="mt-2 text-sm font-medium">{product.name}</h4>
                    <p className="text-gray-500 line-through">
                      {product.price.toLocaleString()}đ
                    </p>
                    <p className="text-red-500 font-semibold">
                      {product.discountPrice.toLocaleString()}đ
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có sản phẩm nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
