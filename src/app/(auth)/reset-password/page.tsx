"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthHeader from "@/partials/(auth)/header";
import { AUTH_URL } from "@/utils/constants/urls";
import { useState, useEffect } from "react";
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
import { PasswordInput } from "@/components/(general)/inputs/input-password/page";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// Define form schema
const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Mật khẩu không khớp",
    path: ["passwordConfirmation"],
  });

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const resetToken = sessionStorage.getItem("resetToken");
    console.log(resetToken);
    if (!resetToken) {
      toast.error("Phiên làm việc đã hết hạn");
      router.push("/forgot-password");
    }
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setIsProcessing(true);

      const resetToken = sessionStorage.getItem("resetToken");
      console.log("onsubmit", resetToken);

      if (!resetToken) {
        throw new Error("Phiên làm việc đã hết hạn");
      }

      const response = await fetch(`${AUTH_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: resetToken,
          new_password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra!");
      }

      sessionStorage.removeItem("resetToken");

      toast.success("Đổi mật khẩu thành công", {
        autoClose: 2000,
        onClose: () => router.push("/login?reset=success"),
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Không thể đặt lại mật khẩu!");
      if (error.message.includes("hết hạn")) {
        router.push("/forgot-password");
      }
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <>
      <AuthHeader currentPage="login" />
      <div className="w-[500px] h-[630px] mx-auto flex justify-center items-center">
        <Card className="w-full dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Đặt lại mật khẩu
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Nhập mật khẩu mới của bạn
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                        Mật khẩu mới <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          className={`bg-white dark:bg-gray-700 dark:text-white ${
                            field.value && !form.formState.errors.password
                              ? "border-green-500"
                              : form.formState.errors.password
                                ? "border-red-500"
                                : "dark:border-gray-600"
                          }`}
                          placeholder="Mật khẩu phải có ít nhất 8 ký tự"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300 text-base">
                        Xác nhận mật khẩu{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          className={`bg-white dark:bg-gray-700 dark:text-white ${
                            field.value &&
                            !form.formState.errors.passwordConfirmation &&
                            field.value === form.getValues("password")
                              ? "border-green-500"
                              : form.formState.errors.passwordConfirmation
                                ? "border-red-500"
                                : "dark:border-gray-600"
                          }`}
                          placeholder="Nhập lại mật khẩu của bạn"
                        />
                      </FormControl>
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
                      "Đặt lại mật khẩu"
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="w-full text-muted-foreground hover:text-foreground underline"
                    onClick={() => router.push("/forgot-password")}>
                    Hủy
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}
