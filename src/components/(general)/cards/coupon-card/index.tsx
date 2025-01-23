import { Button } from "@/components/ui/button";
import { convertNumberToVND } from "@/utils/functions/convert";
import { formatDateTimeStr } from "@/utils/functions/format";
import React from "react";

export default function CardCoupon({ type }: { type: "freeship" | "order" }) {
  return (
    <div className="w-full h-fit aspect-[16/5] flex flex-row">
      {type == "freeship" && (
        <div className="bg-[url(/imgs/coupons/coupon-freeship-header.png)] bg-cover w-[28%] h-full py-4 pl-4 pr-2 flex flex-col justify-between items-center">
          <div className="h-2/3 flex justify-center items-center">
            <h3 className="text-white text-center leading-none italic">
              FREE
              <br />
              SHIP
            </h3>
          </div>
          <p className="text-xs text-center text-white">
            Tất cả hình thức thanh toán
          </p>
        </div>
      )}
      {type == "order" && (
        <div className="bg-[url(/imgs/coupons/coupon-order-header.png)] bg-cover w-[28%] h-full py-2 pl-4 pr-2">
          <div className="h-2/3 flex justify-center items-center">
            <p className="font-bold text-white text-center leading-none italic">
              <span className="text-2xl">SALE</span>
              <br />
              <span className="text-xl">15% OFF</span>
            </p>
          </div>
          <p className="text-xs text-center text-white">
            Một số sản phẩm nhất định
          </p>
        </div>
      )}
      <div className="bg-[url(/imgs/coupons/coupon-body.png)] w-[72%] bg-cover h-full -ml-[3px] -mt-[1px] py-3 px-4 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h6 className="font-bold">
            Giảm tối đa {convertNumberToVND(1000000)}
          </h6>
          <p className="text-sm">Đơn tối thiểu {convertNumberToVND(5000000)}</p>
        </div>

        <div className="flex flex-row justify-between items-end">
          <p className="text-sm text-gray-600 italic">
            Có hiệu lực đến {formatDateTimeStr("2011-10-10T14:48:00")}
          </p>

          <button
            className={`py-1 px-6 rounded-lg ${type == "freeship" ? "bg-pri-7" : "bg-orange-500"} text-sm text-white hover:shadow-md`}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
