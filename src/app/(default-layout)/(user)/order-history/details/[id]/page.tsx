"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import OrderDetails from "@/components/(order)/order-details";
import { extractOrderIdPrefix } from "@/utils/functions/format";

interface OrderProduct {
  product_id: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  product_name: string;
  product_img: string;
  variant_name: string;
  variant_img: string;
}

interface OrderBuyer {
  name: string;
  phone_number: string;
  address: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
}

interface Order {
  _id: string;
  order_id: string;
  user_id: string;
  order_products: OrderProduct[];
  order_buyer: OrderBuyer;
  order_note: string;
  shipping_cost: number;
  final_cost: number;
  order_status: "unpaid" | "delivering" | "delivered" | "canceled";
  createdAt: string | null;
}

interface OrderResponse {
  status: number;
  success: boolean;
  data: {
    order: Order;
  };
}

export default function OrderDetail() {
  const { data: session } = useSession();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    if (session?.user?.accessToken && orderId) {
      fetchOrderDetails();
    }
  }, [session, orderId]);

  const fetchOrderDetails = async () => {
    if (!session?.user?.accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const responseData: OrderResponse = await response.json();
      setOrder(responseData.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Không thể tải thông tin đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepurchase = (orderId: string) => {
    console.log("Repurchase order:", orderId);
  };

  const handleCancel = (orderId: string) => {
    console.log("Cancel order:", orderId);
  };

  const handleReview = (orderId: string) => {
    console.log("Review order:", orderId);
  };

  if (isLoading) {
    return (
      <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pri-1 mx-auto"></div>
          <p className="mt-2">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
        <div className="text-center py-4">Không tìm thấy đơn hàng</div>
      </div>
    );
  }

  return (
    // <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] dark:bg-black">
    <>
      {order && (
        <OrderDetails
          order={order}
          onRepurchase={handleRepurchase}
          onCancel={handleCancel}
          onReview={handleReview}
        />
      )}
    </>
  );
}
