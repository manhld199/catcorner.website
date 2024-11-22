// import libs
import React from "react";

// import components
import { ToogleThemeMode } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSideBar } from "@/partials";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSideBar />
      <main className="p-2 mx-auto w-full h-fit">
        <SidebarTrigger className="absolute top-4 bg-white rounded-full hover:bg-white hover:shadow-md" />
        {children}
      </main>
    </SidebarProvider>
  );
}
