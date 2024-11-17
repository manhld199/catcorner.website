import { CustomerFooter, CustomerHeader } from "@/partials";
import { BreadCrumb, ScrollUp } from "@/components";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomerHeader />
      {/* <BreadCrumb /> */}
      <main className="my-24 mx-auto w-4/5 max-w-[1152px] min-h-[80vh]">
        {children}
      </main>
      <ScrollUp />
      <CustomerFooter />
    </>
  );
}
