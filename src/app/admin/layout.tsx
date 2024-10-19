import { ToogleThemeMode } from "@/components";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-2 bg-bg-1 dark:bg-zinc-800">
      <div className="w-1/5 h-screen bg-slate-500">
        <ToogleThemeMode />
      </div>
      <main className="mx-auto w-full h-fit">{children}</main>
    </div>
  );
}
