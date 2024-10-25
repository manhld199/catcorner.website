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
      <BreadCrumb />
      {children}
      <ScrollUp />
      <CustomerFooter />
    </>
  );
}
