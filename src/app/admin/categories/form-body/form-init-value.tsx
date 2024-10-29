// import libs
import { z } from "zod";

// import data
import { ERROR_DATA } from "@/data/error";

const getFormSchema = () => {
  return z.object({
    category_name: z.string().min(1, { message: ERROR_DATA["required"] }),
    category_img: z.string().min(1, { message: ERROR_DATA["required"] }),
    category_products_count: z.number().optional().nullable(),
  });
};

const getFormDefaultValues = (data: any) => {
  return {
    category_name: data.category_name || "",
    category_img: data.category_img || "",
    category_products_count: data.category_products_count || 0,
  };
};

export { getFormSchema, getFormDefaultValues };
