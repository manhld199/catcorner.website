"use client";

// import libs
import Image from "next/image";

// import components
import { CardCoupon } from "@/components";

// improt utils
import { PUBLIC_CUSTOMER_COUPON_URL } from "@/utils/constants/urls";
import { getData, postData } from "@/utils/functions/client";

// import types
import { ICoupon } from "@/types/interfaces";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const handleSaveCoupon = async (
  userId: string,
  couponId: string
): Promise<boolean> => {
  try {
    const res = await postData(`${PUBLIC_CUSTOMER_COUPON_URL}/${userId}`, {
      coupon_id_hashed: couponId,
    });

    if (!res) return false;
    return true;
  } catch (err) {
    console.log("Error in saving coupon: ", err);
    return false;
  }
};

export default function CouponsPage() {
  const { data: session } = useSession();

  const [freeshipCoupons, setFreeshipCoupons] = useState<ICoupon[]>([]);
  const [orderCoupons, setOrderCoupons] = useState<ICoupon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const coupons: ICoupon[] = await getData(
        `${PUBLIC_CUSTOMER_COUPON_URL}${session ? `?userId=${session.user.id}` : ""}`
      );

      const freeshipCoupons = (coupons || []).filter(
        (coupon) => coupon.coupon_type == "Free Ship"
      );
      setFreeshipCoupons(freeshipCoupons);

      const orderCoupons = (coupons || []).filter(
        (coupon) => coupon.coupon_type == "Order"
      );
      setOrderCoupons(orderCoupons);
    };

    fetchData();
  }, [session]);

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[5/2]">
        <Image
          src={"/imgs/coupons/banner.png"}
          alt={"Săn siêu voucher, siêu ưu đãi"}
          fill={true}
          className="object-cover"
        />
      </div>

      <div className="phone_large:p-4 tablet:p-6 flex flex-row gap-4 justify-center items-center">
        <a
          className="relative desktop:w-[150px] laptop:w-[120px] tablet:w-[100px] phone_large:w-[80px] aspect-[3/5]"
          href="#freeship">
          <Image
            src={"/imgs/coupons/voucher-freeship.png"}
            alt={"Săn siêu voucher, siêu ưu đãi miễn phí vận chuyển"}
            fill={true}
          />
        </a>

        <a
          className="relative desktop:w-[150px] laptop:w-[120px] tablet:w-[100px] phone_large:w-[80px] aspect-[3/5]"
          href="#catcorner">
          <Image
            src={"/imgs/coupons/voucher-catcorner.png"}
            alt={"Săn siêu voucher, siêu ưu đãi giảm giá đơn hàng"}
            fill={true}
          />
        </a>
      </div>

      <div className="w-full phone_large:p-4 tablet:p-6 bg-pri-3 dark:bg-emerald-200 flex flex-col phone_large:gap-4 tablet:gap-8 gap-8 justify-center items-center">
        <h2 className="text-pri-6 tablet:block phone_large:hidden">
          SIÊU ƯU ĐÃI MIỄN PHÍ VẬN CHUYỂN
        </h2>
        <h2 className="text-pri-6 tablet:hidden phone_large:block">
          MIỄN PHÍ VẬN CHUYỂN
        </h2>
        {freeshipCoupons.length > 0 && (
          <div
            className="desktop:w-2/3 laptop:4/5 mx-auto my-2 grid phone_large:grid-cols-1 tablet:grid-cols-2 phone_large:gap-2 tablet:gap-8"
            id="catcorner">
            {freeshipCoupons.map((coupon, index) => (
              <CardCoupon
                key={`coupon ${index}`}
                coupon={coupon}
                userId={session ? session.user.id : ""}
                handleSaveCoupon={handleSaveCoupon}
                type="freeship"
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full phone_large:p-4 tablet:p-6 bg-pri-5 dark:bg-orange-200 flex flex-col phone_large:gap-2 tablet:gap-8 justify-center items-center">
        <h2 className="text-orange-400 dark:text-orange-600 tablet:block phone_large:hidden">
          SIÊU ƯU ĐÃI GIẢM GIÁ CỰC SỐC
        </h2>
        <h2 className="text-orange-400 tablet:hidden phone_large:block">
          GIẢM GIÁ CỰC SỐC
        </h2>
        {orderCoupons.length > 0 && (
          <div
            className="desktop:w-2/3 laptop:4/5  mx-auto my-2 grid phone_large:grid-cols-1 tablet:grid-cols-2 phone_large:gap-4 tablet:gap-8"
            id="order">
            {orderCoupons.map((coupon, index) => (
              <CardCoupon
                key={`coupon ${index}`}
                coupon={coupon}
                userId={session ? session.user.id : ""}
                handleSaveCoupon={handleSaveCoupon}
                type="order"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
