"use client";

// import libs
import { useState } from "react";
import { Check, X } from "lucide-react";

// import types
import { ICoupon } from "@/types/interfaces";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";
import { formatDateTimeStr } from "@/utils/functions/format";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function CardCoupon({
  coupon,
  type,
  userId,
  handleSaveCoupon,
}: {
  coupon: ICoupon;
  type: "freeship" | "order";
  userId?: string;
  handleSaveCoupon?: (userId: string, couponId: string) => Promise<boolean>;
}) {
  const router = useRouter();

  const [saveState, setSaveState] = useState<
    "not saved" | "saving" | "saved" | "failed"
  >(coupon.isOwned == true ? "saved" : "not saved");

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
              {coupon.coupon_unit == "%" ? (
                <>
                  <span className="text-2xl">SALE</span>
                  <br />
                  <span className="text-xl">{coupon.coupon_value}% OFF</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">SUPER</span>
                  <br />
                  <span className="text-2xl">SALE</span>
                </>
              )}
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
            Giảm tối đa {convertNumberToVND(coupon.coupon_max_value)}
          </h6>
          <p className="text-sm">
            Đơn tối thiểu {convertNumberToVND(coupon.coupon_condition)}
          </p>
        </div>

        <div className="flex flex-row justify-between items-end">
          <p className="text-sm text-gray-600 italic">
            Có hiệu lực đến {formatDateTimeStr(coupon.end_time, "dd/mm/yy")}
          </p>

          {handleSaveCoupon && (
            <button
              className={`py-1 px-6 rounded-lg ${type == "freeship" ? "bg-pri-7" : "bg-orange-500"} text-sm text-white enabled:hover:shadow-md disabled:cursor-not-allowed`}
              onClick={async () => {
                if (!userId || userId == "") router.push("/login");

                setSaveState("saving");
                const isSuccess = await handleSaveCoupon(
                  userId,
                  coupon.coupon_id_hashed
                );
                if (isSuccess) setSaveState("saved");
                else setSaveState("failed");
              }}
              disabled={saveState == "saved"}>
              {saveState == "not saved" ? (
                "Lưu"
              ) : saveState == "saving" ? (
                <BeatLoader color="white" size={6} />
              ) : saveState == "failed" ? (
                <X />
              ) : (
                <Check />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
