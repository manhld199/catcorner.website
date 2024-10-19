"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { getFormDefaultValues, getFormSchema } from "./form-init-value";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getStrOfObj } from "@/utils/functions/convert";
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
import { DropZoneMultiImgs, DropZoneSingleImg, EditorRichText } from "@/components";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Cpu, PawPrint, Plus, Trash2 } from "lucide-react";
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

const CustomSection = ({
  title,
  children,
  required = false,
}: {
  title: string;
  children: ReactNode;
  required?: boolean;
}) => {
  return (
    <section className="dark:border-zinc-800 h-fit mxs:p-2 md:p-4 border-[1px] rounded-2xl space-y-4 dark:bg-zinc-900">
      <div className="border-b-[1px] pb-2">
        <h4 className="w-full text-center dark:text-zinc-100 font-bold text-xl">
          {required && <span className="text-red-500">* </span>}
          {title}
        </h4>
      </div>
      {children}
    </section>
  );
};

const CustomFormField = ({
  form,
  fieldName,
  title,
  required = false,
  type,
  placeholder = "",
  onDelete,
  className = "",
}: {
  form: any;
  fieldName: string;
  title: string | undefined;
  required?: boolean;
  type: string;
  placeholder?: string;
  onDelete?: any;
  className?: string;
}) => {
  let children: ({}: any) => ReactNode;

  if (type == "text-80")
    children = ({ onChange, onBlur, value }) => (
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={80}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" + " " + className
        }
      />
    );
  else if (type == "textarea")
    children = ({ onChange, onBlur, value }) => (
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" + " " + className
        }
      />
    );
  else if (type == "number")
    children = ({ onChange, onBlur, value }) => (
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        onBlur={onBlur}
        placeholder={placeholder}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" + " " + className
        }
      />
    );
  else if (type == "multi-imgs")
    children = ({ onChange, onBlur, value }) => (
      <DropZoneMultiImgs value={value} onChange={onChange} onDelete={onDelete} />
    );
  else if (type == "single-img")
    children = ({ onChange, onBlur, value }) => (
      <DropZoneSingleImg
        value={value}
        onChange={onChange}
        onDelete={onDelete}
        required={required}
      />
    );
  else if (type == "text-editor")
    children = ({ onChange, onBlur, value }) => (
      <EditorRichText content={value} onChange={onChange} />
    );
  else children = ({ onChange, onBlur, value }) => <></>;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div
            className={`flex flex-row ${
              title ? "justify-between" : "justify-center"
            } items-end gap-4`}
          >
            {title && (
              <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                {required && <span className="text-red-500">* </span>}
                {title}
              </FormLabel>
            )}
            <FormMessage className="relative" />
          </div>
          <FormControl>{children({ ...field })}</FormControl>
        </FormItem>
      )}
    />
  );
};

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
        <CustomFormField
          form={form}
          fieldName={`product_variants.${index}.variant_name`}
          title={PAGE_DATA["variant-name"]}
          required={true}
          type="text-80"
          placeholder={PLACEHOLDER_DATA["variant-name"]}
          className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-950"
        />

        <CustomFormField
          form={form}
          fieldName={`product_variants.${index}.variant_price`}
          title={PAGE_DATA["variant-price"]}
          required={true}
          type="number"
          placeholder={PLACEHOLDER_DATA["variant-price"]}
          className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-950"
        />

        <CustomFormField
          form={form}
          fieldName={`product_variants.${index}.variant_stock_quantity`}
          title={PAGE_DATA["variant-stock-quantity"]}
          required={true}
          type="number"
          placeholder={PLACEHOLDER_DATA["variant-stock-quantity"]}
          className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-950"
        />

        <CustomFormField
          form={form}
          fieldName={`product_variants.${index}.variant_discount_percent`}
          title={PAGE_DATA["variant-discount-percent"]}
          required={false}
          type="number"
          placeholder={PLACEHOLDER_DATA["variant-discount-percent"]}
          className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-950"
        />
      </div>

      <CustomFormField
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
      name: undefined,
      value: undefined,
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

