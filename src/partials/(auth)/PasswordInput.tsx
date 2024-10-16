"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Đảm bảo bạn đã cài đặt lucide-react

import { Input, type InputProps } from "@/components/ui/input"; // Giả sử bạn đã có component Input
import { cn } from "@/libs/utils"; // Giả sử bạn có hàm cn để kết hợp classNames

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);

		return (
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					className={cn("pr-10", className)} // Giữ lại padding bên phải cho biểu tượng
					ref={ref}
					{...props}
				/>
				<button
					style={{ top: 0, right: 0 }} // Sử dụng đối tượng JavaScript
					type="button"
					className="absolute top-0 right-0 h-full px-3 py-2 flex items-center text-gray-500 hover:text-gray-700"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? (
						<EyeIcon className="h-4 w-4" aria-hidden="true" />
					) : (
						<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
					)}
					<span className="sr-only">
						{showPassword ? "Hide password" : "Show password"}
					</span>
				</button>
			</div>
		);
	}
);
PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
