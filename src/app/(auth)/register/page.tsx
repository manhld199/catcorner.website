"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { PasswordInput } from "@/partials/(auth)/PasswordInput";
import { useState, useCallback } from "react";

import BeatLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};

const formSchema = z
	.object({
		name: z.string().refine((value) => value.trim().length >= 2, {
			message: "Full Name must be at least 2 characters",
		}),
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		passwordConfirmation: z.string(),
		agreeTerms: z.boolean().refine((val) => val === true, {
			message: "You must agree to the terms and conditions",
		}),
		subscribeNewsletter: z.boolean().optional(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
		path: ["passwordConfirmation"],
	});

export default function SignUpPage() {
	const [emailExists, setEmailExists] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state này

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
			try {
				const response = await fetch(
					`http://localhost:8080/api/auth/check-email?email=${email}`,
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
						message: "This email is already registered",
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

			const apiPayload = {
				email: values.email,
				password: values.password,
				user_name: values.name,
			};
			const response = await fetch("http://localhost:8080/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(apiPayload),
			});
			const data = await response.json();

			if (!response.ok) {
				console.log("data", data);
				// If the response is not ok, throw an error with the message from the server
				throw new Error(data.message || "Registration failed");
			}

			console.log("Registration successful", data);
			router.push(
				`/register/verify-email?email=${encodeURIComponent(values.email)}`
			);

			// Handle successful registration (e.g., redirect to login page or show success message)
		} catch (error) {
			console.error("Registration failed", error);
			// Handle registration error (e.g., show error message to user)
		} finally {
			setIsSubmitting(false);
		}
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

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Full Name <span className="text-red-600">*</span>
										</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													{...field}
													type="text"
													className={
														field.value && !form.formState.errors.name
															? "border-green-500"
															: form.formState.errors.name
															? "border-red-500"
															: ""
													}
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
										<FormLabel>
											Email <span className="text-red-600">*</span>
										</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													{...field}
													type="email"
													className={
														field.value && !form.formState.errors.email
															? "border-green-500"
															: form.formState.errors.email || emailExists
															? "border-red-500"
															: ""
													}
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
										<FormLabel>
											Password <span className="text-red-600">*</span>
										</FormLabel>
										<FormControl>
											<PasswordInput
												{...field}
												className={
													field.value && !form.formState.errors.password
														? "border-green-500"
														: form.formState.errors.password
														? "border-red-500"
														: ""
												}
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
										<FormLabel>
											Confirm Password <span className="text-red-600">*</span>
										</FormLabel>
										<FormControl>
											<PasswordInput
												{...field}
												className={
													field.value &&
													!form.formState.errors.passwordConfirmation
														? "border-green-500"
														: form.formState.errors.passwordConfirmation
														? "border-red-500"
														: ""
												}
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
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>
												Agree to our Terms of use and Privacy Policy{" "}
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
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Subscribe to our monthly newsletter</FormLabel>
										</div>
									</FormItem>
								)}
							/>

							<Button
								className="w-1/2 mx-auto block"
								disabled={
									!form.formState.isValid || emailExists || isSubmitting
								}
								variant="custom"
								type="submit"
							>
								{isSubmitting ? (
									<BeatLoader color="#ffffff" size={8} />
								) : (
									"Sign up"
								)}
							</Button>
						</form>
					</Form>

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
