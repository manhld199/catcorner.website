import React from "react";

import FormBody from "../form-body";
import { PAGE_DATA } from "@/data/admin";

export default async function AdminCategoryAddPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["category-add"]}</h1>
      <FormBody data={[]} />
    </div>
  );
}
