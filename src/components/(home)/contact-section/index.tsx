import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-12 w-[80%]">
      <h2 className="text-3xl font-bold text-center mb-8">
        Có câu hỏi nào không? Đừng ngần ngại liên hệ với chúng tôi!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Messages Section */}
        <div>
          <h3 className="text-xl font-semibold mb-8">Tin nhắn</h3>
          <p className="text-muted-foreground mb-8">
            Chỉ cần nhấn vào nút dưới đây hoặc quét mã QR để trò chuyện với
            chúng tôi qua messenger, thật đơn giản và nhanh chóng!
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/imgs/home/fb_icon.svg"
                alt="Facebook"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/imgs/home/instagam_icon.svg"
                alt="Instagram"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/imgs/home/tiktok_icon.svg"
                alt="TikTok"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
          </div>
        </div>

        {/* Call us Section */}
        <div className="w-full mx-auto flex">
          <div className="mx-auto">
            <h3 className="text-xl font-semibold mb-4">Gọi cho chúng tôi</h3>
            <div className="space-y-2 mb-8">
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-neutral-950" />
                <Link
                  href="tel:0795-849-949"
                  className="block text-muted-foreground hover:text-foreground">
                  0795-849-949
                </Link>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-neutral-950" />
                <Link
                  href="tel:0865-359-075"
                  className="block text-muted-foreground hover:text-foreground">
                  0865-359-075
                </Link>
              </div>
            </div>
            {/* Subscribe Section */}
            <div className="">
              <div className="">
                <h3 className="text-xl font-semibold mb-2">
                  Đăng ký nhận thông tin qua Email
                </h3>
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ Email của bạn"
                    className="flex-1 w-[230px]"
                  />
                  <Button variant="filled">Đăng ký ngay</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">
            Kết nối với chúng tôi trên mạng xã hội
          </h3>
          <p className="text-muted-foreground mb-8">
            Chúng tôi luôn sẵn sàng trả lời mọi thắc mắc trong vòng 5 phút và tổ
            chức các cuộc thi thú vị với những phần quà hấp dẫn mỗi tháng!
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/imgs/home/fb_icon.svg"
                alt="Facebook"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/imgs/home/instagam_icon.svg"
                alt="Instagram"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
            <Link href="#" className="hover:opacity-80">
              <Image
                src="/imgs/home/tiktok_icon.svg"
                alt="TikTok"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
