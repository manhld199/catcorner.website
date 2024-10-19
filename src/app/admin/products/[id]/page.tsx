import React from "react";

import FormBody from "../form-body";
import { PAGE_DATA } from "@/data/admin";
import { fetchData } from "@/utils/functions/server";
import { GET_PRODUCTS_URL } from "@/utils/constants/urls";

export default async function AdminProductDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await fetchData(`${GET_PRODUCTS_URL}/${id}`);
  //   console.log("daaaaaaaaaaaaa", data);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["product-detail"]}</h1>
      <FormBody data={data.product ?? []} />
    </div>
  );
}
