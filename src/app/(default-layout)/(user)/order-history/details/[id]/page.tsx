"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import OrderDetails from "@/components/(order)/order-details";
import { extractOrderIdPrefix } from "@/utils/functions/format";
import { putData } from "@/utils/functions/client";

interface OrderProduct {
  product_hashed_id?: string;
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
  order_id_hashed: string;
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

  const handleRepurchase = async (order: Order) => {
    try {
      if (order.order_status == "unpaid") {
        const newPaymentData = {
          _id: order._id,
          order_id: order.order_id,
          re_payment: true,
          order_status: order.order_status,
        };
        localStorage.setItem("paymentData", JSON.stringify(newPaymentData));
        window.location.href = "/payment";
      } else if (order.order_status == "canceled") {
        const orderProducts = order.order_products.map((product: any) => ({
          product_hashed_id: product.product_hashed_id,
          variant_id: product.variant_id,
          quantity: product.quantity,
          unit_price: product.unit_price,
          discount_percent: product.discount_percent,
        }));

        // Define payment data structure
        const newPaymentData = {
          _id: order._id,
          order_id: order.order_id,
          user_id: session ? session.user.id : undefined,
          order_products: orderProducts,
          order_buyer: {
            name: order.order_buyer.name,
            phone_number: order.order_buyer.phone_number,
            address: order.order_buyer.address,
          },
          order_note: order.order_note || "",
          shipping_cost: order.shipping_cost,
          payment_method: "onl",
          cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-history?selectedTab=unpaid`, // Cancel URL
          return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-success?orderId=${encodeURIComponent(order.order_id)}`, // Success redirect
          re_payment: true,
        };

        // Save payment data to local storage
        localStorage.setItem("paymentData", JSON.stringify(newPaymentData));
        // console.log("dataaaaaaaaa neeeeee", newPaymentData);

        // Redirect to the payment page
        window.location.href = "/payment";
      }
    } catch (err) {
      console.log("Error in repurchasing order: ", err);
    }
  };

  const handleCancel = async (orderId: string) => {
    try {
      const data = await putData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/cancel/${orderId}`,
        {}
      );
      // console.log("data: ", data);
      if (!data.success) {
        toast.error("Không thể hủy đơn hàng");
        throw new Error("Failed to cancel order");
      }

      toast.success("Hủy đơn hàng thành công");
      location.reload();
    } catch (err) {
      console.log("Error in canceling order: ", err);
    }
    // console.log("Cancel order:", orderId);
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
