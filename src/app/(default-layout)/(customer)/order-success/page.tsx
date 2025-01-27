import OrderDetails from "@/components/(order)/order-details";
import { Button } from "@/components/ui/button";
import { ORDER_URL } from "@/utils/constants/urls";
import Link from "next/link";
import React from "react";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { orderId } = searchParams;

  const res = await fetch(`${ORDER_URL}/getOrder/${orderId}`);
  const data = await res.json();
  const order = data.data.order;

  return (
    <div className="w-full h-fit">
      <OrderDetails
        order={order}
        title="Cảm ơn bạn đã đặt hàng!"
        description="CatCorner đã tiếp nhận đơn hàng và sẽ nhanh chóng gửi sản phẩm đến cậu, chờ chúng mình ít lâu nhé!"
      />
      <div className="w-full flex justify-end gap-2">
        <Button variant="filled_outlined">
          <Link href="/order-history">Xem đơn hàng của tôi</Link>
        </Button>
        <Button variant="filled">
          <Link href="/">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    </div>
  );
}
