// import libs
import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

// import components
import { AdminTable } from "@/components";
import { Button } from "@/components/ui/button";
import columns from "./columns";

// import data
import { PAGE_DATA } from "@/data/admin";

// import utils
import { fetchDataNoCache } from "@/utils/functions/server";
import { ADMIN_COUPONS_URL } from "@/utils/constants/urls";

export default async function AdminGroupsPage() {
  const couponData = await fetchDataNoCache(ADMIN_COUPONS_URL);
  // console.log("couponData", couponData);

  return (
    <main className="w-full py-2 flex flex-col items gap-4">
      <section className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="ml-8 text-3xl font-bold text-gray-900 dark:text-gray-200 text-wrap">
              {PAGE_DATA["coupon"]}
            </h1>
          </div>
        </div>

        <Button
          variant="default"
          className="h-fit py-2 rounded-md flex flex-row gap-2"
          asChild>
          <Link href="/admin/coupons/add">
            <PlusIcon className="w-6 h-6" />
            <span>{PAGE_DATA["coupon-add"]}</span>
          </Link>
        </Button>
      </section>

      <AdminTable
        columns={columns}
        data={couponData.coupons ?? []}
        deleteUrl={ADMIN_COUPONS_URL}
      />
    </main>
  );
}
