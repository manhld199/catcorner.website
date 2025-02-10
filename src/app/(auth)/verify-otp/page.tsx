"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import AuthHeader from "@/partials/(auth)/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AUTH_URL } from "@/utils/constants/urls";
import { BeatLoader } from "react-spinners";

export default function VerifyOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Thêm xử lý khi nhấn Enter
    if (e.key === "Enter") {
      e.preventDefault();
      // Kiểm tra nếu đã nhập đủ OTP thì gọi verify
      if (otp.every((digit) => digit !== "")) {
        handleVerifyOTP();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 6 && !isNaN(Number(char))) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      setIsProcessing(true);

      const response = await fetch(`${AUTH_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.data?.resetToken) {
          sessionStorage.setItem("resetToken", data.data.resetToken);

          toast.success("OTP xác thực thành công.", {
            autoClose: 2000,
            onClose: () => router.push("/reset-password"),
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          throw new Error("Reset token not received");
        }
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const isValidOTP = React.useMemo(() => {
    return otp.every((digit) => digit !== "");
  }, [otp]);

  return (
    <>
      <AuthHeader currentPage="login" />
      <div className="w-[500px] h-[630px] mx-auto flex justify-center items-center">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Đặt lại mật khẩu
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Nhập mã OTP đã được gửi về email của bạn!
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-center text-pri-1 dark:text-white">
                  OTP Verification
                </h4>
                <div className="text-sm text-muted-foreground mb-3">
                  Nhập mã xác thực vừa được gửi đến email{" "}
                  <span className="dark:text-teal-300">
                    {email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-center">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={(e) => handlePaste}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                        return undefined;
                      }}
                      className={cn(
                        "w-12 h-12 text-center text-lg",
                        "focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      )}
                    />
                  ))}
                </div>
                <div className="mt-2 text-center text-sm">
                  <span className="text-muted-foreground">
                    Didn&apos;t receive code?{" "}
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    className="text-pri-6 dark:text-blue-400 underline font-medium pl-0">
                    Resend
                  </Button>
                </div>
                <div className="space-y-2 text-center mt-4">
                  <Button
                    onClick={handleVerifyOTP}
                    variant="custom"
                    className="w-[50%] m-auto bg-pri-7 dark:bg-pri-8 dark:hover:bg-pri-9 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                    disabled={!isValidOTP || isLoading}>
                    {isLoading ? (
                      <BeatLoader
                        color="#ffffff"
                        size={8}
                        cssOverride={{
                          display: "block",
                          margin: "0 auto",
                          borderColor: "red",
                        }}
                      />
                    ) : isProcessing ? (
                      "Đang xử lý..."
                    ) : (
                      "Xác nhận"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-muted-foreground hover:text-foreground underline"
                    onClick={() => router.push("/forgot-password")}
                    disabled={isLoading}>
                    Hủy
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}
