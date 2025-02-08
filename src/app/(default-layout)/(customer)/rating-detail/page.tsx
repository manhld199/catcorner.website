"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  ORDER_RATING_URL,
  ORDER_CONTENT_RATING_URL,
} from "@/utils/constants/urls";
import { IRatingProduct } from "@/types/interfaces";
import { Star } from "lucide-react";

export default function RatingDetailPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const rawHashedOrderId = searchParams.get("pid");
  const hashedOrderId = encodeURIComponent(rawHashedOrderId || "");

  const [products, setProducts] = useState<IRatingProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IRatingProduct | null>(
    null
  );
  const [ratings, setRatings] = useState<{
    [key: string]: {
      stars: number;
      comment: string;
      images: string[];
      videos: string[];
    };
  }>({});
  const [shippingCost, setShippingCost] = useState(0);
  const [finalCost, setFinalCost] = useState(0);

  // Tính giá gốc
  const originalCost = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Tính tổng giảm giá
  const totalDiscount = products.reduce(
    (sum, product) => sum + product.discountAmount * product.quantity,
    0
  );

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!hashedOrderId || !session?.user?.accessToken) return;

      try {
        const response = await fetch(`${ORDER_RATING_URL}/${hashedOrderId}`, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        const orderData = data?.data?.order || {};
        const orderProducts = orderData.order_products || [];

        // Map products to the IRatingProduct structure
        const formattedProducts = orderProducts.map((product: any) => ({
          id: product.product_id,
          name: product.product_name,
          variant: product.variant_name,
          price: product.unit_price,
          discountPrice:
            product.unit_price * (1 - (product.discount_percent || 0) / 100),
          quantity: product.quantity,
          image: product.product_img || product.variant_img,
          discountAmount: product.unit_price * (product.discount_percent / 100),
        }));

        setProducts(formattedProducts);
        setShippingCost(orderData.shipping_cost || 0);
        setFinalCost(orderData.final_cost || 0);
        setSelectedProduct(formattedProducts[0] || null);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [hashedOrderId, session]);

  // Fetch ratings from API
  useEffect(() => {
    const fetchRatings = async () => {
      if (!hashedOrderId || !session?.user?.accessToken) return;

      try {
        const response = await fetch(
          `${ORDER_CONTENT_RATING_URL}/${hashedOrderId}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }

        const data = await response.json();

        if (data.success && data.ratings) {
          const ratingsMap = data.ratings.reduce(
            (acc: any, rating: any) => ({
              ...acc,
              [rating.product_id]: {
                stars: rating.rating_point,
                comment: rating.comment,
                images: rating.images || [],
                videos: rating.videos || [],
              },
            }),
            {}
          );
          setRatings(ratingsMap);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [hashedOrderId, session]);

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Sản phẩm đặt mua */}
      <section className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2 text-center">Sản phẩm đặt mua</h3>
        <hr className="mb-4 dark:border-white" />
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex items-center p-4 rounded-md cursor-pointer mb-2 ${
              selectedProduct?.id === product.id ? "bg-pri-2" : "bg-pri-3"
            }`}
            onClick={() => setSelectedProduct(product)}>
            <div className="w-16 h-16 relative">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                className="object-cover rounded-md"
              />
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-sm font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.variant}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">
                  {product.price.toLocaleString()}đ
                </span>
                <span className="font-bold text-teal-600">
                  {product.discountPrice.toLocaleString()}đ
                </span>
              </div>
            </div>
            <span className="text-sm font-bold text-gray-500">
              x{product.quantity}
            </span>
          </div>
        ))}
        {/* Tổng hợp giá */}
        <div className="border-t mt-4 pt-4">
          <p className="flex justify-between">
            <span>Giá gốc</span>
            <span>{originalCost.toLocaleString()}đ</span>
          </p>
          <p className="flex justify-between">
            <span>Giảm giá</span>
            <span>-{totalDiscount.toLocaleString()}đ</span>
          </p>
          <p className="flex justify-between">
            <span>Phí ship</span>
            <span>{shippingCost.toLocaleString()}đ</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Tổng tiền</span>
            <span className="text-teal-600">{finalCost.toLocaleString()}đ</span>
          </p>
        </div>
      </section>

      {/* Đánh giá */}
      <section className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2 text-center">Đánh giá</h3>
        <hr className="mb-4 dark:border-white" />
        {selectedProduct && ratings[selectedProduct.id] ? (
          <div>
            {/* Số sao */}
            <div className="mb-4">
              <p className="font-bold">Số sao:</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      ratings[selectedProduct.id]?.stars > index
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}>
                    <Star fill="currentColor" />
                  </span>
                ))}
              </div>
            </div>

            {/* Nhận xét */}
            <div className="mb-4">
              <p className="font-bold">Nhận xét:</p>
              <p>
                {ratings[selectedProduct.id]?.comment || "Không có nhận xét."}
              </p>
            </div>

            {/* Hình ảnh */}
            {ratings[selectedProduct.id]?.images.length > 0 && (
              <div className="mb-4">
                <p className="font-bold">Hình ảnh:</p>
                <div className="flex gap-4">
                  {ratings[selectedProduct.id].images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {ratings[selectedProduct.id]?.videos.length > 0 && (
              <div className="mb-4">
                <p className="font-bold">Video:</p>
                <div className="flex gap-4">
                  {ratings[selectedProduct.id].videos.map((video, index) => (
                    <video
                      key={index}
                      controls
                      className="w-64 h-36 rounded-md">
                      <source src={video} />
                      Trình duyệt của bạn không hỗ trợ phát video.
                    </video>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có đánh giá cho sản phẩm này.</p>
        )}
      </section>
    </div>
  );
}
