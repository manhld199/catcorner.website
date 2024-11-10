"use client";

// import libs
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import components
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { AdminCustomField, AdminCustomSection } from "@/components";
import { getFormDefaultValues, getFormSchema } from "./form-init-value";

// import data
import { PAGE_DATA } from "@/data/admin";
import { PLACEHOLDER_DATA } from "@/data/placeholder";
import { DIALOG_DATA } from "@/data/dialog";

// import utils
import {
  handleAdd,
  handleDelete,
  handleUpdate,
} from "@/utils/functions/client";
import {
  ADMIN_COUPONS,
  ADMIN_GROUPS,
  PUBLIC_ADMIN_COUPONS_URL,
  PUBLIC_ADMIN_GROUPS_URL,
} from "@/utils/constants/urls";
import { getStrOfObj } from "@/utils/functions/convert";

// scroll to error func
const scrollToErr = () => {
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
};

const FormBody = ({
  data,
  id,
}: {
  data: any;

  id?: string;
}) => {
  const formSchema = getFormSchema();
  const defaultValues = getFormDefaultValues(data);
  // console.log("datadatadata", data);
  // console.log("productData", productData);
  // console.log("userData", userData);
  // console.log("defaultValues", defaultValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  // console.log("group_typegroup_typegroup_type", form.watch("group_type"));

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
  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);
  const [deleteDialogContent, setDeleteDialogContent] = useState<string>(
    DIALOG_DATA["delete-content"]
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
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
      setSubmitDialogContent(DIALOG_DATA["coupon-posting"]);
      // post coupon
      if (id == "" || !id) {
        const { isSuccess, _id, err } = await handleAdd(
          values,
          PUBLIC_ADMIN_COUPONS_URL
        );

        // console.log("isssssssssssssss", isSuccess);
        if (!isSuccess || err != "") {
          setIsSubmiting(false);
          setSubmitDialogContent(DIALOG_DATA["post-failed"]);
          return;
        }

        setSubmitDialogContent(DIALOG_DATA["post-success"]);
        setIsSubmiting(false);
        setTimeout(() => {
          location.href = ADMIN_COUPONS;
        }, 3000);
      } else {
        const { isSuccess, err } = await handleUpdate(
          values,
          `${PUBLIC_ADMIN_COUPONS_URL}/${id}`
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
      setIsSubmiting(false);
      console.log("errrrrrrrrrrrrr: ", err);
      setSubmitDialogContent(`${DIALOG_DATA["post-failed"]}: ${err}`);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full  md:max-w-screen-md space-y-2">
        <div className="w-full relative grid grid-cols-1 gap-2 mx-auto">
          {/* coupon info */}
          <AdminCustomSection title={PAGE_DATA["coupon-info"]}>
            <>
              <AdminCustomField
                form={form}
                fieldName="coupon_name"
                title={PAGE_DATA["coupon-name"]}
                required={true}
                type="text-80"
                placeholder={PLACEHOLDER_DATA["coupon-name"]}
              />

              <AdminCustomField
                form={form}
                fieldName="coupon_description"
                title={PAGE_DATA["coupon-description"]}
                required={true}
                type="textarea"
                placeholder={PLACEHOLDER_DATA["coupon-description"]}
              />

              <AdminCustomField
                form={form}
                fieldName="coupon_type"
                required={true}
                type="select-card"
                selectType="admin"
                title={PAGE_DATA["coupon-type"]}
                selectData={{
                  name: PAGE_DATA["coupon-type"],
                  isMultiChoice: false,
                  options: [
                    {
                      value: "Free Ship",
                      img: "/imgs/coupons/default-free-ship.png",
                    },
                    {
                      value: "Order",
                      img: "/imgs/coupons/default-order.png",
                    },
                  ],
                }}
              />

              <AdminCustomField
                form={form}
                fieldName="coupon_stock_quantity"
                title={PAGE_DATA["coupon-stock-quantity"]}
                required={true}
                type="number"
                placeholder={PLACEHOLDER_DATA["coupon-stock-quantity"]}
              />

              <div className="grid grid-cols-2 gap-2">
                <AdminCustomField
                  form={form}
                  fieldName="start_time"
                  title={PAGE_DATA["coupon-start-time"]}
                  required={true}
                  type="datetime"
                />

                <AdminCustomField
                  form={form}
                  fieldName="end_time"
                  title={PAGE_DATA["coupon-end-time"]}
                  required={true}
                  type="datetime"
                />
              </div>
            </>
          </AdminCustomSection>

          <AdminCustomSection title={PAGE_DATA["coupon-discount-info"]}>
            <>
              <div className="flex flex-col">
                <div className="flex flex-row gap-2 justify-between">
                  <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                    <span className="text-red-500">* </span>
                    {PAGE_DATA["coupon-condition"]}
                  </FormLabel>

                  <div className="flex flex-row gap-2 items-center">
                    <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                      {PAGE_DATA["coupon-is-all"]}
                    </FormLabel>

                    <AdminCustomField
                      form={form}
                      fieldName="is_all"
                      type="checkbox"
                      checkboxValue={[true, false]}
                      handleChange={() => {
                        if (form.getValues("is_all") == true)
                          form.setValue("coupon_condition", 0);
                        else form.setValue("coupon_condition", null);
                      }}
                    />
                  </div>
                </div>

                <AdminCustomField
                  form={form}
                  fieldName="coupon_condition"
                  required={true}
                  type="number"
                  placeholder={PLACEHOLDER_DATA["coupon-condition"]}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row gap-2 justify-between">
                  <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                    <span className="text-red-500">* </span>
                    {PAGE_DATA["coupon-value"]}
                  </FormLabel>

                  <div className="flex flex-row gap-2 items-center">
                    <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                      {PAGE_DATA["coupon-unit"]}
                    </FormLabel>

                    <AdminCustomField
                      form={form}
                      fieldName="coupon_unit"
                      required={true}
                      type="checkbox"
                      checkboxValue={["%", "đ"]}
                      handleChange={() => {
                        form.setValue("coupon_value", null);
                      }}
                    />
                  </div>
                </div>

                <AdminCustomField
                  form={form}
                  fieldName="coupon_value"
                  required={true}
                  type="number"
                  placeholder={PLACEHOLDER_DATA["coupon-value"]}
                />
              </div>

              <AdminCustomField
                form={form}
                fieldName="coupon_max_value"
                title={PAGE_DATA["coupon-max-value"]}
                required={true}
                type="number"
                placeholder={PLACEHOLDER_DATA["coupon-max-value"]}
              />
            </>
          </AdminCustomSection>

          <div className="w-full z-50 sticky bottom-0 left-0 px-4 py-2 bg-bg-1 dark:bg-zinc-800 flex flex-row justify-between">
            {id && (
              <Dialog open={openDeletePopup}>
                <DialogTrigger>
                  <Button
                    type="button"
                    variant="default"
                    className={`${id ? "w-fit" : "w-full"}`}
                    onClick={() => {
                      setOpenDeletePopup(true);
                    }}>
                    <span className="px-2">{DIALOG_DATA["delete-btn"]}</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{DIALOG_DATA["delete-group"]}</DialogTitle>

                    {isDeleting ? (
                      <>
                        <DialogDescription>
                          {deleteDialogContent}
                        </DialogDescription>
                        <Spinner />
                      </>
                    ) : (
                      <DialogDescription>
                        {deleteDialogContent}
                      </DialogDescription>
                    )}
                  </DialogHeader>

                  <DialogFooter className="flex flex-row !justify-between">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => {
                          setOpenSubmit(false);
                          setIsDeleting(false);
                        }}>
                        {DIALOG_DATA["close-btn"]}
                      </Button>
                    </DialogClose>

                    {!isDeleting && (
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="default"
                          onClick={async () => {
                            setIsDeleting(true);
                            try {
                              setIsDeleting(true);
                              setDeleteDialogContent(
                                `${DIALOG_DATA["content-general-deleting"]} '${name}'`
                              );

                              const isSuccess: boolean = await handleDelete(
                                [id],
                                PUBLIC_ADMIN_GROUPS_URL
                              );

                              if (!isSuccess) {
                                setDeleteDialogContent(
                                  DIALOG_DATA["content-general-delete-fail"]
                                );
                                setIsDeleting(false);
                                return;
                              }

                              // setIsDeleting(false);
                              setDeleteDialogContent(
                                `${
                                  DIALOG_DATA[
                                    "content-general-delete-success-1"
                                  ]
                                } '${form.getValues("coupon_name")}' ${
                                  DIALOG_DATA[
                                    "content-general-delete-success-3"
                                  ]
                                }`
                              );
                              setTimeout(() => {
                                location.href = ADMIN_GROUPS;
                              }, 3000);
                            } catch (err) {
                              setDeleteDialogContent(
                                `${DIALOG_DATA["content-general-delete-fail"]}: ${err}`
                              );
                              setIsDeleting(false);
                            }
                          }}>
                          {DIALOG_DATA["agree-btn"]}
                        </Button>
                      </DialogClose>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <Dialog open={openSubmit}>
              <DialogTrigger asChild>
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
                      scrollToErr();
                    }
                  }}>
                  <span className="px-2">{DIALOG_DATA["save-btn"]}</span>
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {id == "" || !id
                      ? DIALOG_DATA["add-group"]
                      : DIALOG_DATA["update-group"]}
                  </DialogTitle>

                  {isSubmiting ? (
                    <>
                      <DialogDescription>
                        {submitDialogContent}
                      </DialogDescription>
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
        </div>
      </form>
    </Form>
  );
};

export default FormBody;
