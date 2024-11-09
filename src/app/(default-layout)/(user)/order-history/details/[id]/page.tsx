"use client";
import { Clock, MapPin, Truck, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UserSidebar from "@/partials/(user)/sidebar_nav";
import StatusBadge from "@/components/(order)/status-badge";
import OrderActions from "@/components/(order)/order-actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import OrderProductItem from "@/components/(order)/order-product-item";

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
  user_id: string;
  order_products: OrderProduct[];
  order_buyer: OrderBuyer;
  order_note: string;
  total_products_cost: number;
  shipping_cost: number;
  final_cost: number;
  order_status: "shipping" | "completed" | "pending" | "cancelled";
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
    <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
      <UserSidebar />
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Chi tiết đơn hàng</h1>

        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Order ID and Status */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-base text-muted-foreground">
                  Mã đơn hàng
                </div>
                <div className="font-medium text-base text-pri-1">
                  {order._id}
                </div>
              </div>
              <StatusBadge status={order.order_status} />
            </div>

            {/* Shipping Route */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 rounded-[32px]">
                <Truck size={16} />
                <span className="text-sm text-pri-1">
                  Thủ Đức, Tp Hồ Chí Minh
                </span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 rounded-[32px]">
                <MapPin size={16} />
                <span className="text-sm text-pri-1">
                  {order.order_buyer.address.district},{" "}
                  {order.order_buyer.address.province}
                </span>
              </div>
            </div>

            {/* Order Details */}
            <div className="w-full mx-auto space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <Card className="col-span-2 p-4 bg-light-gray rounded-[8px]">
                  <div className="flex flex-col gap-1 h-full justify-between">
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                      <Truck className="h-5 w-5" />
                    </div>
                    <p className="text-base">
                      Cậu đợi 1 lát nhé, shop sẽ xác nhận ngay thôi !
                    </p>

                    <OrderActions
                      status={order.order_status}
                      orderId={order._id}
                      onRepurchase={handleRepurchase}
                      onCancel={handleCancel}
                      onReview={handleReview}
                    />
                  </div>
                </Card>

                <Card className="col-span-1 p-4 bg-light-gray rounded-[8px]">
                  <div className="flex flex-col gap-4 h-full justify-between">
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base text-neutral-400">
                        Giao hàng dự kiến
                      </div>
                      <div className="font-medium text-base text-pri-1">
                        28/09/25
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="col-span-1 p-6 bg-light-gray rounded-[8px]">
                  <div className="flex flex-col gap-4 h-full justify-between">
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                      <Timer className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base text-neutral-400">
                        Giao hàng trong:
                      </div>
                      <div className="font-medium text-base text-pri-1">
                        5 ngày
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 rounded-[8px] h-[160px]">
                  <div className="pb-2 text-neutral-500 text-base">
                    Chi tiết
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-base text-neutral-400">
                        Ngày đặt:
                      </span>
                      <span className="font-medium text-base text-pri-1">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-base text-neutral-400">
                        Phương thức thanh toán:
                      </span>
                      <span className="font-medium text-base text-pri-1">
                        Thanh toán khi nhận hàng
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 rounded-[8px] h-[160px] relative">
                  <div className="pb-2 text-neutral-500 text-base">
                    Địa chỉ nhận hàng
                  </div>
                  <div className="space-y-2 text-sm overflow-hidden">
                    <div className="flex">
                      <span className="text-base text-neutral-400 min-w-[100px]">
                        Họ tên:
                      </span>
                      <span className="font-medium text-base text-pri-1">
                        {order.order_buyer.name}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-base text-neutral-400 min-w-[100px]">
                        Điện thoại:
                      </span>
                      <span className="font-medium text-base text-pri-1">
                        {order.order_buyer.phone_number}
                      </span>
                    </div>
                    <div className="relative group">
                      <span className="font-medium text-base text-pri-1">
                        {`${order.order_buyer.address.street}, ${order.order_buyer.address.ward}, ${order.order_buyer.address.district}, ${order.order_buyer.address.province}`}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Products */}
            <div className="text-xl text-pri-1 py-3 font-medium">Sản phẩm</div>

            <div className="space-y-4">
              {order.order_products.map((product) => (
                <OrderProductItem
                  key={`${product.product_id}-${product.variant_id}`}
                  product={product}
                />
              ))}

              {/* Total */}
              <div className="mt-4 pt-4 border-t flex flex-col gap-2 items-end">
                <div className="text-sm">
                  <span className="text-neutral-500 text-base">
                    Tổng tiền hàng:{" "}
                  </span>
                  <span className="font-medium  text-base">
                    ₫{order.total_products_cost.toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-500 text-base">
                    Phí vận chuyển:{" "}
                  </span>
                  <span className="font-medium  text-base">
                    ₫{order.shipping_cost.toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="text-base mt-1">
                  <span className="font-medium">Thành tiền: </span>
                  <span className="text-lg font-semibold text-pri-7">
                    ₫{order.final_cost.toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
