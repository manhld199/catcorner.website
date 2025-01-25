"use client";

import UserSidebar from "@/partials/(user)/sidebar_nav";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full container mx-auto gap-4 relative z-0 px-4 md:px-0 dark:bg-black">
        <UserSidebar />
        {children}
      </div>
    </>
  );
}
