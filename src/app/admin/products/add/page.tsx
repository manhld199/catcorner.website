import React from "react";

import FormBody from "../form-body";
import { PAGE_DATA } from "@/data/admin";

export default function AdminProductAddPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["product-add"]}</h1>
      <FormBody data={[]} />
    </div>
  );
}
