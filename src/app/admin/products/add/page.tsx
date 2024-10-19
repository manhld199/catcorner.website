import React from "react";

import FormBody from "../form-body";
import { PAGE_DATA } from "@/data/admin";
import { fetchData } from "@/utils/functions/server";
import { GET_CATEGORIES_URL } from "@/utils/constants/urls";

export default async function AdminProductAddPage() {
  const categoriesData = await fetchData(GET_CATEGORIES_URL);
  // console.log("categoriesData", categoriesData);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["product-add"]}</h1>
      <FormBody data={[]} categoriesData={categoriesData.categories} />
    </div>
  );
}
