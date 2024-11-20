"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderDetails from "@/components/(order)/order-details";
import { Order } from "@/types/order";
import { toast } from "react-toastify";
import { ORDER_URL } from "@/utils/constants/urls";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cat, Package, Phone } from "lucide-react";

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
    <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] relative z-0 dark:bg-black">
      {/* Sidebar */}
      <Card
        className="
        md:flex h-auto md:h-[450px] w-full md:w-[300px] flex-col
        fixed md:relative top-0 left-0 z-40 flex 
        bg-white dark:black
        md:bg-transparent
        transition-all duration-300">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-center gap-2 text-xl font-medium">
            <Cat className="w-6 h-6 text-teal-600" />
            <span>
              CAT<span className="text-neutral-950">CORNER</span>
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-neutral-950" />
              <span className="text-sm">Mã đơn hàng: {order._id}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-950" />
              <span className="text-sm">
                Số điện thoại: {order.order_buyer.phone_number}
              </span>
            </div>
          </div>

          <Button className="w-full bg-[#1d4443] hover:bg-[#1d4443]/90 text-white">
            Tra cứu lại
          </Button>
        </CardContent>
      </Card>

      <OrderDetails
        order={order}
        onRepurchase={() => {}}
        onCancel={() => {}}
        onReview={() => {}}
      />
    </div>
  );
}
