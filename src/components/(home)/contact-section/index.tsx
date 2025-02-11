"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12 w-full sm:w-[90%] md:w-[85%] lg:w-[80%]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 dark:text-pri-2">
        Có câu hỏi nào không? Đừng ngần ngại liên hệ với chúng tôi!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Messages Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Tin nhắn
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 dark:text-gray-300">
            Chỉ cần nhấn vào nút dưới đây hoặc quét mã QR để trò chuyện với
            chúng tôi qua messenger, thật đơn giản và nhanh chóng!
          </p>
          <div className="flex gap-4">
            {["fb_icon", "instagam_icon", "tiktok_icon"].map((icon) => (
              <Link key={icon} href="#" className="hover:opacity-80">
                <Image
                  src={`/imgs/home/${icon}.svg`}
                  alt={icon.split("_")[0]}
                  width={60}
                  height={60}
                  className="rounded-xl w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Call us Section */}
        <div className="w-full mx-auto flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Gọi cho chúng tôi
          </h3>
          <div className="space-y-2 mb-6 sm:mb-8">
            {["0795-849-949", "0865-359-075"].map((phone) => (
              <div key={phone} className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-neutral-950" />
                <Link
                  href={`tel:${phone}`}
                  className="block text-sm sm:text-base text-muted-foreground hover:text-foreground dark:text-gray-300">
                  {phone}
                </Link>
              </div>
            ))}
          </div>
          {/* Subscribe Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Đăng ký nhận thông tin qua Email
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Nhập địa chỉ Email của bạn"
                className="flex-1 w-full dark:text-gray-300 dark:bg-black"
              />
              <Button
                variant="filled"
                className="w-full sm:w-auto whitespace-nowrap">
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Kết nối với chúng tôi trên mạng xã hội
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 dark:text-gray-300">
            Chúng tôi luôn sẵn sàng trả lời mọi thắc mắc trong vòng 5 phút và tổ
            chức các cuộc thi thú vị với những phần quà hấp dẫn mỗi tháng!
          </p>
          <div className="flex gap-4">
            {["fb_icon", "instagam_icon", "tiktok_icon"].map((icon) => (
              <Link key={icon} href="#" className="hover:opacity-80">
                <Image
                  src={`/imgs/home/${icon}.svg`}
                  alt={icon.split("_")[0]}
                  width={60}
                  height={60}
                  className="rounded-xl w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
