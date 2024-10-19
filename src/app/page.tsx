// import components
import { ToogleThemeMode } from "@/components";
import { CustomerHeader } from "@/partials";

export default function Home() {
  return (
    <div>
      <CustomerHeader></CustomerHeader>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full h-full bg-slate-100 text-black dark:bg-zinc-900 dark:text-white">
          hello
        </div>
      </div>
    </div>
  );
}
