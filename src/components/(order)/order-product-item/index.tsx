import Image from "next/image";

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

interface OrderProductItemProps {
  product: OrderProduct;
}

const calculateDiscountedPrice = (price: number, discountPercent: number) => {
  return price * (1 - discountPercent / 100);
};

export default function OrderProductItem({ product }: OrderProductItemProps) {
  return (
    <div className="flex gap-4 border rounded-[8px] p-3 items-center h-[124px]">
      <Image
        src={product.product_img || "/placeholder.svg"}
        alt={product.product_name}
        width={96}
        height={96}
        className="rounded-[8px] object-cover border border-neutral-200"
      />
      <div className="flex-1 text-base">
        <span className="font-medium text-pri-1">{product.product_name}</span>
        <div className="mt-1">
          <span className="text-sm text-neutral-500">x{product.quantity}</span>
          <br />
          <span className="text-pri-1">{product.variant_name}</span>
        </div>
      </div>
      <div className="text-right inline-flex gap-2">
        {product.discount_percent > 0 && (
          <span className="line-through text-neutral-400">
            ₫{product.unit_price.toLocaleString("vi-VN")}
          </span>
        )}
        <div className="font-medium text-pri-1">
          ₫
          {calculateDiscountedPrice(
            product.unit_price,
            product.discount_percent
          ).toLocaleString("vi-VN")}
        </div>
      </div>
    </div>
  );
}
