"use client";
// import libs
import { Clock, MapPin, Truck, Timer } from "lucide-react";

// import types
import { Order } from "@/types/order";

// import components
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/(order)/status-badge";
import OrderActions from "@/components/(order)/order-actions";
import OrderProductItem from "@/components/(order)/order-product-item";

// import utils
import { extractOrderIdPrefix } from "@/utils/functions/format";

interface OrderDetailsProps {
  order: Order;
  title?: string;
  description?: string;
  onRepurchase?: (order: Order) => void;
  onCancel?: (orderId: string) => void;
  onReview?: (orderId: string) => void;
}

export default function OrderDetails({
  order,
  title = "Chi tiết đơn hàng",
  description,
  onRepurchase,
  onCancel,
  onReview,
}: OrderDetailsProps) {
  // console.log("orrrrr", order);
  return (
    <div className="container mx-auto w-[100%]">
      <h1 className="text-2xl mb-2 font-bold dark:text-white">{title}</h1>
      {description && (
        <p className="text-lg font-light text-gray-600">{description}</p>
      )}

      <Card className="my-6 dark:bg-black dark:border-gray-700">
        <CardContent className="p-6">
          {/* Order ID and Status */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-base text-muted-foreground dark:text-gray-400">
                Mã đơn hàng
              </div>
              <div className="font-medium text-base text-pri-1 dark:text-pri-6">
                {extractOrderIdPrefix(order.order_id)}
              </div>
            </div>
            <StatusBadge status={order.order_status} />
          </div>

          {/* Shipping Route */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 dark:border-gray-700 rounded-[32px]">
              <Truck size={16} className="dark:text-gray-300" />
              <span className="text-sm text-pri-1 dark:text-pri-6">
                Thủ Đức, Tp Hồ Chí Minh
              </span>
            </div>
            <span className="text-muted-foreground dark:text-gray-400">→</span>
            <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 dark:border-gray-700 rounded-[32px]">
              <MapPin size={16} className="dark:text-gray-300" />
              <span className="text-sm text-pri-1 dark:text-pri-6">
                {order.order_buyer.address.district},{" "}
                {order.order_buyer.address.province}
              </span>
            </div>
          </div>

          {/* Order Details Cards */}
          <div className="w-full mx-auto space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <Card className="col-span-2 p-4 bg-light-gray dark:bg-gray-800 rounded-[8px]">
                <div className="flex flex-col gap-1 h-full justify-between">
                  <div className="h-10 w-10 rounded-full bg-background dark:bg-gray-700 flex items-center justify-center">
                    <Truck className="h-5 w-5 dark:text-gray-300" />
                  </div>
                  <p className="text-base dark:text-white">
                    Cậu đợi 1 lát nhé, shop sẽ xác nhận ngay thôi !
                  </p>
                  <OrderActions
                    order={order}
                    onRepurchase={onRepurchase}
                    onCancel={onCancel}
                    onReview={onReview}
                  />
                </div>
              </Card>

              <Card className="col-span-1 p-4 bg-light-gray dark:bg-gray-800 rounded-[8px]">
                <div className="flex flex-col gap-4 h-full justify-between">
                  <div className="h-10 w-10 rounded-full bg-background dark:bg-gray-700 flex items-center justify-center">
                    <Clock className="h-5 w-5 dark:text-gray-300" />
                  </div>
                  <div>
                    <div className="text-base text-neutral-400 dark:text-gray-400">
                      Giao hàng dự kiến
                    </div>
                    <div className="font-medium text-base text-pri-1 dark:text-pri-6">
                      28/09/25
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="col-span-1 p-6 bg-light-gray dark:bg-gray-800 rounded-[8px]">
                <div className="flex flex-col gap-4 h-full justify-between">
                  <div className="h-10 w-10 rounded-full bg-background dark:bg-gray-700 flex items-center justify-center">
                    <Timer className="h-5 w-5 dark:text-gray-300" />
                  </div>
                  <div>
                    <div className="text-base text-neutral-400 dark:text-gray-400">
                      Giao hàng trong:
                    </div>
                    <div className="font-medium text-base text-pri-1 dark:text-pri-6">
                      5 ngày
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 rounded-[8px] h-[160px] dark:bg-gray-800 dark:border-gray-700">
                <div className="pb-2 text-neutral-500 dark:text-gray-400 text-base">
                  Chi tiết
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-base text-neutral-400 dark:text-gray-400">
                      Ngày đặt:
                    </span>
                    <span className="font-medium text-base text-pri-1 dark:text-white">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <span className="text-base text-neutral-400 dark:text-gray-400">
                      Phương thức thanh toán: {""}
                    </span>
                    <span className="font-medium text-base text-pri-1 dark:text-white">
                      Thanh toán khi nhận hàng
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 rounded-[8px] h-[160px] relative dark:bg-gray-800 dark:border-gray-700">
                <div className="pb-2 text-neutral-500 dark:text-gray-400 text-base">
                  Địa chỉ nhận hàng
                </div>
                <div className="space-y-2 text-sm overflow-hidden">
                  <div className="flex">
                    <span className="text-base text-neutral-400 dark:text-gray-400 min-w-[100px]">
                      Họ tên:
                    </span>
                    <span className="font-medium text-base text-pri-1 dark:text-white">
                      {order.order_buyer.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-base text-neutral-400 dark:text-gray-400 min-w-[100px]">
                      Điện thoại:
                    </span>
                    <span className="font-medium text-base text-pri-1 dark:text-white">
                      {order.order_buyer.phone_number}
                    </span>
                  </div>
                  <div className="relative group">
                    <span className="text-base text-neutral-400 dark:text-gray-400 min-w-[100px]">
                      Địa chỉ: {""}
                    </span>
                    <span className="font-medium text-base text-pri-1 dark:text-white">
                      {`${order.order_buyer.address.street}, ${order.order_buyer.address.ward}, ${order.order_buyer.address.district}, ${order.order_buyer.address.province}`}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Products Section */}
          <div className="text-xl text-pri-1 dark:text-pri-6 py-3 font-medium">
            Sản phẩm
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {order.order_products.map((product) => (
              <OrderProductItem
                key={`${product.product_id}-${product.variant_id}`}
                product={{
                  ...product,
                  variant_img: product.variant_img || product.product_img,
                }}
              />
            ))}

            {/* Total Section */}
            <div className="mt-4 pt-4 border-t dark:border-gray-700 flex flex-col gap-2 items-end">
              <div className="text-sm">
                <span className="text-neutral-500 dark:text-gray-400 text-base">
                  Tổng tiền hàng:{" "}
                </span>
                <span className="font-medium text-base dark:text-white">
                  {order.final_cost != null
                    ? `₫${(order.final_cost - order.shipping_cost).toLocaleString("vi-VN")}`
                    : "Không có giá trị"}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-neutral-500 dark:text-gray-400 text-base">
                  Phí vận chuyển:{" "}
                </span>
                <span className="font-medium text-base dark:text-white">
                  ₫{order.shipping_cost.toLocaleString("vi-VN")}
                </span>
              </div>
              {/* coupon  */}
              <div className="text-sm">
                <span className="text-neutral-500 dark:text-gray-400 text-base">
                  Giảm giá phí vận chuyển:{" "}
                </span>
                <span className="font-medium text-base dark:text-white">
                  {" "}
                  -0đ
                </span>
              </div>
              <div className="text-sm">
                <span className="text-neutral-500 dark:text-gray-400 text-base">
                  Voucher từ CatCorner:{" "}
                </span>
                <span className="font-medium text-base dark:text-white">
                  {" "}
                  -0đ
                </span>
              </div>
              <div className="text-base mt-1">
                <span className="font-medium dark:text-gray-300">
                  Thành tiền:{" "}
                </span>
                <span className="text-lg font-semibold text-pri-7 dark:text-pri-6">
                  ₫{order.final_cost.toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
