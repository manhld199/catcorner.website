import { ToogleThemeMode } from "@/components";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/5 h-screen bg-slate-500">
        <ToogleThemeMode />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}
