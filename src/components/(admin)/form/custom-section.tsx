"use client";

import { ReactNode } from "react";

const CustomSection = ({
  title,
  children,
  required = false,
}: {
  title: string;
  children: ReactNode;
  required?: boolean;
}) => {
  return (
    <section className="w-full dark:border-zinc-800 h-fit mxs:p-2 md:p-4 border-[1px] rounded-2xl space-y-4 bg-white dark:bg-zinc-900">
      <div className="border-b-[1px] pb-2">
        <h4 className="w-full text-center dark:text-zinc-100 font-bold text-xl">
          {required && <span className="text-red-500">* </span>}
          {title}
        </h4>
      </div>
      {children}
    </section>
  );
};

export default CustomSection;
