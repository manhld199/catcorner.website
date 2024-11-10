// import libs
import { z } from "zod";

// import data
import { ERROR_DATA } from "@/data/error";

const getFormSchema = () => {
  return z.object({
    group_name: z.string().min(1, { message: ERROR_DATA["required"] }),
    group_type: z
      .enum(["Product", "User", ""])
      .refine((v) => v.length, { message: ERROR_DATA["required"] }),
    group_items: z
      .array(z.string())
      .min(1, { message: ERROR_DATA["required"] }),
  });
};

const getFormDefaultValues = (data: any) => {
  return {
    group_name: data.group_name ?? "",
    group_type: data.group_type ?? "",
    group_items: Array.isArray(data.group_items) ? data.group_items : [],
  };
};

export { getFormSchema, getFormDefaultValues };
