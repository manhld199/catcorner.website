"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderDetails from "@/components/(order)/order-details";
import { Order } from "@/types/order";
import { toast } from "react-toastify";
import { ORDER_URL } from "@/utils/constants/urls";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderTrackingResult() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = searchParams.get("order_id");
      const phoneNumber = searchParams.get("phone_number");

      if (!orderId || !phoneNumber) {
        toast.error("Không tìm thấy mã đơn hàng hoặc số điện thoại trong URL");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${ORDER_URL}/track?order_id=${orderId}&phone_number=${phoneNumber}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Không tìm thấy đơn hàng");
        }
        console.log(data);

        console.log(data.order);

        setOrder(data.data.order);
      } catch (error: any) {
        toast.error(error.message || "Không tìm thấy đơn hàng");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full md:w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] relative dark:bg-black">
      {/* Sidebar */}
      <Card
        className="
        flex flex-col
        w-full md:w-[300px] 
        h-auto md:h-[450px]
        bg-white dark:bg-black
        md:bg-transparent
        sticky top-4
        z-10
        transition-all duration-300">
        <CardContent className="pt-6 space-y-6 h-auto">
          {/* Logo */}
          <div className="flex justify-center md:justify-start items-center">
            <Image
              src="/imgs/logo-pri.webp"
              alt="Logo CATCORNER"
              width={241}
              height={85}
              className="w-[180px] md:w-[241px] h-auto object-contain"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 py-3">
              <ShoppingBag size={24} />
              <span className="text-sm">
                Mã đơn hàng: <span className="font-bold">{order._id}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 py-3">
              <Phone className="w-4 h-4 text-neutral-950" />
              <span className="text-sm">
                Số điện thoại:{" "}
                <span className="font-bold">
                  {order.order_buyer.phone_number}
                </span>
              </span>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center pb-6">
          <Link href="/order-tracking" className="w-[70%]">
            <Button
              className="w-full bg-[#1d4443] hover:bg-[#1d4443]/90 text-white"
              variant="custom">
              Tra cứu lại
            </Button>
          </Link>
        </div>
      </Card>

      <div className="relative z-5">
        <OrderDetails
          order={order}
          onRepurchase={() => {}}
          onCancel={() => {}}
          onReview={() => {}}
        />
      </div>
    </div>
  );
}
