import { CldImage } from "next-cloudinary";

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
    <div className="flex items-center gap-4 p-4 border rounded-lg dark:border-gray-600">
      <div className="relative w-24 h-24">
        {product.variant_img.startsWith("SEO_Images") ? (
          <CldImage
            loading="lazy"
            src={product.variant_img}
            alt={product.variant_name}
            className="object-cover rounded-md"
            width={96}
            height={96}
            sizes="96px"
          />
        ) : (
          <img
            src={product.variant_img}
            alt={product.variant_name}
            width={96}
            height={96}
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-base dark:text-white">
          {product.product_name}
        </h3>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Phân loại: {product.variant_name}
        </p>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          x{product.quantity}
        </p>
      </div>
      <div className="text-right inline-flex gap-2">
        {product.discount_percent > 0 && (
          <span className="line-through text-neutral-400 dark:text-gray-500">
            ₫{product.unit_price.toLocaleString("vi-VN")}
          </span>
        )}
        <div className="font-medium text-pri-1 dark:text-white">
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
