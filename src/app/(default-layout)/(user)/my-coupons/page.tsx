"use client";

// import libs
import { ChevronRight, TicketPercent } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

// import components
import { CardCoupon } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import types
import { ICoupon } from "@/types/interfaces";

// import utils
import { getData } from "@/utils/functions/client";
import { PUBLIC_CUSTOMER_COUPON_URL } from "@/utils/constants/urls";

export default function HistoryOrder() {
  const { data: session } = useSession();
  const router = useRouter();

  const [freeshipCoupons, setFreeshipCoupons] = useState<ICoupon[]>([]);
  const [orderCoupons, setOrderCoupons] = useState<ICoupon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"freeship" | "order">("freeship");
  const [limit, setLimit] = useState<"default" | "all">("default");

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      console.log(
        "1",
        `${PUBLIC_CUSTOMER_COUPON_URL}/${session ? `${session.user.id}` : "undefined"}?limit=${limit}`
      );
      const coupons: ICoupon[] = await getData(
        `${PUBLIC_CUSTOMER_COUPON_URL}/${session ? `${session.user.id}` : "undefined"}?limit=${limit}`
      );

      const freeshipCoupons = (coupons || []).filter(
        (coupon) => coupon.coupon_type == "Free Ship"
      );
      setFreeshipCoupons(freeshipCoupons);

      const orderCoupons = (coupons || []).filter(
        (coupon) => coupon.coupon_type == "Order"
      );
      setOrderCoupons(orderCoupons);
      setIsLoading(false);
    };

    fetchData();
  }, [session, limit]);

  return (
    <>
      {/* <div className="flex container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] relative z-0 dark:bg-black"> */}
      <Card className="w-[100%] dark:bg-black dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold dark:text-white">Kho ưu đãi</h2>
            <Link
              href="/coupons"
              className="relative flex flex-row gap-2 items-center py-2 px-4 bg-pri-1 text-white rounded-lg hover:shadow-lg">
              <TicketPercent className="h-4 w-4" />
              Nhận thêm ưu đãi
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="freeship"
            className="mb-6"
            onValueChange={(value: any) => setActiveTab(value)}>
            <TabsList className="grid w-fit mx-auto grid-cols-2 rounded-[50px] p-2 h-[50px] mb-5 z-0 dark:bg-gray-900">
              <TabsTrigger
                value="freeship"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                FreeShip{" "}
                {freeshipCoupons.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {freeshipCoupons.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="data-[state=active]:text-pri-1 dark:data-[state=active]:text-white data-[state=active]:font-bold text-base rounded-[50px] dark:text-gray-300">
                CatCorner{" "}
                {orderCoupons.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1 dark:bg-white dark:text-gray-900">
                    {orderCoupons.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {["freeship", "order"].map((tabValue) => (
              <TabsContent
                key={tabValue}
                value={tabValue}
                className="space-y-4 relative z-0">
                {!session?.user?.accessToken ? (
                  <div className="text-center py-4">
                    Vui lòng đăng nhập để ưu đãi
                  </div>
                ) : isLoading ? (
                  <div className="text-center py-4">
                    <BeatLoader />
                    {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pri-1 dark:border-pri-6 mx-auto"></div> */}
                    <p className="mt-2 dark:text-gray-300">Đang tải...</p>
                  </div>
                ) : (activeTab == "freeship" && freeshipCoupons.length === 0) ||
                  (activeTab == "order" && orderCoupons.length == 0) ? (
                  <div className="text-center py-4 dark:text-gray-300">
                    Không có phiếu giảm giá nào
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {activeTab == "freeship"
                      ? freeshipCoupons.map((coupon) => (
                          <CardCoupon coupon={coupon} type="freeship" />
                        ))
                      : orderCoupons.map((coupon) => (
                          <CardCoupon coupon={coupon} type="order" />
                        ))}
                  </div>
                )}
              </TabsContent>
            ))}
            {(activeTab == "freeship" && freeshipCoupons.length > 10) ||
              (activeTab == "order" && orderCoupons.length > 10 && (
                <div className="w-full flex justify-center items-center">
                  <Button
                    variant="none"
                    onClick={() => {
                      setLimit((prev) =>
                        prev == "default" ? "all" : "default"
                      );
                    }}>
                    Xem tất cả
                  </Button>
                </div>
              ))}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
