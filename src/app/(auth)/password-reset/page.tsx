import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AuthHeader from "@/partials/(auth)/header";

export default function Component() {
  return (
    <>
      <AuthHeader currentPage="login"></AuthHeader>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Đặt lại mật khẩu</CardTitle>
          <p className="text-sm text-muted-foreground">
            Nhập email đã đăng ký để đặt lại mật khẩu!
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email:
              </label>
              <Input
                id="email"
                placeholder="mongthitrinhtkp@gmail.com"
                required
                type="email"
              />
            </div>
            <div className="text-center">
              <Button variant="custom" className="w-[50%] m-auto" type="submit">
                Xác nhận
              </Button>
            </div>
            <div className="text-center">
              <Button variant="link" className="text-sm underline">
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
                  className="w-full sm:w-48 text-base sm:text-lg md:text-xl">
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
                  className="w-full sm:w-48 text-base sm:text-lg md:text-xl">
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
              Lorem is num Lorem is num Lorem is num Lorem is num Lorem is num
              Lorem is num Lorem is num Lorem is num
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
