"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import { useRouter } from "next/navigation";
import { ORDER_URL } from "@/utils/constants/urls";

// Định nghĩa schema validation
const formSchema = z.object({
  orderId: z.string().min(1, { message: "Vui lòng nhập mã đơn hàng" }),
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .regex(/^[0-9]+$/, { message: "Số điện thoại chỉ được chứa số" })
    .min(10, { message: "Số điện thoại phải có ít nhất 10 số" })
    .max(11, { message: "Số điện thoại không được quá 11 số" }),
});

export default function OrderTracking() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      // Gọi API với URL được cung cấp
      const response = await fetch(
        `${ORDER_URL}/track?order_id=${values.orderId}&phone_number=${values.phone}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không tìm thấy đơn hàng");
      }

      // Nếu tìm thấy đơn hàng, chuyển hướng đến trang chi tiết
      router.push(
        `/order-tracking/result?order_id=${values.orderId}&phone_number=${values.phone}`
      );
    } catch (error: any) {
      toast.error(
        error.message ||
          "Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-6 min-h-screen w-[80%] mx-auto mt-10 flex items-center justify-center h-[769px]">
      <div className="w-full h-full">
        <div className="p-0 w-full h-full">
          <div className="grid gap-8 md:grid-cols-2 w-full h-full">
            {/* Left Column - Illustration */}
            <div className="h-full bg-gradient-to-br from-yellow-50 via-teal-50 to-blue-50 flex items-center justify-center">
              <div className="relative w-full h-full aspect-square">
                <Image
                  src={`/imgs/orders/order-tracking.png`}
                  alt="Order Tracking Illustration"
                  fill
                  quality={100}
                  priority
                  className="filled"
                />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6 p-6 pt-[76px]">
              <div className="space-y-2">
                <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl dark:text-white">
                  Tra cứu đơn hàng
                </h1>
                <p className="text-sm text-muted-foreground">
                  Kiểm tra thông tin đơn hàng và tình trạng vận chuyển đơn hàng
                  của bạn!
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  <FormField
                    control={form.control}
                    name="orderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                          Mã đơn hàng:
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nhập mã đơn hàng của bạn"
                              className={`w-full bg-white dark:bg-gray-700 dark:text-white text-base ${
                                field.value && !form.formState.errors.orderId
                                  ? "border-green-500"
                                  : form.formState.errors.orderId
                                    ? "border-red-500"
                                    : "dark:border-gray-600"
                              }`}
                            />
                          </FormControl>
                          {form.formState.errors.orderId && (
                            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                          )}
                        </div>
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
                          Số điện thoại nhận hàng:
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Nhập số điện thoại nhận hàng"
                              className={`w-full bg-white dark:bg-gray-700 dark:text-white text-base ${
                                field.value && !form.formState.errors.phone
                                  ? "border-green-500"
                                  : form.formState.errors.phone
                                    ? "border-red-500"
                                    : "dark:border-gray-600"
                              }`}
                            />
                          </FormControl>
                          {form.formState.errors.phone && (
                            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                          )}
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="custom"
                    className="w-full text-xl p-5"
                    disabled={!form.formState.isValid || isSubmitting}
                    type="submit">
                    {isSubmitting ? (
                      <BeatLoader color="#ffffff" size={8} />
                    ) : (
                      "Tra cứu"
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Hoặc
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="custom_outlined"
                    className="w-full text-xl border border-pri-7 text-pri-7 p-5">
                    Xem đơn hàng trong CatCorner
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
