import React from "react";

import FormBody from "../form-body";
import { PAGE_DATA } from "@/data/admin";
import { fetchDataNoCache } from "@/utils/functions/server";
import {
  ADMIN_CATEGORIES_URL,
  ADMIN_PRODUCTS_URL,
} from "@/utils/constants/urls";

export default async function AdminProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const productData = await fetchDataNoCache(`${ADMIN_PRODUCTS_URL}/${id}`);
  const categoriesData = await fetchDataNoCache(ADMIN_CATEGORIES_URL);
  //   console.log("daaaaaaaaaaaaa", data);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["product-detail"]}</h1>
      <FormBody
        data={productData.product ?? []}
        categoriesData={categoriesData.categories}
        id={id}
      />
    </div>
  );
}
