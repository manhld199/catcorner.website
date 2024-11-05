// import libs
import React from "react";

// import components
import FormBody from "../form-body";

// import data
import { PAGE_DATA } from "@/data/admin";

// import utils
import { fetchDataNoCache } from "@/utils/functions/server";
import { ADMIN_BLOGS_URL } from "@/utils/constants/urls";

export default async function AdminBlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const blogData = await fetchDataNoCache(`${ADMIN_BLOGS_URL}/${id}`);
  //   console.log("daaaaaaaaaaaaa", data);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["blog-detail"]}</h1>
      <FormBody data={blogData.article ?? []} id={id} />
    </div>
  );
}
