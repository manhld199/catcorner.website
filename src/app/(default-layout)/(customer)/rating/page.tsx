"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { FileUploader } from "./components";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ORDER_CONTENT_RATING_URL,
  ORDER_RATING_URL,
} from "@/utils/constants/urls";
import { IRatingProduct } from "@/types/interfaces";
import { convertNumberToVND } from "@/utils/functions/convert";

export default function RatingPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const rawHashedOrderId = searchParams.get("pid");
  const hashedOrderId = encodeURIComponent(rawHashedOrderId || "");
  const router = useRouter();

  const [products, setProducts] = useState<IRatingProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IRatingProduct | null>(
    null
  );
  const [ratings, setRatings] = useState<{
    [key: string]: {
      stars: number;
      comment: string;
      images: File[];
      video: File[];
    };
  }>({});
  const [shippingCost, setShippingCost] = useState(0);
  const [finalCost, setFinalCost] = useState(0);
  const [ratingContent, setRatingContent] = useState<{
    [key: string]: {
      stars: number;
      comment: string;
      images: string[]; // Dùng string[] vì API trả về URL của ảnh
      videos: string[]; // Dùng string[] vì API trả về URL của video
    };
  }>({});

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

  // Fetch order details using hashedOrderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!hashedOrderId || !session?.user?.accessToken) return;
      try {
        const response = await fetch(`${ORDER_RATING_URL}/${hashedOrderId}`, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        const orderData = data?.data?.order || {};
        const orderProducts = orderData.order_products || [];

        // Map the order products to the IRatingProduct structure
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

        // Initialize ratings for each product
        setRatings(
          formattedProducts.reduce(
            (acc: any, product: IRatingProduct) => ({
              ...acc,
              [product.id]: { stars: 5, comment: "", images: [], video: [] },
            }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [hashedOrderId, session]);

  const handleFileChange = (type: "images" | "video", files: File[]) => {
    if (!selectedProduct) return;
    setRatings((prev) => ({
      ...prev,
      [selectedProduct.id]: { ...prev[selectedProduct.id], [type]: files },
    }));
  };

  const handleStarChange = (stars: number) => {
    if (!selectedProduct) return;
    setRatings((prev) => {
      const updated = {
        ...prev,
        [selectedProduct.id]: { ...prev[selectedProduct.id], stars },
      };
      console.log("Updated ratings:", updated);
      return updated;
    });
  };

  const handleCommentChange = (comment: string) => {
    if (!selectedProduct) return;
    setRatings((prev) => {
      const updated = {
        ...prev,
        [selectedProduct.id]: { ...prev[selectedProduct.id], comment },
      };
      console.log("Updated comments:", updated);
      return updated;
    });
  };

  const handleSubmitAllRatings = async () => {
    if (!hashedOrderId || !session?.user?.accessToken) {
      alert("Vui lòng đảm bảo bạn đã đăng nhập.");
      return;
    }

    try {
      const allRatings = products.map((product) => {
        const ratingData = ratings[product.id];
        const formData = new FormData();

        // Append rating point and comment
        formData.append("rating_point", String(ratingData.stars || 5));
        formData.append("comment", ratingData.comment || "");

        // Append images and videos
        ratingData.images.forEach((image, index) => {
          formData.append("images", image);
          // console.log(
          //   `Product ID: ${product.id}, Image ${index + 1}: ${image.name}`
          // );
        });
        ratingData.video.forEach((video, index) => {
          formData.append("videos", video);
          // console.log(
          //   `Product ID: ${product.id}, Video ${index + 1}: ${video.name}`
          // );
        });

        // console.log(`EEEEEEEEEEEEEEEE product id: ${product.id}`);
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}:`, pair[1]);
        // }

        return {
          productId: product.id,
          formData,
        };
      });

      // Send all ratings
      const responses = await Promise.all(
        allRatings.map(async ({ productId, formData }) => {
          const url = `${ORDER_RATING_URL}/${hashedOrderId}/${productId}`;
          console.log(`Submitting to URL: ${url}`);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
            body: formData,
          });

          if (!response.ok) {
            throw new Error(
              `Không thể gửi đánh giá cho sản phẩm ID: ${productId}. Vui lòng thử lại.`
            );
          }

          return response.json();
        })
      );

      alert("Đánh giá đã được gửi thành công!");
      console.log("All ratings submitted:", responses);

      // Chuyển hướng tới trang rating-detail
      router.push(`/rating-detail?pid=${hashedOrderId}`);
    } catch (error) {
      console.error("Error submitting ratings:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá.");
    }
  };

  // Fetch order_rating from API
  useEffect(() => {
    const fetchRatings = async () => {
      if (!hashedOrderId || !session?.user?.accessToken) return;

      try {
        const response = await fetch(
          `${ORDER_CONTENT_RATING_URL}/${hashedOrderId}`,
          {
            headers: {
              Authorization: `Bearer ${session.user?.accessToken}`,
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
          setRatingContent(ratingsMap); // Lưu vào `ratingContent`
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
            <span>{convertNumberToVND(originalCost)}</span>
          </p>
          <p className="flex justify-between">
            <span>Giảm giá</span>
            <span>-{convertNumberToVND(totalDiscount)}</span>
          </p>
          <p className="flex justify-between">
            <span>Phí ship</span>
            <span>{convertNumberToVND(shippingCost)}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Tổng tiền</span>
            <span className="text-teal-600">
              {convertNumberToVND(finalCost)}
            </span>
          </p>
        </div>
      </section>

      {/* Đánh giá */}
      <section className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2 text-center">Đánh giá</h3>
        <hr className="mb-4 dark:border-white" />
        {selectedProduct ? (
          <>
            {/* Số sao */}
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Chất lượng sản phẩm
              </label>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStarChange(index + 1)}
                    className={`text-2xl ${
                      ratings[selectedProduct.id]?.stars > index
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}>
                    <Star fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
            {/* Nhận xét */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Nhận xét</label>
              <Textarea
                placeholder="Nhập nhận xét..."
                maxLength={200}
                rows={5}
                value={ratings[selectedProduct.id]?.comment || ""}
                onChange={(e) => handleCommentChange(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Hình ảnh */}
            <FileUploader
              label="Hình ảnh"
              accept="image/*"
              files={ratings[selectedProduct.id]?.images || []}
              setFiles={(files) => handleFileChange("images", files)}
            />
            {/* Video */}
            <FileUploader
              label="Video"
              accept="video/*"
              files={ratings[selectedProduct.id]?.video || []}
              setFiles={(files) => handleFileChange("video", files)}
            />
          </>
        ) : (
          <p className="text-gray-500">Chọn sản phẩm để đánh giá</p>
        )}
      </section>

      <Button
        className="col-span-1 lg:col-span-4 text-white font-bold mt-4"
        variant="filled"
        onClick={() => {
          if (Object.keys(ratingContent).length > 0) {
            // Nếu đã có đánh giá, chuyển sang trang "rating-detail"
            router.push(`/rating-detail?pid=${hashedOrderId}`);
          } else {
            // Nếu chưa có đánh giá, gửi đánh giá mới
            handleSubmitAllRatings();
          }
        }}>
        {Object.keys(ratingContent).length > 0
          ? "Xem đánh giá"
          : `Gửi đánh giá (${products.length})`}
      </Button>
    </div>
  );
}
