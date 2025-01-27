"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoadingScreen } from "@/components/(general)/loading/loading-screen";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

const PAYMENT_PRODUCTS = "paymentData";

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        const storedData = localStorage.getItem(PAYMENT_PRODUCTS);

        const paymentData = JSON.parse(storedData);
        localStorage.removeItem(PAYMENT_PRODUCTS);

        if (paymentData && paymentData.re_payment) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/payos/get-payment-link/${paymentData.order_id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            toast.error(
              "Không thể lấy liên kết thanh toán, vui lòng thử lại sau!"
            );
            router.back();
            return;
          }
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/payos/create-payment-link`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentData),
            }
          );

          if (paymentData && paymentData.payment_method === "onl") {
            const data = await response.json();
            const { checkoutUrl, message } = data;

            if (checkoutUrl) {
              console.log("checkoutUrl", checkoutUrl);
              window.location.href = checkoutUrl;
            } else {
              console.log(
                "Không thể tạo liên kết thanh toán, vui lòng thử lại sau!"
              );
              router.back();
            }
          } else if (paymentData && paymentData.payment_method === "cod") {
            window.location.href = `/order-success?orderId=${encodeURIComponent(paymentData.order_id)}`;
          }
        }
      } catch (error) {
        console.log("Có lỗi xảy ra, vui lòng thử lại sau!", error);
        router.back();
      }
    };

    fetchPaymentLink();
  }, [router]);

  return (
    <div className="mx-auto md:w-[500px] aspect-square flex flex-col gap-2 items-center">
      <div className="w-1/2 mx-auto aspect-square rounded-full bg-gray-100 dark:bg-gray-600 flex flex-col justify-center items-center">
        <div className="relative w-2/3 aspect-square">
          <Image
            src="/imgs/noti/cat-2.png"
            alt="Hệ thống đang xử lý"
            fill={true}
          />
        </div>
        <BeatLoader />
      </div>
      <p className="font-semibold">
        Hệ thống đang xử lý, vui lòng đợi một tí nhé!
      </p>
    </div>
  );
}
