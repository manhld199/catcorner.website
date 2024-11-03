"use client";
import { CustomerHeader } from "@/partials";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
	const { data: session } = useSession();
	const [showWelcome, setShowWelcome] = useState(true);

	useEffect(() => {
		if (session && showWelcome) {
			toast.success(`Chào mừng ${session.user?.name || 'bạn'} đã quay trở lại!`, {
				position: "top-right",
				autoClose: 5000,
			});
			setShowWelcome(false);
		}
	}, [session, showWelcome]);

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
