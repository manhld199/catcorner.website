import { CardCoupon } from "@/components";
import Image from "next/image";
import React from "react";

export default function CouponsPage() {
  return (
    <div className="bg-white flex flex-col">
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

      <div className="w-full phone_large:p-4 tablet:p-6 bg-pri-3 flex flex-col phone_large:gap-4 tablet:gap-8 gap-8 justify-center items-center">
        <h2 className="text-pri-6 tablet:block phone_large:hidden">
          SIÊU ƯU ĐÃI MIỄN PHÍ VẬN CHUYỂN
        </h2>
        <h2 className="text-pri-6 tablet:hidden phone_large:block">
          MIỄN PHÍ VẬN CHUYỂN
        </h2>
        <div
          className="desktop:w-2/3 laptop:4/5 mx-auto my-2 grid phone_large:grid-cols-1 tablet:grid-cols-2 phone_large:gap-2 tablet:gap-8"
          id="catcorner">
          <CardCoupon type="freeship" />
          <CardCoupon type="freeship" />
          <CardCoupon type="freeship" />
          <CardCoupon type="freeship" />
          <CardCoupon type="freeship" />
          <CardCoupon type="freeship" />
        </div>
      </div>

      <div className="w-full phone_large:p-4 tablet:p-6 bg-pri-5 flex flex-col phone_large:gap-2 tablet:gap-8 justify-center items-center">
        <h2 className="text-orange-400 tablet:block phone_large:hidden">
          SIÊU ƯU ĐÃI GIẢM GIÁ CỰC SỐC
        </h2>
        <h2 className="text-orange-400 tablet:hidden phone_large:block">
          GIẢM GIÁ CỰC SỐC
        </h2>
        <div
          className="desktop:w-2/3 laptop:4/5  mx-auto my-2 grid phone_large:grid-cols-1 tablet:grid-cols-2 phone_large:gap-4 tablet:gap-8"
          id="order">
          <CardCoupon type="order" />
          <CardCoupon type="order" />
          <CardCoupon type="order" />
          <CardCoupon type="order" />
          <CardCoupon type="order" />
          <CardCoupon type="order" />
        </div>
      </div>
    </div>
  );
}
