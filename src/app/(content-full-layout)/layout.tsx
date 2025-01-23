import { CustomerFooter, CustomerHeader } from "@/partials";
import { BreadCrumb, ScrollUp } from "@/components";

export default function ContentFullLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomerHeader />
      {/* <BreadCrumb /> */}
      <main className="lg:mt-[72px] md:mt-[67.5px] ml:mt-[99px] mx-auto max-w-[1440px] min-h-[80vh]">
        {children}
      </main>
      <ScrollUp />
      <CustomerFooter />
    </>
  );
}
