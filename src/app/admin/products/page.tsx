import { AdminTable } from "@/components";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import columns from "./columns";

import { PAGE_DATA } from "@/data/admin";

import { fetchDataNoCache } from "@/utils/functions/server";
import { ADMIN_PRODUCTS_URL } from "@/utils/constants/urls";

export default async function AdminProductPAge() {
  // console.log("ADMIN_ALL_PRODUCTS_URL", ADMIN_PRODUCTS_URL);
  const productsData = await fetchDataNoCache(ADMIN_PRODUCTS_URL);
  // console.log("daaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);

  return (
    <main className="w-full py-2 flex flex-col items gap-4">
      <section className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 text-wrap">
              {PAGE_DATA["product"]}
            </h1>
          </div>
        </div>

        <Button
          variant="default"
          // color="secondary"
          className="h-fit py-2 rounded-md"
          //   startIcon={<PlusIcon className="w-6 h-6" />}
        >
          <Link href="/admin/products/add">{PAGE_DATA["product-add"]}</Link>
        </Button>
      </section>

      <AdminTable
        columns={columns}
        data={productsData.products ?? []}
        deleteUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/products/delete`}
        pageName={"products"}
      />
    </main>
  );
}
