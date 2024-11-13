"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Calendar as CalendarIcon,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import UserSidebar from "@/partials/(user)/sidebar_nav";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { IMaskInput } from "react-imask";

// Update the userData state interface to match API response
interface UserData {
  user_name: string;
  user_phone_number: string;
  user_sex: "Nam" | "Nữ" | "Khác" | undefined | "";
  user_birth_day: string;
  user_avt?: string;
}

type Gender = "Nam" | "Nữ" | "Khác";

// Cập nhật schema validation
const profileSchema = z.object({
  user_name: z
    .string()
    .min(2, { message: "Họ tên phải có ít nhất 2 ký tự" })
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, {
      message: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
    })
    .refine((value) => value.trim().length >= 2, {
      message: "Họ tên phải có ít nhất 2 ký tự",
    }),
  user_phone_number: z
    .string()
    .regex(/^[0-9]{10,11}$/, {
      message: "Số điện thoại không hợp lệ (10-11 số)",
    })
    .optional()
    .or(z.literal("")), // Cho phép chuỗi rỗng
  user_sex: z
    .enum(["Nam", "Nữ", "Khác"] as const)
    .optional()
    .or(z.literal("")), // Cho phép bỏ trống
  user_birth_day: z
    .string()
    .refine(
      (date) => {
        if (!date) return true; // Cho phép giá trị rỗng
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      },
      { message: "Ngày sinh không hợp lệ" }
    )
    .optional()
    .or(z.literal("")), // Cho phép bỏ trống
});

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [dateInput, setDateInput] = useState("");
  const [userData, setUserData] = useState<UserData>({
    user_name: "",
    user_phone_number: "",
    user_sex: undefined,
    user_birth_day: "",
    user_avt: "",
  });
  // Thêm hàm helper để chuẩn hóa giá trị giới tính
  const normalizeGenderValue = (
    gender: string | undefined | null
  ): "Nam" | "Nữ" | "Khác" | undefined => {
    if (!gender) return undefined;
    const normalizedGender =
      gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    return ["Nam", "Nữ", "Khác"].includes(normalizedGender as Gender)
      ? (normalizedGender as Gender)
      : undefined;
  };
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session?.user?.accessToken) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log("Profile data:", data); // Log để debug

        if (data.success && data.data?.user) {
          const profile = data.data.user;

          // Cập nhật userData
          setUserData({
            user_name: profile.user_name || "",
            user_phone_number: profile.user_phone_number || "",
            user_sex: normalizeGenderValue(profile.user_sex),
            user_birth_day: profile.user_birth_day || "",
            user_avt: profile.user_avt || "",
          });

          // Set the avatar image if it exists
          if (profile.user_avt) {
            setImage(profile.user_avt);
          }

          // Set date and dateInput if birth_day exists
          if (profile.user_birth_day) {
            const parsedDate = new Date(profile.user_birth_day);
            setDate(parsedDate);
            setDateInput(format(parsedDate, "dd/MM/yyyy"));
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [session]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      user_name: userData.user_name,
      user_phone_number: userData.user_phone_number,
      user_sex: userData.user_sex || "",
      user_birth_day: userData.user_birth_day,
    },
  });

  // Thêm useEffect để cập nhật form khi có dữ liệu mới
  useEffect(() => {
    if (userData) {
      form.reset({
        user_name: userData.user_name,
        user_phone_number: userData.user_phone_number,
        user_sex: userData.user_sex,
        user_birth_day: userData.user_birth_day,
      });
    }
  }, [userData, form]);

  const handleUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    if (!session?.user?.accessToken) return;

    try {
      const formData = new FormData();
      let hasChanges = false;

      // Kiểm tra từng trường và chỉ thêm vào formData nếu có thay đổi
      Object.keys(values).forEach((key) => {
        const fieldKey = key as keyof typeof values;
        const newValue = values[fieldKey];
        const oldValue = userData[fieldKey];

        // Đặc biệt x lý cho trường user_sex
        if (fieldKey === "user_sex") {
          // Chỉ append nếu newValue không phải empty string và khác với oldValue
          if (newValue && newValue !== "" && newValue !== oldValue) {
            console.log(`Field ${fieldKey} changed:`, {
              old: oldValue,
              new: newValue,
            });
            formData.append(fieldKey, String(newValue));
            hasChanges = true;
          }
        } else {
          // Xử lý các trường khác như bình thường
          if (
            newValue !== oldValue &&
            newValue !== undefined &&
            newValue !== ""
          ) {
            console.log(`Field ${fieldKey} changed:`, {
              old: oldValue,
              new: newValue,
            });
            formData.append(fieldKey, String(newValue));
            hasChanges = true;
          }
        }
      });

      // Kiểm tra nếu có file ảnh mới
      if (imageFile) {
        formData.append("user_avt", imageFile);
        hasChanges = true;
      }

      // Nếu không có thay đổi gì, thông báo và return
      if (!hasChanges) {
        toast.info("Không có thông tin nào được thay đổi");
        return;
      }

      // Log để kiểm tra dữ liệu sẽ gửi đi
      formData.forEach((value, key) => {
        console.log(`Sending ${key}:`, value);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      if (data.success) {
        toast.success("Cập nhật thông tin thành công!");
        setImageFile(null);

        // Cập nhật lại userData với những giá trị mới
        const updatedValues = {
          ...values,
          user_sex: values.user_sex || undefined, // Chuyển empty string thành undefined
        };

        setUserData((prev) => ({
          ...prev,
          ...updatedValues,
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error instanceof Error ? error.message : "Lỗi cập nhật thông tin"
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDateInput(input);

    // Parse ngày tháng từ input với format dd/MM/yyyy
    const parsedDate = parse(input, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate)) {
      setDate(parsedDate);
      // Set giờ về 12:00 trưa để tránh vấn đề timezone
      parsedDate.setHours(12, 0, 0, 0);
      form.setValue("user_birth_day", parsedDate.toISOString(), {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setDateInput(format(selectedDate, "dd/MM/yyyy"));

      // Tạo ngày mới với giờ là 0 và điều chỉnh timezone
      const adjustedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0
      );
      // Trừ đi offset để điều chỉnh timezone
      adjustedDate.setMinutes(
        adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
      );

      form.setValue("user_birth_day", adjustedDate.toISOString(), {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  // Update the form input handlers
  const handleInputChange = (field: keyof UserData, value: string) => {
    if (field === "user_sex") {
      setUserData((prev) => ({
        ...prev,
        [field]: value as Gender,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null); // Also clear the file object
  };

  // Thêm hàm handleReset để xử lý reset form
  const handleReset = () => {
    // Reset form về giá trị ban đầu từ userData
    form.reset({
      user_name: userData.user_name,
      user_phone_number: userData.user_phone_number,
      // Chỉ set giá trị cho user_sex và user_birth_day nếu có giá trị ban đầu
      ...(userData.user_sex
        ? { user_sex: userData.user_sex }
        : { user_sex: "" }),
      ...(userData.user_birth_day
        ? { user_birth_day: userData.user_birth_day }
        : { user_birth_day: "" }),
    });

    // Reset date và dateInput nếu không có ngày sinh ban đầu
    if (!userData.user_birth_day) {
      setDate(undefined);
      setDateInput("");
    } else {
      const parsedDate = new Date(userData.user_birth_day);
      setDate(parsedDate);
      setDateInput(format(parsedDate, "dd/MM/yyyy"));
    }

    // Reset image về trạng thái ban đầu
    setImageFile(null);
    if (userData.user_avt) {
      setImage(userData.user_avt);
    } else {
      setImage(null);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full md:w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] relative z-0 px-4 md:px-0">
      <UserSidebar />
      <div className="w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border border-border-color rounded-[8px] w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 pl-5 hover:bg-muted/50">
            <h2 className="font-bold text-center">Thông tin tài khoản</h2>
            <ChevronDown
              className={`text-pri-1 w-7 h-7 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-6 pt-0">
              {/* avatar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 md:p-[20px] border border-border-color rounded-[8px]">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 flex-shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : userData.user_avt ? (
                    <img
                      src={userData.user_avt}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="filled" className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                    <ImagePlus />
                    Thêm ảnh
                  </Button>
                  <Button variant="filled_outlined" onClick={handleRemoveImage}>
                    <Trash2 />
                    Xóa ảnh
                  </Button>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdateProfile)}
                  className="space-y-4">
                  <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-gray-600">
                          Họ tên <span className="text-red-600">*</span>
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nhập họ tên của bạn"
                              className={`bg-white ${
                                field.value && !form.formState.errors.user_name
                                  ? "border-green-500"
                                  : form.formState.errors.user_name
                                    ? "border-red-500"
                                    : ""
                              }`}
                            />
                          </FormControl>
                          {form.formState.errors.user_name && (
                            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                          )}
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user_phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-gray-600">
                          Số điện thoại
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Nhập số điện thoại của bạn"
                              className={`bg-white ${
                                field.value &&
                                !form.formState.errors.user_phone_number
                                  ? "border-green-500"
                                  : form.formState.errors.user_phone_number
                                    ? "border-red-500"
                                    : ""
                              }`}
                            />
                          </FormControl>
                          {form.formState.errors.user_phone_number && (
                            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                          )}
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user_sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-gray-600">
                          Giới tính
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value || ""}
                            className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="Nam"
                                id="nam"
                                className="text-pri-1"
                              />
                              <Label
                                htmlFor="nam"
                                className="text-base text-pri-1">
                                Nam
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="Nữ"
                                id="nu"
                                className="text-pri-1"
                              />
                              <Label
                                htmlFor="nu"
                                className="text-base text-pri-1">
                                Nữ
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="Khác"
                                id="khac"
                                className="text-pri-1"
                              />
                              <Label
                                htmlFor="khac"
                                className="text-base text-pri-1">
                                Khác
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user_birth_day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-gray-600">
                          Ngày sinh
                        </FormLabel>
                        <div className="relative flex w-full sm:w-[50%] md:w-[40%] lg:w-[25%]">
                          <FormControl>
                            <IMaskInput
                              mask="00/00/0000"
                              definitions={{
                                "0": /[0-9]/,
                              }}
                              unmask={false}
                              value={dateInput}
                              onAccept={(value: string) => {
                                setDateInput(value);
                                const parsedDate = parse(
                                  value,
                                  "dd/MM/yyyy",
                                  new Date()
                                );
                                if (isValid(parsedDate)) {
                                  setDate(parsedDate);
                                  // Tạo ngày mới với giờ là 0 và điều chỉnh timezone
                                  const adjustedDate = new Date(
                                    parsedDate.getFullYear(),
                                    parsedDate.getMonth(),
                                    parsedDate.getDate(),
                                    0,
                                    0,
                                    0
                                  );
                                  // Trừ đi offset để điều chỉnh timezone
                                  adjustedDate.setMinutes(
                                    adjustedDate.getMinutes() -
                                      adjustedDate.getTimezoneOffset()
                                  );

                                  form.setValue(
                                    "user_birth_day",
                                    adjustedDate.toISOString(),
                                    {
                                      shouldDirty: true,
                                      shouldTouch: true,
                                    }
                                  );
                                }
                              }}
                              lazy={false}
                              placeholderChar="_"
                              placeholder="dd/mm/yyyy"
                              className={`w-full rounded-r-none text-base text-pri-1 h-10 px-3 py-2 border ${
                                dateInput &&
                                !form.formState.errors.user_birth_day
                                  ? "border-green-500"
                                  : form.formState.errors.user_birth_day
                                    ? "border-red-500"
                                    : "border-input"
                              }`}
                            />
                          </FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="rounded-l-none border-l-0">
                                <CalendarIcon className="h-4 w-4 text-pri-1" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleCalendarSelect}
                                initialFocus
                                locale={vi}
                                className="text-base text-pri-1"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      variant="filled"
                      className="w-full sm:w-auto bg-pri-7 px-7"
                      type="submit"
                      disabled={!form.formState.isDirty && !imageFile}>
                      Cập nhật
                    </Button>
                    <Button
                      type="button"
                      variant="filled_outlined"
                      className="w-full sm:w-auto border-pri-7 text-pri-7 px-7"
                      onClick={handleReset}>
                      Hủy bỏ
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
