"use client";
import { MapPin, Search, ShoppingBag, Truck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import StatusBadge from "@/components/(order)/status-badge";
import OrderActions from "@/components/(order)/order-actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderProductItem from "@/components/(order)/order-product-item";
import { useDebounce } from "use-debounce";
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
  user_id: string;
  order_id: string;
  order_products: OrderProduct[];
  order_buyer: OrderBuyer;
  order_note: string;
  shipping_cost: number;
  final_cost: number;
  order_status: "unpaid" | "delivering" | "delivered" | "canceled";
  createdAt: string | null;
}

interface OrdersResponse {
  status: number;
  success: boolean;
  data: {
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}

// Thêm hàm tính giá sau khi giảm giá
const calculateDiscountedPrice = (price: number, discountPercent: number) => {
  return price * (1 - discountPercent / 100);
};

// Thêm hàm tính tổng tiền sản phẩm (đã bao gồm số lượng và giảm giá)
const calculateProductTotal = (product: OrderProduct) => {
  const discountedPrice = calculateDiscountedPrice(
    product.unit_price,
    product.discount_percent
  );
  return discountedPrice * product.quantity;
};

// Thêm hàm kiểm tra searchTerm có phải là Order_Id (bắt đầu bằng DH)
const isValidOrderId = (str: string) => /^DH/.test(str);

export default function HistoryOrder() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 500);
  const [orderCounts, setOrderCounts] = useState({
    all: 0,
    unpaid: 0,
    delivering: 0,
    delivered: 0,
    canceled: 0,
  });

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchOrders();
    }
  }, [session, activeTab, activeTab === "all" ? debouncedValue : null]);

  const fetchOrders = async () => {
    if (!session?.user?.accessToken) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);

      let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`;

      // Xử lý params dựa vào activeTab và searchTerm
      if (activeTab !== "all") {
        url += `?status=${activeTab}`;
      } else if (debouncedValue) {
        // Kiểm tra và gọi API phù hợp dựa vào định dạng searchTerm
        const cleanedSearch = debouncedValue.trim();
        if (isValidOrderId(cleanedSearch)) {
          url += `?order_id=${cleanedSearch}`;
        } else {
          url += `?product_name=${cleanedSearch}`;
        }
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(errorData?.message || "Failed to fetch orders");
      }
      const responseData: OrdersResponse = await response.json();
      if (!responseData.success) {
        throw new Error("Failed to fetch orders");
      }
      console.log("order data", responseData.data.orders);
      setOrders(responseData.data.orders);
      setIsLoading(false);

      const resetCounts = {
        all: 0,
        unpaid: 0,
        delivering: 0,
        delivered: 0,
        canceled: 0,
      };

      setOrderCounts({
        ...resetCounts,
        [activeTab]: responseData.data.orders.length,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Không thể tải danh sách đơn hàng"
      );
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepurchase = (orderId: string) => {
    console.log("Repurchase order:", orderId);
    // Implement repurchase logic
  };

  const handleCancel = async (orderId: string) => {
    if (!session?.user?.accessToken) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      toast.success("Hủy đơn hàng thành công");
      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Không thể hủy đơn hàng");
    }
  };

  const handleReview = (orderId: string) => {
    console.log("Review order:", orderId);
    // Implement review logic
  };

  return (
    <>
      {/* <div className="flex container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] relative z-0 dark:bg-black"> */}
      <Card className="w-[100%] dark:bg-black dark:border-gray-700">
        <CardHeader>
          <h2 className="font-bold dark:text-white">Đơn hàng của tôi</h2>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            className="mb-6"
            onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-5 rounded-[50px] p-2 h-[50px] mb-5 z-0 dark:bg-gray-900">
              <TabsTrigger
                value="all"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                Tất cả{" "}
                {activeTab === "all" && orderCounts.all > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {orderCounts.all}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="unpaid"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                Chờ xác nhận{" "}
                {activeTab === "unpaid" && orderCounts.unpaid > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {orderCounts.unpaid}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="delivering"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                Vận chuyển{" "}
                {activeTab === "delivering" && orderCounts.delivering > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {orderCounts.delivering}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="delivered"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                Thành công{" "}
                {activeTab === "delivered" && orderCounts.delivered > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {orderCounts.delivered}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="canceled"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                Đã hủy{" "}
                {activeTab === "canceled" && orderCounts.canceled > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {orderCounts.canceled}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            {activeTab === "all" && (
              <div className="flex items-center w-full mb-5">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập mã đơn hàng hoặc tên sản phẩm để tìm kiếm"
                    className="w-full pl-4 pr-14 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 rounded-full border border-neutral-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-300"
                  />
                  <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}
            {["all", "unpaid", "delivering", "delivered", "canceled"].map(
              (tabValue) => (
                <TabsContent
                  key={tabValue}
                  value={tabValue}
                  className="space-y-4 relative z-0">
                  {!session?.user?.accessToken ? (
                    <div className="text-center py-4">
                      Vui lòng đăng nhập để xem đơn hàng
                    </div>
                  ) : isLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pri-1 dark:border-pri-6 mx-auto"></div>
                      <p className="mt-2 dark:text-gray-300">Đang tải...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-4 dark:text-gray-300">
                      Không có đơn hàng nào
                    </div>
                  ) : (
                    orders.map((order) => (
                      <Card
                        key={order._id}
                        className="drop-shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:bg-black dark:border-gray-700">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="flex gap-2 text-pri-1 dark:text-pri-6 text-2xl">
                              <ShoppingBag size={24} />
                              <span>Mã đơn hàng:</span>
                              <span>
                                {extractOrderIdPrefix(order.order_id)}
                              </span>
                            </span>
                            <StatusBadge status={order.order_status} />
                          </div>
                          <div className="w-full mx-auto py-4">
                            <div className="flex items-center justify-between gap-14">
                              <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 dark:border-gray-700 rounded-[32px]">
                                <Truck
                                  size={16}
                                  className="dark:text-gray-300"
                                />
                                <span className="text-sm text-pri-1 dark:text-pri-6">
                                  Thủ Đức, Tp Hồ Chí Minh
                                </span>
                              </div>

                              <div className="flex-1 flex items-center gap-2">
                                <div className="flex items-center flex-1">
                                  <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-gray-600"></div>

                                  <div className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#d1d5db_2px,#d1d5db_8px)] dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#4b5563_2px,#4b5563_8px)]" />
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap p-0.5 px-4 border border-neutral-200 dark:border-gray-700 rounded-[32px] dark:text-gray-300">
                                  Giao hàng dự kiến: 28/09/25
                                </div>
                                <div className="flex items-center flex-1">
                                  <div className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#d1d5db_2px,#d1d5db_8px)] dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#4b5563_2px,#4b5563_8px)]" />
                                  <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-neutral-300 dark:border-gray-600"></div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 dark:border-gray-700 rounded-[32px]">
                                <MapPin
                                  size={16}
                                  className="dark:text-gray-300"
                                />
                                <span className="text-sm text-pri-1 dark:text-pri-6">
                                  {order.order_buyer.address.district},{" "}
                                  {order.order_buyer.address.province}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right text-pri-1 dark:text-white underline font-bold pb-4 hover:opacity-80 dark:hover:text-pri-6 transition-colors">
                            <Link href={`order-history/details/${order._id}`}>
                              Xem chi tiết
                            </Link>
                          </div>
                          <div className="space-y-4">
                            {order.order_products.map((product) => (
                              <OrderProductItem
                                key={`${product.product_id}-${product.variant_id}`}
                                product={{
                                  ...product,
                                  variant_img:
                                    product.variant_img || product.product_img,
                                }}
                              />
                            ))}
                          </div>

                          <div className="mt-1 pt-1 text-right">
                            <span className="font-medium dark:text-gray-300">
                              Thành tiền:{" "}
                            </span>
                            <span className="text-lg font-semibold text-pri-7 dark:text-pri-6">
                              ₫{order.final_cost.toLocaleString("vi-VN")}
                            </span>
                          </div>

                          <div className="flex gap-4 justify-end mt-9">
                            <OrderActions
                              status={order.order_status}
                              orderId={order._id}
                              onRepurchase={handleRepurchase}
                              onCancel={handleCancel}
                              onReview={handleReview}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              )
            )}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
