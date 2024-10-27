import { AdminCustomField } from "@/components";
import { PAGE_DATA } from "@/data/admin";
import { PLACEHOLDER_DATA } from "@/data/placeholder";

const ProductVariantGroup = ({
  form,
  index,
  setDeletedImgs,
}: {
  form: any;
  index: number;
  setDeletedImgs: any;
}) => {
  return (
    <div className="grid grid-cols-[3fr_1fr] gap-2 items-start">
      <div className="flex flex-col gap-2">
        <AdminCustomField
          form={form}
          fieldName={`product_variants.${index}.variant_name`}
          title={PAGE_DATA["variant-name"]}
          required={true}
          type="text-80"
          placeholder={PLACEHOLDER_DATA["variant-name"]}
          className="bg-white dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
        />

        <AdminCustomField
          form={form}
          fieldName={`product_variants.${index}.variant_price`}
          title={PAGE_DATA["variant-price"]}
          required={true}
          type="number"
          placeholder={PLACEHOLDER_DATA["variant-price"]}
          className="bg-white dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
        />

        <AdminCustomField
          form={form}
          fieldName={`product_variants.${index}.variant_stock_quantity`}
          title={PAGE_DATA["variant-stock-quantity"]}
          required={true}
          type="number"
          placeholder={PLACEHOLDER_DATA["variant-stock-quantity"]}
          className="bg-white dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
        />

        <AdminCustomField
          form={form}
          fieldName={`product_variants.${index}.variant_discount_percent`}
          title={PAGE_DATA["variant-discount-percent"]}
          required={false}
          type="number"
          placeholder={PLACEHOLDER_DATA["variant-discount-percent"]}
          className="bg-white dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
        />
      </div>

      <AdminCustomField
        form={form}
        fieldName={`product_variants.${index}.variant_img`}
        title={undefined}
        required={true}
        type="single-img"
        onDelete={setDeletedImgs}
      />
    </div>
  );
};

export default ProductVariantGroup;