const FormBody = ({ data, id }: { data: any; id?: string }) => {
  const formSchema = getFormSchema();
  const defaultValues = getFormDefaultValues(data);
  // console.log("datadatadata", data);
  // console.log("defaultValues", defaultValues);

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
  const onSubmit = async (
    values: z.infer<typeof formSchema>
    // event: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("vaaaaaaaaaaaaaa", values);
  };

  // for delete imgs
  const [deletedImgs, setDeletedImgs] = useState<string[]>([]);
  const [deletedVariantImgs, setDeletedVariantImgs] = useState<string[]>([]);

  // for handle variant error
  const variantGroupRef = useRef(null);
  // console.log("variantGroupRef", variantGroupRef);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit space-y-2">
        <div className="relative md:max-w-screen-md grid grid-cols-1 gap-2 mx-auto">
          {/* product info */}
          <CustomSection title={PAGE_DATA["product-info"]}>
            <>
              <CustomFormField
                form={form}
                fieldName="product_name"
                title={PAGE_DATA["product-name"]}
                required={true}
                type="text-80"
                placeholder={PLACEHOLDER_DATA["product-name"]}
              />

              <CustomFormField
                form={form}
                fieldName="product_imgs"
                title={PAGE_DATA["product-imgs"]}
                required={true}
                type="multi-imgs"
                onDelete={setDeletedImgs}
                placeholder={PLACEHOLDER_DATA["product-imgs"]}
              />

              <CustomFormField
                form={form}
                fieldName="product_short_description"
                title={PAGE_DATA["product-short-description"]}
                required={false}
                type="textarea"
                onDelete={setDeletedImgs}
                placeholder={PLACEHOLDER_DATA["product-short-description"]}
              />

              <CustomFormField
                form={form}
                fieldName="product_description"
                title={PAGE_DATA["product-description"]}
                required={true}
                type="text-editor"
                onDelete={setDeletedImgs}
              />
            </>
          </CustomSection>

          <div ref={variantGroupRef}>
            <CustomSection title={PAGE_DATA["product-variants"]} required={true}>
              <>
                <Accordion
                  type="single"
                  className="w-full flex flex-col gap-2 rounded-md dark:bg-zinc-950"
                  collapsible
                >
                  {form.watch("product_variants").map((item, index) => {
                    // Kiểm tra lỗi
                    const variantError = form.formState.errors.product_variants?.[index];
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
                        className="relative bg-zinc-100 dark:bg-zinc-950"
                      >
                        <AccordionTrigger
                          className={`rounded-md ${variantError ? "!bg-red-500" : ""}`}
                        >
                          <div
                            className={`w-full flex flex-row justify-between items-center cursor-pointer ${
                              variantError ? "!bg-red-500" : ""
                            }`}
                          >
                            <div className="flex flex-row items-center gap-3">
                              <PawPrint />
                              <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                                {PAGE_DATA["product-variant"]} {index + 1}
                              </FormLabel>
                            </div>

                            <Button
                              type="button"
                              variant="default"
                              className="hover:bg-red-500 hover:text-white"
                              onClick={() => handleRemoveVariant(form, index)}
                            >
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
                  variant="default"
                  className="px-0 flex flex-row gap-1 items-center font-bold text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-400"
                  onClick={() => handleAddVariant(form)}
                >
                  <Plus className="h-5 w-5" /> {PAGE_DATA["variant-add"]}
                </Button>
              </>
            </CustomSection>
          </div>

          <CustomSection title={PAGE_DATA["product-specifications"]}>
            <>
              {(form.watch("product_specifications") ?? []).map((item, index) => (
                <div
                  key={`product specification ${index}`}
                  className="px-4 py-2 flex flex-col gap-2 dark:bg-zinc-950 rounded-md"
                >
                  <div className="w-full flex flex-row justify-between items-center cursor-pointer mb-2">
                    <div className="flex flex-row items-center gap-3">
                      <Cpu />
                      <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                        {PAGE_DATA["product-specification"]} {index + 1}
                      </FormLabel>
                    </div>

                    <Button
                      type="button"
                      variant="default"
                      className="hover:bg-red-500 hover:text-white"
                      onClick={() => handleRemoveSpecification(form, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <CustomFormField
                    form={form}
                    fieldName={`product_specifications.${index}.name`}
                    title={PAGE_DATA["specification-name"]}
                    required={false}
                    type="text-80"
                    placeholder={PLACEHOLDER_DATA["specification-name"]}
                    className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-950"
                  />

                  <CustomFormField
                    form={form}
                    fieldName={`product_specifications.${index}.value`}
                    title={PAGE_DATA["specification-value"]}
                    required={false}
                    type="text-80"
                    placeholder={PLACEHOLDER_DATA["specification-value"]}
                    className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-950"
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="default"
                className="px-0 flex flex-row gap-1 items-center font-bold text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-400"
                onClick={() => handleAddSpecification(form)}
              >
                <Plus className="h-5 w-5" /> {PAGE_DATA["specification-add"]}
              </Button>
            </>
          </CustomSection>

          <Dialog open={openSubmit}>
            <DialogTrigger className="sticky bottom-0 left-0 px-4 py-2 dark:bg-zinc-950">
              <Button
                type="submit"
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
                }}
              >
                <span className="px-2">{DIALOG_DATA["save-btn"]}</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {id == "" || !id ? DIALOG_DATA["add-product"] : DIALOG_DATA["update-product"]}
                </DialogTitle>
                {isSubmiting ? (
                  <Spinner />
                ) : (
                  <DialogDescription>{DIALOG_DATA["submit-content"]}</DialogDescription>
                )}
              </DialogHeader>

              <DialogFooter className="flex flex-row !justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="default" onClick={() => setOpenSubmit(false)}>
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
                        // onSubmit function
                      }}
                    >
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
