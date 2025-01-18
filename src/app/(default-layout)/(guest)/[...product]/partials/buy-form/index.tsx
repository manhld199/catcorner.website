"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components";
import { CustomerProductVariant } from "../../components";
import { CustomerQuantityInputGroup, CustomerStarRating } from "@/components";
import { IBuyFormProps, ICartProduct } from "@/types/interfaces";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CustomerProductBuyForm({
  pid,
  variants,
  selectedVariantIndex,
  inputQuantity,
  onVariantSelect,
  onQuantityChange,
  productName,
  shortDescription,
  avgRating,
  productSoldQuantity,
}: IBuyFormProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State quản lý modal

  useEffect(() => {
    const maxQuantity = variants[selectedVariantIndex].variant_stock_quantity;
    if (inputQuantity > maxQuantity) {
      onQuantityChange(maxQuantity);
    }
  }, [selectedVariantIndex]);

  // Hàm mua ngay
  const handleBuyNow = () => {
    localStorage.removeItem("buyNowProduct");

    const selectedVariant = variants[selectedVariantIndex];

    const productInfo = {
      product_hashed_id: pid,
      variant_id: selectedVariant._id,
      quantity: inputQuantity,
      product_name: productName,
      variant_name: selectedVariant.variant_name,
      variant_price: selectedVariant.variant_price,
      variant_discount_percent: selectedVariant.variant_discount_percent,
      variant_img: selectedVariant.variant_img,
      total_price:
        inputQuantity *
        selectedVariant.variant_price *
        (1 - selectedVariant.variant_discount_percent / 100),
    };

    // Lưu vào localStorage
    localStorage.setItem("buyNowProduct", JSON.stringify(productInfo));
  };

  // Hàm thêm vào giỏ hàng
  const handleAddToCart = (): void => {
    try {
      // Lấy giỏ hàng hiện tại từ localStorage
      const existingCart = localStorage.getItem("cart");
      const cart: ICartProduct[] = existingCart ? JSON.parse(existingCart) : [];

      // Tạo sản phẩm mới để thêm vào giỏ hàng
      const selectedVariant = variants[selectedVariantIndex];
      const newCartItem: ICartProduct = {
        product_hashed_id: pid,
        variant_id: selectedVariant._id,
        quantity: inputQuantity,
        product_name: productName,
        product_slug: selectedVariant.variant_slug,
      };

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItemIndex = cart.findIndex(
        (item: ICartProduct) =>
          item.product_hashed_id === pid &&
          item.variant_id === selectedVariant._id
      );

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cart[existingItemIndex].quantity += inputQuantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        cart.push(newCartItem);
      }

      // Lưu giỏ hàng mới vào localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Thông báo thành công
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h1 className="font-bold mb-2 dark:text-white">{productName}</h1>
      <p className="text-gray-500 dark:text-gray-300 mb-4">
        {shortDescription}
      </p>
      {/* Star Rating */}
      <CustomerStarRating
        product_avg_rating={avgRating.rating_point ?? 0}
        product_sold_quantity={productSoldQuantity ?? 0}
      />

      <div className="mb-4">
        <p className="font-medium dark:text-gray-200">Chọn phân loại:</p>
        <div className="grid grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 mt-2">
          {variants.map((variant, index) => (
            <CustomerProductVariant
              key={variant._id}
              pid={pid}
              variant={{
                name: variant.variant_name,
                url: variant.variant_slug,
                image: {
                  url: variant.variant_img,
                  alt: `${productName} - ${variant.variant_name}`,
                },
              }}
              isActive={index === selectedVariantIndex}
              onClick={() => onVariantSelect(index)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2 dark:text-gray-200">Chọn số lượng:</p>
        <CustomerQuantityInputGroup
          initValue={{
            defaultValue: inputQuantity,
            minValue: 1,
            maxValue: variants[selectedVariantIndex].variant_stock_quantity,
          }}
          takeQuantity={onQuantityChange}
        />
      </div>

      <div className="flex items-center mb-6 gap-12">
        <p className="text-gray-500 dark:text-gray-400 line-through mr-4">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(variants[selectedVariantIndex].variant_price)}
        </p>
        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            variants[selectedVariantIndex].variant_price *
              (1 -
                variants[selectedVariantIndex].variant_discount_percent / 100)
          )}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          className="border border-pri-1 text-pri-1 dark:border-teal-500 dark:text-teal-500 w-48 py-3 rounded-lg hover:bg-teal-700 hover:text-white dark:hover:bg-teal-600"
          onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
        <Link href="/order-information">
          <button
            className="bg-pri-1 dark:bg-teal-500 text-white w-48 py-3 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600"
            onClick={handleBuyNow} // Gọi hàm handleBuyNow khi bấm nút
          >
            Mua ngay
          </button>
        </Link>
      </div>

      {/* Modal thêm vào giỏ hàng */}
      <Modal
        title="Sản phẩm đã được thêm vào giỏ hàng!"
        message="Bạn có thể kiểm tra giỏ hàng của mình ngay bây giờ."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
