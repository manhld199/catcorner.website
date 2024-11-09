"use client";
import { Clock, MapPin, Truck, Timer } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UserSidebar from "@/partials/(user)/sidebar_nav";
import StatusBadge from "@/components/(order)/status-badge";
import OrderActions from "@/components/(order)/order-actions";

export default function OrderDetail() {
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
    //
  };
  return (
    <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
      <UserSidebar></UserSidebar>
      {/* Main Content */}
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Chi tiết đơn hàng</h1>

        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Order ID and Status */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Mã đơn hàng</div>
                <div className="font-regular text-base text-pri-1">
                  CHT-913742
                </div>
              </div>
              <StatusBadge status="shipping" />
            </div>

            {/* Shipping Route */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={28} />
              <span>Thủ Đức, Tp Hồ Chí Minh</span>
              <span className="text-muted-foreground">→</span>
              <span>Bình Sơn, Quảng Ngãi</span>
            </div>
            {/* Order Details */}

            <div className="w-full mx-auto space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <Card className="col-span-2 p-6 bg-light-gray rounded-[8px]">
                  <div className="flex flex-col gap-4 h-full justify-between">
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                      <Truck className="h-5 w-5" />
                    </div>
                    <p className="text-sm">
                      Kiên nhẫn 1 tí nữa nào, đơn hàng sẽ đến tay cậu nhanh
                      thôi!
                    </p>
                    <OrderActions
                      status="completed"
                      orderId="CHT-913742"
                      onRepurchase={handleRepurchase}
                      onCancel={handleCancel}
                      onReview={handleReview}
                    />
                  </div>
                </Card>

                <Card className="col-span-1 p-6 bg-light-gray rounded-[8px]">
                  <div className="flex flex-col gap-4 h-full justify-between">
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Giao hàng dự kiến
                      </div>
                      <div className="font-medium">28/09/25</div>
                    </div>
                  </div>
                </Card>

                <Card className="col-span-1 p-6 bg-light-gray rounded-[8px]">
                  <div className="flex flex-col gap-4 h-full justify-between">
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                      <Timer className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Giao hàng trong:
                      </div>
                      <div className="font-medium">5 ngày</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 rounded-[8px]">
                  <div className="pb-2 text-neutral-400 text-base">
                    Chi tiết
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Ngày đặt:</span>
                      <span>28/9/2024</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">
                        Phương thức thanh toán:
                      </span>
                      <span>Thanh toán khi nhận hàng</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-[8px]">
                  <div className="pb-2 text-neutral-400 text-base">
                    Địa chỉ nhận hàng
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Họ tên: </span>
                      <span>Tuấn Ngọc</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Điện thoại:{" "}
                      </span>
                      <span>0389183498</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Địa chỉ: </span>
                      <span>
                        Cổng sau kí túc xá khu B, đại học quốc gia, Phường Linh
                        Trung, Quận Thủ Đức, Hồ Chí Minh
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            {/* Products */}
            <div className="text-base text-pri-1 py-3">Sản phẩm</div>

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
                    Nhà vệ sinh cho mèo PAW Fat Meow Cat Litter Boxes chất lượng
                    cao hihioeejrhrkhrkrjk
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
                    Nhà vệ sinh cho mèo PAW Fat Meow Cat Litter Boxes chất lượng
                    cao hihioeejrhrkhrkrjk
                  </span>
                  <div className="mt-1">
                    W<span className="text-sm text-neutral-500">X1</span>
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
              {/* Total */}

              <div className="mt-1 pt-1 text-right">
                <span className="font-medium">Thành tiền: </span>
                <span className="text-lg font-semibold text-pri-7">
                  ₫239.000
                </span>
              </div>
              <div className="flex gap-4 justify-end mt-9"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
