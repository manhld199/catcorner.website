// import libs
import React from "react";

// import components
import FormBody from "../form-body";

// import data
import { PAGE_DATA } from "@/data/admin";

// import utils
import {
  ADMIN_GROUPS_URL,
  ADMIN_PRODUCTS_URL,
  ADMIN_USERS_URL,
} from "@/utils/constants/urls";
import { fetchData, fetchDataNoCache } from "@/utils/functions/server";

export default async function AdminGroupAddPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const groupData = await fetchDataNoCache(`${ADMIN_GROUPS_URL}/${id}`);

  const productData = await fetchData(ADMIN_PRODUCTS_URL);
  const userData = await fetchData(ADMIN_USERS_URL);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["group-add"]}</h1>
      <FormBody
        data={groupData.group ?? []}
        productData={productData.products}
        userData={userData.users}
        id={id}
      />
    </div>
  );
}
