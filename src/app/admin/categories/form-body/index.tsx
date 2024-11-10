"use client";

// import libs
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  removeImgsFromCloudinary,
  uploadFilesToCloudinary,
} from "@/libs/cloudinary";

// import components
import { Form } from "@/components/ui/form";
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
import { CATEGORIES_UPLOAD_FOLDER_NAME } from "@/utils/constants/variables";
import {
  handleAdd,
  handleDelete,
  handleUpdate,
} from "@/utils/functions/client";
import {
  ADMIN_CATEGORIES,
  PUBLIC_ADMIN_CATEGORIES_URL,
} from "@/utils/constants/urls";
import {
  convertBlobUrlsToImgFiles,
  getStrOfObj,
} from "@/utils/functions/convert";

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

const FormBody = ({ data, id }: { data: any; id?: string }) => {
  const formSchema = getFormSchema();
  const defaultValues = getFormDefaultValues(data);
  // console.log("datadatadata", data);
  // console.log("categoriesData", categoriesData);
  // console.log("defaultValues", defaultValues);

  // for delete imgs
  const [deletedImgs, setDeletedImgs] = useState<string[]>([]);

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
      setSubmitDialogContent(DIALOG_DATA["imgs-deleting"]);
      // delete deleted imgs
      if (deletedImgs.length > 0) await removeImgsFromCloudinary(deletedImgs);

      setSubmitDialogContent(DIALOG_DATA["imgs-uploading"]);

      // upload avt
      const imgFiles = await convertBlobUrlsToImgFiles(
        [values.category_img],
        "category"
      );

      const imgUrls = await uploadFilesToCloudinary(
        imgFiles,
        CATEGORIES_UPLOAD_FOLDER_NAME
      );
      values.category_img = imgUrls[0];

      setSubmitDialogContent(DIALOG_DATA["category-posting"]);

      // post product
      if (id == "" || !id) {
        const { isSuccess, _id, err } = await handleAdd(
          values,
          PUBLIC_ADMIN_CATEGORIES_URL
        );
        // console.log("isssssssssssssss", isSuccess);

        // remove imgs when post failed
        if (!isSuccess || err != "") {
          await removeImgsFromCloudinary(deletedImgs);

          setIsSubmiting(false);
          setSubmitDialogContent(DIALOG_DATA["post-failed"]);
          return;
        }

        setSubmitDialogContent(DIALOG_DATA["post-success"]);
        setIsSubmiting(false);
        setTimeout(() => {
          location.href = ADMIN_CATEGORIES;
        }, 3000);
      } else {
        const { isSuccess, err } = await handleUpdate(
          values,
          `${PUBLIC_ADMIN_CATEGORIES_URL}/${id}`
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
        return;
      }

      setIsSubmiting(false);
      console.log("errrrrrrrrrrrrr: ", err);
      setSubmitDialogContent(`${DIALOG_DATA["post-failed"]}: ${err}`);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full  md:max-w-screen-md space-y-2">
        <div className="w-full relative grid grid-cols-1 gap-2 mx-auto">
          {/* blog info */}
          <AdminCustomSection title={PAGE_DATA["category-info"]}>
            <>
              <AdminCustomField
                form={form}
                fieldName="category_name"
                title={PAGE_DATA["category-name"]}
                required={true}
                type="text-80"
                placeholder={PLACEHOLDER_DATA["category-name"]}
              />

              <AdminCustomField
                form={form}
                fieldName="category_img"
                title={undefined}
                required={true}
                type="single-img"
                onDelete={setDeletedImgs}
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
                                PUBLIC_ADMIN_CATEGORIES_URL
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
                                } '${form.getValues("category_name")}' ${
                                  DIALOG_DATA[
                                    "content-general-delete-success-3"
                                  ]
                                }`
                              );
                              setTimeout(() => {
                                location.href = ADMIN_CATEGORIES;
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
                      ? DIALOG_DATA["add-category"]
                      : DIALOG_DATA["update-category"]}
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
