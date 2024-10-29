import React from "react";

import FormBody from "../form-body";
import { PAGE_DATA } from "@/data/admin";
import { fetchDataNoCache } from "@/utils/functions/server";
import { ADMIN_CATEGORIES_URL } from "@/utils/constants/urls";

export default async function AdminBlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const categoryData = await fetchDataNoCache(`${ADMIN_CATEGORIES_URL}/${id}`);
  // console.log("daaaaaaaaaaaaa", categoryData);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["category-detail"]}</h1>
      <FormBody data={categoryData.category ?? []} id={id} />
    </div>
  );
}
