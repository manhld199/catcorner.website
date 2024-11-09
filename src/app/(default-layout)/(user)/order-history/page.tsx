"use client";
import { MapPin, Search, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import UserSidebar from "@/partials/(user)/sidebar_nav";
import StatusBadge from "@/components/(order)/status-badge";
import OrderActions from "@/components/(order)/order-actions";

export default function HistoryOrder() {
  const handleRepurchase = (orderId: string) => {
    console.log("Repurchase order:", orderId);
    // Xử lý logic mua lại
  };

  const handleCancel = (orderId: string) => {
    console.log("Cancel order:", orderId);
    // Xử lý logic hủy đơn
  };

  const handleReview = (orderId: string) => {
    console.log("Review order:", orderId);
    // Xử lý logic đánh giá
  };
  return (
    <>
      <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
        <UserSidebar></UserSidebar>
        {/* Main Content */}
        <Card className="w-[100%]">
          <CardHeader>
            <h2 className="font-bold">Đơn hàng của tôi</h2>
          </CardHeader>
          <CardContent>
            {/* Order Status Tabs */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="grid w-full grid-cols-5 rounded-[50px] p-2 h-[50px] mb-5">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]">
                  Tất cả{" "}
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1">
                    4
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]">
                  Chờ xác nhận
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]">
                  Vận chuyển
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]">
                  Thành công
                </TabsTrigger>
                <TabsTrigger
                  value="cancelled"
                  className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]">
                  Đã hủy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {/* Search Bar */}
                <div className="flex items-center w-full mb-5">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
                      className="w-full pl-4 pr-14 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-300"
                    />
                    <button
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pri-1 dark:bg-teal-700 p-1.5 rounded-full hover:bg-teal-700 dark:hover:bg-teal-500"
                      type="submit">
                      <Search className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
                {/* Order Card */}
                <Card className="drop-shadow-[0_0_15px_rgba(0,0,0,0.05)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex gap-2 text-pri-1 text-2xl">
                        {" "}
                        <ShoppingBag size={24} /> <span>Mã đơn hàng:</span>
                        <span>CHT-913742</span>
                      </span>
                      <StatusBadge status="shipping" />
                    </div>
                    <div className="w-full mx-auto py-4">
                      <div className="flex items-center justify-between gap-14">
                        <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 rounded-[32px]">
                          <Truck size={16} />
                          <span className="text-sm text-pri-1">
                            Thủ Đức, Tp Hồ Chí Minh
                          </span>
                        </div>

                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex items-center flex-1">
                            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                            <div className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#d1d5db_2px,#d1d5db_8px)]" />
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap p-0.5 px-4 border border-neutral-200 rounded-[32px]">
                            Giao hàng dự kiến: 28/09/25
                          </div>
                          <div className="flex items-center flex-1">
                            <div className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#d1d5db_2px,#d1d5db_8px)]" />
                            <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-neutral-300"></div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-0.5 px-4 border border-neutral-200 rounded-[32px]">
                          <MapPin size={16} />
                          <span className="text-sm text-pri-1">
                            Bình Sơn, Quảng Ngãi
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-pri-1 underline font-bold pb-4">
                      <Link href="order-history/details">Xem chi tiết</Link>
                    </div>
                    {/* Product Items */}
                    <div className="space-y-4">
                      <div className="flex gap-4 border rounded-[8px] p-5 items-center">
                        <Image
                          src="/placeholder.svg"
                          alt="Cat Litter Box"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1 text-base">
                          <span className="font-medium text-pri-1">
                            Nhà vệ sinh cho mèo PAW Fat Meow Cat Litter Boxes
                            chất lượng cao hihioeejrhrkhrkrjk
                          </span>
                          <div className="mt-1">
                            <span className="text-sm text-neutral-500">X1</span>
                            <br />
                            <span className="text-pri-1">Size M</span>
                          </div>
                        </div>
                        <div className="text-right inline-flex gap-2">
                          <span className="line-through text-neutral-400">
                            ₫200.000
                          </span>
                          <div className="font-medium text-pri-1">₫189.000</div>
                        </div>
                      </div>
                      <div className="flex gap-4 border rounded-[8px] p-5 items-center">
                        <Image
                          src="/placeholder.svg"
                          alt="Cat Litter Box"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1 text-base">
                          <span className="font-medium text-pri-1">
                            Nhà vệ sinh cho mèo PAW Fat Meow Cat Litter Boxes
                            chất lượng cao hihioeejrhrkhrkrjk
                          </span>
                          <div className="mt-1">
                            <span className="text-sm text-neutral-500">X1</span>
                            <br />
                            <span className="text-pri-1">Size M</span>
                          </div>
                        </div>
                        <div className="text-right inline-flex gap-2">
                          <span className="line-through text-neutral-400">
                            ₫200.000
                          </span>
                          <div className="font-medium text-pri-1">₫189.000</div>
                        </div>
                      </div>
                    </div>

                    {/* Total */}

                    <div className="mt-1 pt-1 text-right">
                      <span className="font-medium">Thành tiền: </span>
                      <span className="text-lg font-semibold text-pri-7">
                        ₫239.000
                      </span>
                    </div>

                    <div className="flex gap-4 justify-end mt-9">
                      <OrderActions
                        status="completed"
                        orderId="CHT-913742"
                        onRepurchase={handleRepurchase}
                        onCancel={handleCancel}
                        onReview={handleReview}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
