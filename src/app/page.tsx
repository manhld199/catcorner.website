"use client";
import { CustomerHeader } from "@/partials";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<div>
			 <CustomerHeader></CustomerHeader>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<div className="w-full h-full bg-slate-100 text-black dark:bg-zinc-900 dark:text-white">
					hello
					{/*  test session  */}
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
		</div>
	);
}
