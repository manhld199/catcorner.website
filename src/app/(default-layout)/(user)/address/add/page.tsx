"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BeatLoader from "react-spinners/BeatLoader";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Define the API URL
import { LOCATION_URL, USER_URL } from "@/utils/constants/urls";

// Fetch provinces
const fetchProvinces = async () => {
  const res = await fetch(`${LOCATION_URL}/provinces`);
  const data = await res.json();
  return data.results.map(
    (item: { province_id: string; province_name: string }) => ({
      value: item.province_id,
      label: item.province_name,
    })
  );
};

// Fetch districts by provinceId
const fetchDistricts = async (provinceId: string) => {
  const res = await fetch(`${LOCATION_URL}/districts/${provinceId}`);
  const data = await res.json();
  return data.results.map(
    (item: { district_id: string; district_name: string }) => ({
      value: item.district_id,
      label: item.district_name,
    })
  );
};

// Fetch wards by districtId
const fetchWards = async (districtId: string) => {
  const res = await fetch(`${LOCATION_URL}/wards/${districtId}`);
  const data = await res.json();
  return data.results.map((item: { ward_id: string; ward_name: string }) => ({
    value: item.ward_id,
    label: item.ward_name,
  }));
};

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected
      ? "#1E4646"
      : state.isFocused
        ? "#B3E0E6"
        : "white",
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#1E4646",
    "&:hover": { borderColor: "#315475" },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#315475",
  }),
};
const formSchema = z.object({
  full_name: z.string().min(1, { message: "Họ tên là bắt buộc" }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }),
  detail_address: z
    .string()
    .min(5, { message: "Địa chỉ cụ thể không thể bỏ trống" }),
  is_default: z.boolean(),
});

export default function AddAddressPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" && session) {
      router.replace("/login");
    }
  }, [status, session, router]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      is_default: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    // Fetch provinces on component load
    fetchProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // Fetch districts when a province is selected
      fetchDistricts(selectedProvince.value).then(setDistricts);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch wards when a district is selected
      fetchWards(selectedDistrict.value).then(setWards);
    }
  }, [selectedDistrict]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user?.accessToken) return;
    try {
      setIsSubmitting(true);
      setIsRegistering(true);
      const addressData = {
        full_name: values.full_name,
        phone: values.phone,
        province: {
          id: selectedProvince.value,
          name: selectedProvince.label,
        },
        district: {
          id: selectedDistrict.value,
          name: selectedDistrict.label,
        },
        ward: {
          id: selectedWard.value,
          name: selectedWard.label,
        },
        detail_address: values.detail_address,
        is_default: values.is_default,
      };

      // Gọi API
      const response = await fetch(
        `${USER_URL}/${session?.user?.id}/addresses`,
        {
          method: "POST",
          body: JSON.stringify(addressData),
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        router.push("/address?success=true");
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi thêm địa chỉ.");
      }
    } catch (error) {
      toast.error(
        "Có lỗi xảy ra trong quá trình thêm địa chỉ. Vui lòng thử lại."
      );
      setIsRegistering(false);
    } finally {
      setIsSubmitting(false);
      setIsRegistering(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Thêm địa chỉ mới</CardTitle>
            <CardDescription>
              Vui lòng điền đầy đủ thông tin địa chỉ của bạn
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6 p-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                      Họ tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nguyễn Văn A"
                        className={`bg-white dark:bg-gray-700 dark:text-white ${
                          field.value && !form.formState.errors.full_name
                            ? "border-green-500"
                            : form.formState.errors.full_name
                              ? "border-red-500"
                              : "dark:border-gray-600"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0123456789"
                        className={`bg-white dark:bg-gray-700 dark:text-white ${
                          field.value && !form.formState.errors.phone
                            ? "border-green-500"
                            : form.formState.errors.phone
                              ? "border-red-500"
                              : "dark:border-gray-600"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Select
                options={provinces}
                styles={customStyles}
                value={selectedProvince}
                onChange={(option) => setSelectedProvince(option)}
                placeholder="Chọn tỉnh/thành phố"
                isSearchable
              />
              <Select
                options={districts}
                styles={customStyles}
                value={selectedDistrict}
                onChange={(option) => setSelectedDistrict(option)}
                placeholder="Chọn quận/huyện"
                isSearchable
                isDisabled={!selectedProvince}
              />
              <Select
                options={wards}
                styles={customStyles}
                value={selectedWard}
                onChange={(option) => setSelectedWard(option)}
                placeholder="Chọn phường/xã"
                isSearchable
                isDisabled={!selectedDistrict}
              />
              <FormField
                control={form.control}
                name="detail_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                      Địa chỉ cụ thể
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Số nhà, tên đường, phường/xã"
                        className={`bg-white dark:bg-gray-700 dark:text-white ${
                          field.value && !form.formState.errors.detail_address
                            ? "border-green-500"
                            : form.formState.errors.detail_address
                              ? "border-red-500"
                              : "dark:border-gray-600"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_default"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isDefault"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <Label
                        htmlFor="isDefault"
                        className="text-gray-600 dark:text-gray-300">
                        Đặt làm địa chỉ mặc định
                      </Label>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="filled_outlined"
                  onClick={() => router.back()}>
                  Hủy
                </Button>
                <Button
                  variant="filled"
                  type="submit"
                  disabled={
                    !form.formState.isValid ||
                    isSubmitting ||
                    isRegistering ||
                    selectedDistrict == null ||
                    selectedProvince == null ||
                    selectedWard == null
                  }>
                  {isSubmitting ? (
                    <BeatLoader color="#ffffff" size={8} />
                  ) : isRegistering ? (
                    "Đang xử lý..."
                  ) : (
                    "Lưu địa chỉ"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
}
