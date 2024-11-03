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
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LoadingScreen } from "@/components/(general)/loading/loading-screen";

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};
// Define the form schema using Zod
const formSchema = z.object({
	email: z.string().email({ message: "Email không hợp lệ" }),
	password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

export default function LoginPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
				email: "",
				password: "",
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (status === "authenticated" && session) {
			router.replace("/");
		}
	}, [status, session, router]);

	

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsSubmitting(true);
			setIsRegistering(true);

			const result = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error(result.error || "Đăng nhập thất bại. Vui lòng thử lại sau.");
				setIsRegistering(false);
				return;
			}

			router.push("/");
			router.refresh();
		} catch (error) {
			toast.error("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
			setIsRegistering(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleLoginWithGoogle = () => {
		signIn("google", { callbackUrl: "/" });
	};

	const handleLoginWithFacebook = () => {
		signIn("facebook", { callbackUrl: "/" });
	};

	return (
		<>
		<AuthHeader currentPage="login"></AuthHeader>
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
				<div className="w-full lg:w-1/2 px-[42px] py-[103px] mm:py-7 mm:px-0 ml:py-7 ml:px-0 sm:px-[42px] sm:py-[76px] flex flex-col justify-between">
					<main className="flex-grow">
						<h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl dark:text-white">
							Chào mừng bạn quay lại !
						</h1>

						<Label className="text-gray-500 dark:text-gray-400 font-light my-3 sm:my-5 sm:text-sm md:text-lg block">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore.
						</Label>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4 sm:space-y-6"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-600 dark:text-gray-300 text-base">
												Email
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
																: form.formState.errors.email
																? "border-red-500"
																: "dark:border-gray-600"
														}`}
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
												Password
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

								<Button
									className="h-auto w-full sm:w-2/3 md:w-1/2 mx-auto block text-lg sm:text-xl md:text-2xl mt-8"
									disabled={
										!form.formState.isValid || isSubmitting || isRegistering
									}
									variant="custom"
									type="submit"
								>
									{isSubmitting ? (
										<BeatLoader color="#ffffff" size={8} />
									) : isRegistering ? (
										"Đang xử lý..."
									) : (
										"Đăng nhập"
									)}
								</Button>
							</form>
						</Form>

						<p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 dark:text-gray-400">
							<Link
								href="/forgot-password"
								className="underline text-sm sm:text-base font-medium dark:text-gray-300"
							>
								Bạn quên mật khẩu ư ?
							</Link>
						</p>

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
