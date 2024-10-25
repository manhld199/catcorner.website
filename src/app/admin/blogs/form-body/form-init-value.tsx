// import libs
import { z } from "zod";

// import data
import { ERROR_DATA } from "@/data/error";

const getFormSchema = () => {
  return z.object({
    article_name: z.string().min(1, { message: ERROR_DATA["required"] }),
    article_avt: z.string().min(1, { message: ERROR_DATA["required"] }),
    article_short_description: z.string().optional(),
    article_author_name: z.string().min(1, { message: ERROR_DATA["required"] }),
    article_published_date: z
      .string()
      .min(1, { message: ERROR_DATA["required"] }),
    article_content: z
      .string()
      .min(1, { message: ERROR_DATA["required"] })
      .refine((value) => value != "<p></p>", {
        message: ERROR_DATA["required"],
      }),
    article_references: z
      .array(
        z.object({ title: z.string().optional(), link: z.string().optional() })
      )
      .optional(),
    article_tags: z.array(z.string()).optional(),
  });
};

const getFormDefaultValues = (data: any) => {
  return {
    article_name: data.article_name || "",
    article_avt: data.article_avt || "",
    article_short_description: data.article_short_description || "",
    article_author_name: data.article_author_name || "",
    article_published_date: data.article_published_date || "",
    article_content: data.article_content || "",
    article_tags: Array.isArray(data.article_tags) ? data.article_tags : [],
    article_references: Array.isArray(data.article_references)
      ? data.article_references
      : [],
  };
};

export { getFormSchema, getFormDefaultValues };
