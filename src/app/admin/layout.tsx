// import libs
import React from "react";

// import components
import { ToogleThemeMode } from "@/components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-2 bg-bg-1 dark:bg-zinc-800">
      <div className="mm:hidden lg:block md:w-1/5 h-screen bg-slate-500">
        <ToogleThemeMode />
      </div>

      <div className="p-2 mx-auto w-full h-fit">{children}</div>
    </div>
  );
}
