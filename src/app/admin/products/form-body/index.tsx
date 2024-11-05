"use client";

// import libs
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormDefaultValues, getFormSchema } from "./form-init-value";
import { Cpu, PawPrint, Plus, Trash2 } from "lucide-react";
import {
  removeImgsFromCloudinary,
  removeImgsInDesFromCloudinary,
  uploadFilesToCloudinary,
  uploadImgsInDesToCloudinary,
} from "@/libs/cloudinary";

// import components
import { Form, FormLabel, FormMessage } from "@/components/ui/form";
import { AdminCustomField, AdminCustomSection } from "@/components";
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
import { Spinner } from "@/components/ui-expansions/spinner";
import { Button } from "@/components/ui/button";
import ProductVariantGroup from "./product-variant-group";

// import data
import { PAGE_DATA } from "@/data/admin";
import { PLACEHOLDER_DATA } from "@/data/placeholder";
import { ERROR_DATA } from "@/data/error";
import { DIALOG_DATA } from "@/data/dialog";

// import utils
import { PRODUCTS_UPLOAD_FOLDER_NAME } from "@/utils/constants/variables";
import { handleAdd, handleUpdate } from "@/utils/functions/client";
import {
  ADMIN_PRODUCTS,
  PUBLIC_ADMIN_PRODUCTS_URL,
} from "@/utils/constants/urls";
import {
  convertBlobUrlsToImgFiles,
  getStrOfObj,
} from "@/utils/functions/convert";

// for handle array
const handleAddVariant = (form: any) => {
  const item = form.getValues(`product_variants` as any);
  form.setValue(`product_variants` as any, [
    ...item,
    {
      variant_name: "",
      variant_img: "",
      variant_price: undefined,
      variant_stock_quantity: undefined,
      variant_discount_percent: undefined,
    },
  ]);
};

const handleRemoveVariant = (form: any, itemIndex: number) => {
  const item = form.getValues(`product_variants` as any);
  form.setValue(
    `product_variants` as any,
    item.filter((_: any, i: number) => i !== itemIndex)
  );
};

const handleAddSpecification = (form: any) => {
  const item = form.getValues(`product_specifications` as any);
  form.setValue(`product_specifications` as any, [
    ...item,
    {
      name: "",
      value: "",
    },
  ]);
};

