"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthHeader from "@/partials/(auth)/header";
import { AUTH_URL } from "@/utils/constants/urls";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";
import type { CSSProperties } from "react";
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

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setIsProcessing(true);

      const response = await fetch(`${AUTH_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra!");
      }
      toast.success("OTP đã được gửi vào email của bạn", {
        autoClose: 2000,
        onClose: () =>
          router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast.error(error.message || "Không thể gửi yêu cầu đặt lại mật khẩu!");
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      window.location.href = `${AUTH_URL}/google`;
    } catch (error) {
      toast.error("Error during Google login. Please try again.");
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      window.location.href = `${AUTH_URL}/facebook`;
    } catch (error) {
      toast.error("Error during Facebook login. Please try again.");
    }
  };
  return (
    <>
      <AuthHeader currentPage="login" />
      <div className="w-[500px] h-[630px] mx-auto flex justify-center items-center">
        <Card className="dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Đặt lại mật khẩu
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Nhập email đã đăng ký để đặt lại mật khẩu!
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                        Email
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="mongthitrinhtkp@gmail.com"
                            disabled={isLoading}
                            className={`bg-white dark:bg-gray-700 dark:text-white ${
                              field.value && !form.formState.errors.email
                                ? "border-green-500"
                                : form.formState.errors.email
                                  ? "border-red-500"
                                  : "dark:border-gray-600"
                            }`}
                          />
                        </FormControl>
                        {form.formState.errors.email && (
                          <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                        )}
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button
                    variant="custom"
                    className="w-[50%] m-auto bg-pri-7 dark:bg-pri-8 dark:hover:bg-pri-9 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                    type="submit"
                    disabled={!form.formState.isValid || isLoading}>
                    {isLoading ? (
                      <BeatLoader
                        color="#ffffff"
                        size={8}
                        cssOverride={override}
                      />
                    ) : isProcessing ? (
                      "Đang xử lý..."
                    ) : (
                      "Xác nhận"
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-sm underline dark:text-gray-300"
                    onClick={() => router.push("/login")}
                    type="button"
                    disabled={isLoading}>
                    Trở lại
                  </Button>
                </div>

                <div className="mt-4 sm:mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-base sm:text-lg md:text-xl dark:text-gray-300">
                        Hoặc đăng nhập với
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="custom_outlined"
                      className="w-full sm:w-48 text-base sm:text-lg md:text-xl"
                      onClick={handleLoginWithFacebook}>
                      <Image
                        src={`/imgs/auth/fb_logo.svg`}
                        alt="Facebook"
                        width={32}
                        height={32}
                        className="mr-2"
                        quality={100}
                      />
                      Facebook
                    </Button>
                    <Button
                      variant="custom_outlined"
                      className="w-full sm:w-48 text-base sm:text-lg md:text-xl"
                      onClick={handleLoginWithGoogle}>
                      <Image
                        src={`/imgs/auth/gg_logo.svg`}
                        alt="Google"
                        width={28}
                        height={28}
                        className="mr-2"
                        quality={100}
                      />
                      Google
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Lorem is num Lorem is num Lorem is num Lorem is num Lorem is
                  num Lorem is num Lorem is num Lorem is num
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}
