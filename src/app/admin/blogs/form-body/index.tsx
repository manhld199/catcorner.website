"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { getFormDefaultValues, getFormSchema } from "./form-init-value";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  convertBlobUrlsToImgFiles,
  getStrOfObj,
} from "@/utils/functions/convert";
import { PAGE_DATA } from "@/data/admin";
import { PLACEHOLDER_DATA } from "@/data/placeholder";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AdminCustomField,
  AdminCustomSection,
  DropZoneMultiImgs,
  DropZoneSingleImg,
  EditorRichText,
} from "@/components";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link, PawPrint, Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DIALOG_DATA } from "@/data/dialog";
import { Spinner } from "@/components/ui-expansions/spinner";
import { ERROR_DATA } from "@/data/error";
import SelectDialog from "@/components/(general)/selects/dialog";
import {
  removeImgsFromCloudinary,
  removeImgsInDesFromCloudinary,
  uploadFilesToCloudinary,
  uploadImgsInDesToCloudinary,
} from "@/libs/cloudinary";
import { BLOGS_UPLOAD_FOLDER_NAME } from "@/utils/constants/variables";
import { handleAdd, handleUpdate } from "@/utils/functions/client";
import {
  ADMIN_BLOGS,
  ADMIN_PRODUCTS,
  PUBLIC_ADMIN_BLOGS_URL,
} from "@/utils/constants/urls";

// for handle array
const handleAddReference = (form: any) => {
  const item = form.getValues(`article_references` as any);
  form.setValue(`article_references` as any, [
    ...item,
    {
      title: "",
      link: "",
    },
  ]);
};

const handleRemoveReference = (form: any, itemIndex: number) => {
  const item = form.getValues(`article_references` as any);
  form.setValue(
    `article_references` as any,
    item.filter((_: any, i: number) => i !== itemIndex)
  );
};

