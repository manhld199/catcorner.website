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
      <main className="ml:my-36 md:my-32 lg:my-24 mx-auto md:w-[93%] lg:w-4/5 max-w-[1152px] min-h-[80vh]">
        {children}
      </main>
      <ScrollUp />
      <CustomerFooter />
    </>
  );
}
