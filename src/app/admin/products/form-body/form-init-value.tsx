// import libs
import { z } from "zod";

// import data
import { ERROR_DATA } from "@/data/error";

const getFormSchema = () => {
  return z.object({
    product_name: z.string().min(1, { message: ERROR_DATA["required"] }),
    product_imgs: z.array(z.any()).min(1, { message: ERROR_DATA["required"] }),
    product_short_description: z.string().optional(),
    product_description: z
      .string()
      .min(1, { message: ERROR_DATA["required"] })
      .refine((value) => value != "<p></p>", { message: ERROR_DATA["required"] }),
    product_specifications: z
      .array(z.object({ name: z.string().optional(), value: z.string().optional() }))
      .optional(),
    category_id: z.string().optional(), // tam thoi
    product_variants: z
      .array(
        z.object({
          variant_name: z.string().min(1, { message: ERROR_DATA["required"] }),
          variant_img: z.string().min(1, { message: ERROR_DATA["required"] }),
          variant_price: z.number({
            required_error: ERROR_DATA["required"],
            invalid_type_error: ERROR_DATA["invalid-type-number"],
          }),
          variant_stock_quantity: z.number({
            required_error: ERROR_DATA["required"],
            invalid_type_error: ERROR_DATA["invalid-type-number"],
          }),
          variant_discount_percent: z
            .number({ invalid_type_error: ERROR_DATA["invalid-type-number"] })
            .optional(),
        })
      )
      .min(1, { message: ERROR_DATA["required"] }),
  });
};

const getFormDefaultValues = (data: any) => {
  return {
    product_name: data.product_name || "",
    product_imgs: Array.isArray(data.product_imgs) ? data.product_imgs : [],
    product_short_description: data.product_short_description || "",
    product_description: data.product_description || "",
    product_specifications: Array.isArray(data.product_specifications)
      ? data.product_specifications
      : [],
    category_id: data.category_id || "",
    product_variants: Array.isArray(data.product_variants) ? data.product_variants : [],
  };
};

export { getFormSchema, getFormDefaultValues };