// scroll to error func
const scrollToErr = (form: any, ref: any) => {
  // Lấy tất cả các thẻ có id chứa 'form-item-message'
  const elements = document.querySelectorAll('[id*="form-item-message"]');
  // console.log("elementsssssss", elements);

  // Kiểm tra xem có phần tử nào không
  if (elements.length > 0) {
    // Lấy phần tử đầu tiên
    const firstElement = elements[0];

    // Cuộn đến phần tử đầu tiên
    firstElement.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Cuộn tới variants nếu có lỗi
  if (Array.isArray(form.formState.errors.product_variants)) {
    // console.log("reffffffffffffff", ref);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const FormBody = ({ data, id }: { data: any; id?: string }) => {
  const formSchema = getFormSchema();
  const defaultValues = getFormDefaultValues(data);
  // console.log("datadatadata", data);
  // console.log("categoriesData", categoriesData);
  // console.log("defaultValues", defaultValues);

  // for delete imgs
  const [deletedImgs, setDeletedImgs] = useState<string[]>([]);
  const [deletedVariantImgs, setDeletedVariantImgs] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // default form value
  const defaultValuesRef = useRef(form.getValues());
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  useEffect(() => {
    const subscription = form.watch((values) => {
      const defaultValues = defaultValuesRef.current;

      const isDifferent = getStrOfObj(values) !== getStrOfObj(defaultValues);
      setIsFormChanged(isDifferent);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // for submtit
  const [openSubmit, setOpenSubmit] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [submitDialogContent, setSubmitDialogContent] = useState<string>(
    DIALOG_DATA["submit-content"]
  );
  const onSubmit = async (
    values: z.infer<typeof formSchema>
    // event: React.FormEvent<HTMLFormElement>
  ) => {
    // console.log("vaaaaaaaaaaaaaa", values);

    try {
      setSubmitDialogContent(DIALOG_DATA["imgs-deleting"]);

      // delete deleted imgs
      if (deletedImgs.length > 0) await removeImgsFromCloudinary(deletedImgs);
      await removeImgsInDesFromCloudinary(
        defaultValuesRef.current.article_content,
        values.article_content
      );

      setSubmitDialogContent(DIALOG_DATA["imgs-uploading"]);

      // upload avt
      const imgFiles = await convertBlobUrlsToImgFiles(
        [values.article_avt],
        "article"
      );
      const imgUrls = await uploadFilesToCloudinary(
        imgFiles,
        BLOGS_UPLOAD_FOLDER_NAME
      );
      values.article_avt = imgUrls[0];

      // upload imgs in description
      const newDes = await uploadImgsInDesToCloudinary(
        values.article_content,
        BLOGS_UPLOAD_FOLDER_NAME
      );
      values.article_content = newDes;

      setSubmitDialogContent(DIALOG_DATA["product-posting"]);

      // post product
      if (id == "" || !id) {
        const { isSuccess, _id, err } = await handleAdd(
          values,
          PUBLIC_ADMIN_BLOGS_URL
        );
        // console.log("isssssssssssssss", isSuccess);

        // remove imgs when post failed
        if (!isSuccess || err != "") {
          await removeImgsFromCloudinary(deletedImgs);
          await removeImgsInDesFromCloudinary(
            defaultValuesRef.current.article_content,
            values.article_content
          );

          setIsSubmiting(false);
          setSubmitDialogContent(DIALOG_DATA["post-failed"]);
          return;
        }

        setSubmitDialogContent(DIALOG_DATA["post-success"]);
        setIsSubmiting(false);
        setTimeout(() => {
          location.href = ADMIN_BLOGS;
        }, 3000);
      } else {
        const { isSuccess, err } = await handleUpdate(
          values,
          `${PUBLIC_ADMIN_BLOGS_URL}/${id}`
        );

        if (!isSuccess || err != "") {
          setIsSubmiting(false);
          setSubmitDialogContent(`${DIALOG_DATA["post-failed"]}: ${err}`);
          return;
        }

        setSubmitDialogContent(DIALOG_DATA["post-success"]);
        setIsSubmiting(false);
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (err) {
      if (id == "" || !id) {
        await removeImgsFromCloudinary(deletedImgs);
        await removeImgsInDesFromCloudinary(
          defaultValuesRef.current.article_content,
          values.article_content
        );
        return;
        // remove imgs when post failed
      }

      setIsSubmiting(false);
      console.log("errrrrrrrrrrrrr: ", err);
      setSubmitDialogContent(`${DIALOG_DATA["post-failed"]}: ${err}`);
    }
  };

  // for handle variant error
  const variantGroupRef = useRef(null);
  // console.log("variantGroupRef", variantGroupRef);

  // console.log("fffffffffffff", form.watch("category_id"));

  return (
    <Form {...form}>
      <form className="w-full  md:max-w-screen-md space-y-2">
        <div className="w-full relative grid grid-cols-1 gap-2 mx-auto">
          {/* blog info */}
          <AdminCustomSection title={PAGE_DATA["blog-info"]}>
            <>
              <AdminCustomField
                form={form}
                fieldName="article_name"
                title={PAGE_DATA["blog-name"]}
                required={true}
                type="text-80"
                placeholder={PLACEHOLDER_DATA["blog-name"]}
              />

              <AdminCustomField
                form={form}
                fieldName="article_author_name"
                title={PAGE_DATA["blog-author-name"]}
                required={true}
                type="text-80"
                placeholder={PLACEHOLDER_DATA["blog-author-name"]}
              />

              <AdminCustomField
                form={form}
                fieldName="article_published_date"
                title={PAGE_DATA["blog-published-date"]}
                required={true}
                type="date"
                placeholder={PLACEHOLDER_DATA["blog-published-date"]}
              />

              <AdminCustomField
                form={form}
                fieldName="article_avt"
                title={undefined}
                required={true}
                type="single-img"
                onDelete={setDeletedImgs}
              />

              <AdminCustomField
                form={form}
                fieldName="article_short_description"
                title={PAGE_DATA["blog-short-description"]}
                required={false}
                type="textarea"
                onDelete={setDeletedImgs}
                placeholder={PLACEHOLDER_DATA["blog-short-description"]}
              />

              <AdminCustomField
                form={form}
                fieldName="article_tags"
                title={PAGE_DATA["blog-tags"]}
                required={false}
                type="tags"
              />
            </>
          </AdminCustomSection>

          <AdminCustomSection title={PAGE_DATA["blog-content"]}>
            <AdminCustomField
              form={form}
              fieldName="article_content"
              title={PAGE_DATA["blog-content"]}
              required={true}
              type="text-editor"
              onDelete={setDeletedImgs}
            />
          </AdminCustomSection>

          <AdminCustomSection title={PAGE_DATA["blog-references"]}>
            <>
              <Accordion
                type="single"
                className="w-full flex flex-col gap-2 rounded-md dark:bg-zinc-900"
                collapsible>
                {(form.watch("article_references") ?? []).map((item, index) => (
                  <AccordionItem
                    key={`blog reference ${index}`}
                    value={`blog reference ${index}`}
                    className="relative bg-zinc-100 dark:bg-zinc-950 rounded-md">
                    <AccordionTrigger className="rounded-md">
                      <div
                        className={`w-full flex flex-row justify-between items-center cursor-pointer`}>
                        <div className="flex flex-row items-center gap-3">
                          <Link />
                          <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                            {form.watch(`article_references.${index}.title`) !=
                            ""
                              ? form.watch(`article_references.${index}.title`)
                              : `${PAGE_DATA["blog-reference"]} ${index + 1}`}
                          </FormLabel>
                        </div>

                        <Button
                          type="button"
                          variant="none"
                          className="hover:bg-red-500 hover:text-white"
                          onClick={() => handleRemoveReference(form, index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="mt-2 flex flex-col gap-2">
                      <AdminCustomField
                        form={form}
                        fieldName={`article_references.${index}.title`}
                        title={PAGE_DATA["reference-title"]}
                        required={false}
                        type="text-80"
                        placeholder={PLACEHOLDER_DATA["reference-title"]}
                        className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
                      />

                      <AdminCustomField
                        form={form}
                        fieldName={`article_references.${index}.link`}
                        title={PAGE_DATA["reference-link"]}
                        required={false}
                        type="text-80"
                        placeholder={PLACEHOLDER_DATA["reference-link"]}
                        className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button
                type="button"
                variant="none"
                className="px-0 flex flex-row gap-1 items-center font-bold text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-400"
                onClick={() => handleAddReference(form)}>
                <Plus className="h-5 w-5" /> {PAGE_DATA["reference-add"]}
              </Button>
            </>
          </AdminCustomSection>

          <Dialog open={openSubmit}>
            <DialogTrigger className="z-50 sticky bottom-0 left-0 px-4 py-2 bg-bg-1 dark:bg-zinc-800">
              <Button
                type="button"
                variant="default"
                className={`${id ? "w-fit" : "w-full"}`}
                disabled={!isFormChanged}
                onClick={async () => {
                  const isValid = await form.trigger(); // Kích hoạt validate toàn bộ form
                  // console.log("isValidisValid", isValid);
                  if (isValid) {
                    setOpenSubmit(true); // Chỉ mở dialog nếu form không có lỗi
                  } else {
                    // console.log("Form có lỗi, không mở dialog.", form.formState.errors);
                    scrollToErr(form, variantGroupRef);
                  }
                }}>
                <span className="px-2">{DIALOG_DATA["save-btn"]}</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {id == "" || !id
                    ? DIALOG_DATA["add-product"]
                    : DIALOG_DATA["update-product"]}
                </DialogTitle>

                {isSubmiting ? (
                  <>
                    <DialogDescription>{submitDialogContent}</DialogDescription>
                    <Spinner />
                  </>
                ) : (
                  <DialogDescription>{submitDialogContent}</DialogDescription>
                )}
              </DialogHeader>

              <DialogFooter className="flex flex-row !justify-between">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => {
                      setOpenSubmit(false);
                      setIsSubmiting(false);
                    }}>
                    {DIALOG_DATA["close-btn"]}
                  </Button>
                </DialogClose>

                {!isSubmiting && (
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => {
                        setIsSubmiting(true);
                        onSubmit(form.getValues());
                      }}>
                      {DIALOG_DATA["agree-btn"]}
                    </Button>
                  </DialogClose>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
};

export default FormBody;
