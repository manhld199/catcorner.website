"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, CSSProperties } from "react";

export default function RegisterVerifyEmail() {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const emailParam = searchParams.get("email");
		if (emailParam) {
			setEmail(decodeURIComponent(emailParam));
		} else {
			router.push("/register");
		}
	}, [router, searchParams]);

	return (
		<div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-[60%] pt-11 pb-11 px-4">
				<CardHeader className="text-center">
					<div className="mx-auto bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
						<Mail className="h-8 w-8 text-green-600" />
					</div>
					<CardTitle className="text-2xl font-bold text-gray-700">
						XÁC MINH EMAIL CỦA BẠN
					</CardTitle>
				</CardHeader>
				<CardContent className="text-left">
					<p className="text-gray-600 mb-4">
						Vui lòng xác minh địa chỉ email của bạn để hoàn tất việc đăng ký.
						Chúng tôi đã gửi một email xác nhận tới:
					</p>
					<p className="text-green-500 font-semibold mb-4 text-center">
						{email}.
					</p>
					<p className="text-sm text-gray-500">
						Nhấn "Gửi lại email" nếu bạn không nhận được bất kỳ email nào trong
						vòng 10 phút.
					</p>
				</CardContent>

				<CardFooter className="flex flex-col gap-8 pt-11">
					<Button className="w-full mx-auto block" variant="filled">
						Gửi Lại Email
					</Button>
					<Button className="w-1/2 mx-auto block" variant="custom_outlined">
						Quay lại trang Đăng Nhập
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
