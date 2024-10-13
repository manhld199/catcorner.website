"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "@/partials/(auth)/PasswordInput";

export default function SignUpPage() {
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const isFormValid = () => {
		// Kiểm tra xem email, password và checkbox đã được chọn hay chưa
		return (
			formData.email !== "" &&
			password !== "" &&
			passwordConfirmation != "" &&
			agreeTerms
		);
	};

	return (
		<div className="flex min-h-screen">
			{/* Left side - Image */}
			<div className="hidden lg:block lg:w-1/2 relative">
				<Image
					src={`/imgs/auth/circle.png`}
					alt="Abstract background"
					layout="fill"
					objectFit="scale-down"
				/>
			</div>

			{/* Right side - Form */}
			<div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
				<main className="flex-grow">
					<h1 className="text-3xl font-bold mb-2">Create your account</h1>
					<p className="text-muted-foreground mb-6 text-red-500 italic">
						Vui lòng không để trống các mục được đánh dấu *
					</p>

					<form className="space-y-6">
						<div>
							<Label className="text-gray-600">First Name</Label>
							<Input
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="text-gray-600">Last Name</Label>
							<Input
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
							/>
						</div>

						<div>
							<Label className="text-gray-600">
								Email <span className="text-red-600">*</span>
							</Label>
							<Input
								name="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="text-gray-600">
								Password <span className="text-red-600">*</span>
							</Label>
							<PasswordInput
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<Label className="text-gray-600">
								Confirm Password <span className="text-red-600">*</span>
							</Label>

							<PasswordInput
								id="password_confirmation"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								autoComplete="password"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox
								id="terms"
								checked={agreeTerms}
								onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
							/>
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Agree to our Terms of use and Privacy Policy
							</label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="newsletter"
								checked={subscribeNewsletter}
								onCheckedChange={(checked) =>
									setSubscribeNewsletter(checked as boolean)
								}
							/>
							<label
								htmlFor="newsletter"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Subscribe to our monthly newsletter
							</label>
						</div>

						<Button
							className="w-1/2 mx-auto block"
							disabled={!isFormValid()} // Kích hoạt nút dựa trên điều kiện
							variant="custom"
						>
							Sign up
						</Button>
					</form>

					<p className="text-center text-sm text-muted-foreground mt-4">
						<Link href="/forgot-password" className="underline">
							Forgot your password?
						</Link>
					</p>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or sign up with
								</span>
							</div>
						</div>
						<div className="mt-6 flex justify-center space-x-4">
							<Button variant="outline" className="w-full">
								<Image
									src={`/imgs/auth/logo_fb.png`}
									alt="Facebook"
									width={30} // Tăng kích thước nếu cần
									height={30} // Tăng kích thước nếu cần
									className="mr-2"
									quality={100} // Đảm bảo chất lượng cao
								/>
								Facebook
							</Button>
							<Button variant="outline" className="w-full">
								<Image
									src={`/imgs/auth/gg_logo.png`}
									alt="Google"
									width={24} // Tăng kích thước nếu cần
									height={24} // Tăng kích thước nếu cần
									className="mr-2"
									quality={100} // Đảm bảo chất lượng cao
								/>
								Google
							</Button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
