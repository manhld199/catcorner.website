import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-12 w-[80%]">
      <h2 className="text-3xl font-bold text-center mb-8">
        Do you have any questions? Don&apos;t hesitate to contact us!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Messages Section */}
        <div>
          <h3 className="text-xl font-semibold mb-8">Messages</h3>
          <p className="text-muted-foreground mb-8">
            Click on the button below or scan QR code to communicate in a
            convenient messenger
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
            <h3 className="text-xl font-semibold mb-4">Call us</h3>
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
                  Subscribe to our Email
                </h3>
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter Your Email address"
                    className="flex-1 w-[230px]"
                  />
                  <Button variant="filled">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">
            Join us on social media
          </h3>
          <p className="text-muted-foreground mb-8">
            We respond to comments and messages in 5 minutes and hold monthly
            contests with valuable prizes!
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
