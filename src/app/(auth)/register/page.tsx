"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

import { useState, useCallback, CSSProperties, useEffect } from "react";

import BeatLoader from "react-spinners/BeatLoader";
import { PasswordInput } from "@/components/(general)/inputs/input-password/page";
import {AUTH_URL} from "@/utils/constants/urls"
import AuthHeader from "@/partials/(auth)/header/page";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};
// Define the form schema using Zod
const formSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "Họ tên phải có ít nhất 2 ký tự" })
			.regex(/^[a-zA-ZÀ-ỹ\s]+$/, {
				message: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
			})
			.refine((value) => value.trim().length >= 2, {
				message: "Họ tên phải có ít nhất 2 ký tự",
			}),
		email: z.string().email({ message: "Email không hợp lệ" }),
		password: z
			.string()
			.min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
		passwordConfirmation: z.string(),
		agreeTerms: z.boolean().refine((val) => val === true, {
			message: "You must agree to the terms and conditions",
		}),
		subscribeNewsletter: z.boolean().optional(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Mật khẩu không khớp",
		path: ["passwordConfirmation"],
	});

export default function RegisterPage() {
	const { data: session, status } = useSession();
	const [emailExists, setEmailExists] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state này
	const [isRegistering, setIsRegistering] = useState(false);
	useEffect(() => {
		if (status === "authenticated" && session) {
			router.replace("/");
		}
		const subscription = form.watch((value, { name, type }) => {
			if (name === "password" || name === "passwordConfirmation") {
				const password = form.getValues("password");
				const passwordConfirmation = form.getValues("passwordConfirmation");

				if (
					password &&
					passwordConfirmation &&
					password !== passwordConfirmation
				) {
					form.setError("passwordConfirmation", {
						type: "manual",
						message: "Passwords do not match",
					});
				} else {
					form.clearErrors("passwordConfirmation");
				}
			}
		});

		return () => subscription.unsubscribe();
	});

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			agreeTerms: false,
			subscribeNewsletter: false,
		},
		mode: "onChange", // Thêm dòng này để kích hoạt validation khi giá trị thay đổi
	});

	const checkEmailExists = useCallback(
		async (email: string) => {
			// First, check if the email is valid
			const emailSchema = z.string().email();
			const result = emailSchema.safeParse(email);

			if (!result.success) {
				// If email is not valid, don't call the API
				form.setError("email", {
					type: "manual",
					message: "Email không hợp lệ",
				});
				return;
			}
			try {
				const response = await fetch(
					`${AUTH_URL}/check-email?email=${email}`,
					{
						method: "GET",
					}
				);
				const data = await response.json();
				console.log("data", data.data);
				setEmailExists(data.data.exists);
				if (data.data.exists) {
					console.log("exist");
					form.setError("email", {
						type: "manual",
						message: "Email đã được đăng ký",
					});
				} else {
					form.clearErrors("email");
				}
			} catch (error) {
				console.error("Error checking email:", error);
			}
		},
		[form]
	);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsSubmitting(true);
			setIsRegistering(true);

			const apiPayload = {
				email: values.email,
				password: values.password,
				user_name: values.name,
			};
			const response = await fetch(
				`${AUTH_URL}/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(apiPayload),
				}
			);
			const data = await response.json();

			if (!response.ok) {
				toast.error(data.message || "Đăng ký thất bại. Vui lòng thử lại sau.");
				setIsRegistering(false);
				return;
			}

			console.log("Registration successful", data);
			router.push(
				`/register/verify-email?email=${encodeURIComponent(values.email)}`
			);
		} catch (error) {
			toast.error("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.");
			setIsRegistering(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleLoginWithGoogle = async () => {
		try {
			window.location.href = `${AUTH_URL}/google`;
		
			} catch (error) {
				toast.error("Error during Google login. Please try again.");
				
			}
				
	};

	const handleLoginWithFacebook = async () => {
		try {
			window.location.href = `${AUTH_URL}/facebook`;
		} catch (error) {
		
			toast.error("Error during Facebook login. Please try again.");
			
		}
			
	};
	return (
		<>
		<AuthHeader currentPage="register"></AuthHeader>
		<div className="md:bg-background-color mm:bg-white ml:bg-white dark:bg-gray-900">
			<div className="flex min-h-screen w-[80%] mx-auto bg-white dark:bg-gray-800">
				{/* Left side - Image */}
				<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
					<div className="absolute inset-0 transform scale-125 lg:scale-100">
						<Image
							src={`/imgs/auth/circle.png`}
							alt="Abstract background"
							layout="fill"
							objectFit="cover"
							quality={100}
							priority
						/>
					</div>
				</div>

				{/* Right side - Form */}
				<div className="w-full lg:w-1/2 px-[42px] py-[103px] mm:py-7 mm:px-0 ml:py-7 ml:px-0 sm:px-[42px] sm:py-[103px] flex flex-col justify-between">
					<main className="flex-grow">
						<h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl dark:text-white">
							Tạo tài khoản của bạn
						</h1>

						<p className="text-muted-foreground mb-4 sm:mb-6 text-red-500 italic text-sm sm:text-base md:text-lg">
							Vui lòng không để trống các mục được đánh dấu *
						</p>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4 sm:space-y-6"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-600 dark:text-gray-300 text-base">
												Full Name <span className="text-red-600">*</span>
											</FormLabel>
											<div className="relative">
												<FormControl>
													<Input
														type="text"
														{...field}
														placeholder="Enter your full name"
														className={`bg-white dark:bg-gray-700 dark:text-white ${
															field.value && !form.formState.errors.name
																? "border-green-500"
																: form.formState.errors.name
																? "border-red-500"
																: "dark:border-gray-600"
														}`}
													/>
												</FormControl>

												{form.formState.errors.name && (
													<AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
												)}
											</div>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-600 dark:text-gray-300 text-base">
												Email <span className="text-red-600">*</span>
											</FormLabel>
											<div className="relative">
												<FormControl>
													<Input
														type="email"
														{...field}
														placeholder="Enter your email"
														className={`bg-white dark:bg-gray-700 dark:text-white ${
															field.value && !form.formState.errors.email
																? "border-green-500"
																: form.formState.errors.email || emailExists
																? "border-red-500"
																: "dark:border-gray-600"
														}`}
														onBlur={(e) => {
															field.onBlur();
															if (e.target.value) {
																checkEmailExists(e.target.value);
															}
														}}
													/>
												</FormControl>

												{form.formState.errors.email && (
													<AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
												)}
											</div>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-600 dark:text-gray-300 text-base">
												Password <span className="text-red-600">*</span>
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
													placeholder="Enter your password"
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
												Confirm Password <span className="text-red-600">*</span>
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
													placeholder="Enter your confirm password"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="agreeTerms"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													className="rounded-[3px] dark:border-gray-600"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="text-base text-black-text dark:text-gray-300">
													Agree to our{" "}
													<span className="underline">Terms of use</span> and{" "}
													<span className="underline">Privacy Policy</span>
													<span className="text-red-600">*</span>
												</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="subscribeNewsletter"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													className="rounded-[3px] dark:border-gray-600"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="text-base text-black-text dark:text-gray-300">
													Subscribe to our monthly newsletter
												</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<Button
									className="h-auto w-full sm:w-2/3 md:w-1/2 mx-auto block text-lg sm:text-xl md:text-2xl mt-8"
									disabled={
										!form.formState.isValid ||
										emailExists ||
										isSubmitting ||
										isRegistering
									}
									variant="custom"
									type="submit"
								>
									{isSubmitting ? (
										<BeatLoader color="#ffffff" size={8} />
									) : isRegistering ? (
										"Đang xử lý..."
									) : (
										"Đăng ký"
									)}
								</Button>
							</form>
						</Form>

						<p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 dark:text-gray-400">
							<Link
								href="/forgot-password"
								className="underline text-sm sm:text-base font-medium dark:text-gray-300"
							>
								Forgot your password?
							</Link>
						</p>

						<div className="mt-4 sm:mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white dark:bg-gray-800 text-base sm:text-lg md:text-xl dark:text-gray-300">
										Or sign up with
									</span>
								</div>
							</div>
							<div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
								<Button
									variant="custom_outlined"
									className="w-full sm:w-48 text-base sm:text-lg md:text-xl"
									onClick={handleLoginWithFacebook}
								>
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
									className="w-full sm:w-48 text-base sm:text-lg md:text-xl"
									onClick={handleLoginWithGoogle}
								>
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

						<Label className="text-center text-gray-500 dark:text-gray-400 font-light my-3 sm:my-5 text-xs sm:text-sm md:text-base block">
							Not a member? Get exclusive access to exhibitions and events, free
							admission every day, and much more.
						</Label>
					</main>
				</div>
				<ToastContainer />
			</div>
		</div>
		</>
	);
}
