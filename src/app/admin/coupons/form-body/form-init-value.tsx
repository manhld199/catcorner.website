// import libs
import { z } from "zod";

// import data
import { ERROR_DATA } from "@/data/error";

const getFormSchema = () => {
  return z.object({
    coupon_name: z.string().min(1, { message: ERROR_DATA["required"] }),
    coupon_description: z.string().min(1, { message: ERROR_DATA["required"] }),
    coupon_type: z
      .enum(["Free Ship", "Order"])
      .refine((v) => v.length, { message: ERROR_DATA["required"] }),
    coupon_condition: z
      .number({
        required_error: ERROR_DATA["required"],
        invalid_type_error: ERROR_DATA["invalid-type-number"],
      })
      .nullable(),
    coupon_unit: z
      .enum(["%", "đ"])
      .refine((v) => v.length, { message: ERROR_DATA["required"] }),
    coupon_value: z
      .number({
        required_error: ERROR_DATA["required"],
        invalid_type_error: ERROR_DATA["invalid-type-number"],
      })
      .nullable(),
    coupon_max_value: z.number({
      invalid_type_error: ERROR_DATA["invalid-type-number"],
    }),
    coupon_stock_quantity: z.number({
      required_error: ERROR_DATA["required"],
      invalid_type_error: ERROR_DATA["invalid-type-number"],
    }),
    start_time: z
      .string()
      .min(1, { message: ERROR_DATA["required"] })
      .nullable(),
    end_time: z.string().min(1, { message: ERROR_DATA["required"] }).nullable(),
    is_all: z
      .boolean({ invalid_type_error: ERROR_DATA["invalid-type-number"] })
      .optional(),
  });
};

const getFormDefaultValues = (data: any) => {
  console.log("data", data);
  return {
    coupon_name: data.coupon_name ?? "",
    coupon_description: data.coupon_description ?? "",
    coupon_type: data.coupon_type ?? "Order",
    coupon_condition: data.coupon_condition ?? undefined,
    coupon_unit: data.coupon_unit ?? "đ",
    coupon_value: data.coupon_value ?? undefined,
    coupon_max_value: data.coupon_max_value ?? undefined,
    coupon_stock_quantity: data.coupon_stock_quantity ?? undefined,
    start_time: data.start_time ?? null,
    end_time: data.end_time ?? null,
    is_all:
      typeof data.coupon_condition == "number" && data.coupon_condition == 0,
  };
};

export { getFormSchema, getFormDefaultValues };