const handleRemoveSpecification = (form: any, itemIndex: number) => {
  const item = form.getValues(`product_specifications` as any);
  form.setValue(
    `product_specifications` as any,
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

const FormBody = ({
  data,
  categoriesData,
  id,
}: {
  data: any;
  categoriesData: any;
  id?: string;
}) => {
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
    let uploadedVariantImgs = [];

    try {
      setSubmitDialogContent(DIALOG_DATA["imgs-deleting"]);

      // delete deleted imgs
      if (deletedImgs.length > 0) removeImgsFromCloudinary(deletedImgs);
      if (deletedVariantImgs.length > 0)
        removeImgsFromCloudinary(deletedVariantImgs);
      await removeImgsInDesFromCloudinary(
        defaultValuesRef.current.product_description,
        values.product_description
      );

      setSubmitDialogContent(DIALOG_DATA["imgs-uploading"]);

      // upload product imgs
      const imgFiles = await convertBlobUrlsToImgFiles(
        values.product_imgs,
        "product"
      );
      const imgUrls = await uploadFilesToCloudinary(
        imgFiles,
        PRODUCTS_UPLOAD_FOLDER_NAME
      );
      values.product_imgs = [
        ...values.product_imgs.filter((url) => !url.startsWith("blob")),
        ...imgUrls,
      ];

      // upload imgs in description
      const newDes = await uploadImgsInDesToCloudinary(
        values.product_description,
        PRODUCTS_UPLOAD_FOLDER_NAME
      );
      values.product_description = newDes;

      // upload imgs in variants
      for (const [index, variant] of values.product_variants.entries()) {
        if (variant.variant_img.startsWith("blob")) {
          const variantImgFile = await convertBlobUrlsToImgFiles(
            [variant.variant_img],
            `variant_${index}`
          );
          const variantUrl = await uploadFilesToCloudinary(
            variantImgFile,
            PRODUCTS_UPLOAD_FOLDER_NAME
          );
          variant.variant_img = variantUrl[0];
          uploadedVariantImgs.push(variantUrl[0]);
        }
      }

      setSubmitDialogContent(DIALOG_DATA["product-posting"]);

      // post product
      if (id == "" || !id) {
        const { isSuccess, _id, err } = await handleAdd(
          values,
          PUBLIC_ADMIN_PRODUCTS_URL
        );

        // console.log("isssssssssssssss", isSuccess);

        // remove imgs when post failed
        if (!isSuccess || err != "") {
          await removeImgsFromCloudinary(values.product_imgs);
          await removeImgsFromCloudinary(uploadedVariantImgs);
          await removeImgsInDesFromCloudinary(
            defaultValuesRef.current.product_description,
            values.product_description
          );

          setIsSubmiting(false);
          setSubmitDialogContent(DIALOG_DATA["post-failed"]);
          return;
        }

        setSubmitDialogContent(DIALOG_DATA["post-success"]);
        setIsSubmiting(false);
        setTimeout(() => {
          location.href = ADMIN_PRODUCTS;
        }, 3000);
      } else {
        const { isSuccess, err } = await handleUpdate(
          values,
          `${PUBLIC_ADMIN_PRODUCTS_URL}/${id}`
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
        await removeImgsFromCloudinary(values.product_imgs);
        await removeImgsFromCloudinary(uploadedVariantImgs);
        await removeImgsInDesFromCloudinary(
          defaultValuesRef.current.product_description,
          values.product_description
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
          {/* product info */}
          <AdminCustomSection title={PAGE_DATA["product-info"]}>
            <>
              <AdminCustomField
                form={form}
                fieldName="product_name"
                title={PAGE_DATA["product-name"]}
                required={true}
                type="text-80"
                placeholder={PLACEHOLDER_DATA["product-name"]}
              />

              <AdminCustomField
                form={form}
                fieldName="product_imgs"
                title={PAGE_DATA["product-imgs"]}
                required={true}
                type="multi-imgs"
                onDelete={setDeletedImgs}
                placeholder={PLACEHOLDER_DATA["product-imgs"]}
              />

              <AdminCustomField
                form={form}
                fieldName="category_id"
                required={true}
                type="select-dialog-single"
                title={PAGE_DATA["product-category"]}
                placeholder={PLACEHOLDER_DATA["product-category"]}
                selectData={{
                  name: PAGE_DATA["product-category"],
                  isMultiChoice: false,
                  options: categoriesData.map((item: any) => ({
                    _id: item._id,
                    img: item.category_img,
                    name: item.category_name,
                  })),
                }}
              />

              <AdminCustomField
                form={form}
                fieldName="product_short_description"
                title={PAGE_DATA["product-short-description"]}
                required={false}
                type="textarea"
                onDelete={setDeletedImgs}
                placeholder={PLACEHOLDER_DATA["product-short-description"]}
              />

              <AdminCustomField
                form={form}
                fieldName="product_description"
                title={PAGE_DATA["product-description"]}
                required={true}
                type="text-editor"
                onDelete={setDeletedImgs}
              />
            </>
          </AdminCustomSection>

          <div ref={variantGroupRef}>
            <AdminCustomSection
              title={PAGE_DATA["product-variants"]}
              required={true}>
              <>
                <Accordion
                  type="single"
                  className="w-full flex flex-col gap-2 rounded-md"
                  collapsible>
                  {form.watch("product_variants").map((item, index) => {
                    // Kiểm tra lỗi
                    const variantError =
                      form.formState.errors.product_variants?.[index];
                    // console.log(
                    //   "variantErrorsvariantErrorsvariantErrors",
                    //   form.formState.errors,
                    //   variantError,
                    //   typeof variantError
                    // );

                    return (
                      <AccordionItem
                        key={`variant ${index}`}
                        value={`variant ${index}`}
                        className="relative bg-pri-2/20 dark:bg-zinc-950 rounded-md">
                        <AccordionTrigger
                          className={`rounded-md ${
                            variantError ? "!bg-red-500" : ""
                          }`}>
                          <div
                            className={`w-full flex flex-row justify-between items-center cursor-pointer ${
                              variantError ? "!bg-red-500" : ""
                            }`}>
                            <div className="flex flex-row items-center gap-3">
                              <PawPrint />
                              <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                                {form.watch(
                                  `product_variants.${index}.variant_name`
                                ) != ""
                                  ? form.watch(
                                      `product_variants.${index}.variant_name`
                                    )
                                  : `${PAGE_DATA["product-variant"]} ${
                                      index + 1
                                    }`}
                              </FormLabel>
                            </div>

                            <Button
                              type="button"
                              variant="none"
                              className="hover:bg-red-500 hover:text-white"
                              onClick={() => handleRemoveVariant(form, index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="mt-2">
                          <ProductVariantGroup
                            form={form}
                            index={0}
                            setDeletedImgs={setDeletedVariantImgs}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                {form.watch("product_variants").length == 0 && (
                  <FormMessage>{ERROR_DATA["required"]}</FormMessage>
                )}

                <Button
                  type="button"
                  variant="none"
                  className="px-0 flex flex-row gap-1 items-center font-bold text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-400"
                  onClick={() => handleAddVariant(form)}>
                  <Plus className="h-5 w-5" /> {PAGE_DATA["variant-add"]}
                </Button>
              </>
            </AdminCustomSection>
          </div>

          <AdminCustomSection title={PAGE_DATA["product-specifications"]}>
            <>
              <Accordion
                type="single"
                className="w-full flex flex-col gap-2 rounded-md dark:bg-zinc-900"
                collapsible>
                {(form.watch("product_specifications") ?? []).map(
                  (item, index) => (
                    <AccordionItem
                      key={`product specification ${index}`}
                      value={`product specification ${index}`}
                      className="relative bg-zinc-100 dark:bg-zinc-950 rounded-md">
                      <AccordionTrigger className="rounded-md">
                        <div
                          className={`w-full flex flex-row justify-between items-center cursor-pointer`}>
                          <div className="flex flex-row items-center gap-3">
                            <Cpu />
                            <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                              {form.watch(
                                `product_specifications.${index}.name`
                              ) != ""
                                ? form.watch(
                                    `product_specifications.${index}.name`
                                  )
                                : `${PAGE_DATA["product-specification"]} ${
                                    index + 1
                                  }`}
                            </FormLabel>
                          </div>

                          <Button
                            type="button"
                            variant="none"
                            className="hover:bg-red-500 hover:text-white"
                            onClick={() =>
                              handleRemoveSpecification(form, index)
                            }>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="mt-2 flex flex-col gap-2">
                        <AdminCustomField
                          form={form}
                          fieldName={`product_specifications.${index}.name`}
                          title={PAGE_DATA["specification-name"]}
                          required={false}
                          type="text-80"
                          placeholder={PLACEHOLDER_DATA["specification-name"]}
                          className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
                        />

                        <AdminCustomField
                          form={form}
                          fieldName={`product_specifications.${index}.value`}
                          title={PAGE_DATA["specification-value"]}
                          required={false}
                          type="text-80"
                          placeholder={PLACEHOLDER_DATA["specification-value"]}
                          className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>

              <Button
                type="button"
                variant="none"
                className="px-0 flex flex-row gap-1 items-center font-bold text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-400"
                onClick={() => handleAddSpecification(form)}>
                <Plus className="h-5 w-5" /> {PAGE_DATA["specification-add"]}
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
