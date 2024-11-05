"use client";
import { CustomerHeader } from "@/partials";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from 'next/navigation';
import { AUTH_URL } from "@/utils/constants/urls";

export default function Home() {
	const { data: session } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const token = searchParams?.get('token');
		if (token && !session) {
			const fetchUserAndSignIn = async () => {
				try {
					// Gọi API để lấy thông tin user
					const res = await fetch(`${AUTH_URL}/me`, {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + token
						}
					});

					const response = await res.json();

					if (res.ok && response.success && response.data) {
						const { user, refreshToken, expiresIn } = response.data;

						// Đăng nhập với NextAuth sử dụng thông tin user
						const result = await signIn("credentials", {
							token,
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
							refreshToken,
							expiresIn,
							redirect: false,

						});

						if (result?.error) {
							toast.error('Đăng nhập thất bại');
							return;
						}

						// Xóa token khỏi URL
						window.history.replaceState({}, '', '/');
						
						
					
					} else {
						throw new Error(response.message || 'Không thể lấy thông tin người dùng');
					}
				} catch (error) {
					console.error('Login error:', error);
					toast.error('Có lỗi xảy ra khi đăng nhập');
					router.push('/login');
				}
			};

			fetchUserAndSignIn();
		}
	}, [searchParams, session, router]);

	return (
		<div>
			<CustomerHeader />
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
				<div className="w-full h-full bg-slate-100 text-black dark:bg-zinc-900 dark:text-white">
					{session ? (
						<h1 className="text-2xl font-bold">
							Xin chào, {session.user?.name || 'Guest'}!
						</h1>
					) : (
						<h1 className="text-2xl font-bold">
							Xin chào, Khách!
						</h1>
					)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
