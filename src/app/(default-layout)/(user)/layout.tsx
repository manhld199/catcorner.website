"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserSidebar from "@/partials/(user)/sidebar_nav";

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.accessToken) {
      const currentPath = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      router.push(`/login?from=${currentPath}`);
    }
  }, [session, router]);

  if (!session?.user?.accessToken) return null;

  return (
    <div className="flex flex-col md:flex-row w-full container mx-auto gap-4 relative z-0 px-4 md:px-0 dark:bg-black">
      <UserSidebar />
      {children}
    </div>
  );
}
