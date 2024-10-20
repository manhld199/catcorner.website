import { CardContent } from "@/components/ui/card";
interface EmailContentProps {
	email: string;
}

export default function EmailContent({ email }: EmailContentProps) {
	return (
		<>
			<CardContent className="text-left">
				<p className="text-gray-600 mb-4">
					Vui lòng xác minh địa chỉ email của bạn để hoàn tất việc đăng ký.
					Chúng tôi đã gửi một email xác nhận tới:
				</p>
				<p className="text-green-500 font-semibold mb-4 text-center">{email}</p>
				<p className="text-sm text-gray-500">
					Nhấn &quot;Gửi lại email&quot; nếu bạn không nhận được bất kỳ email
					nào trong vòng 10 phút.
				</p>
			</CardContent>
		</>
	);
}
