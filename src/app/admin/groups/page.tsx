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
import { ADMIN_GROUPS_URL } from "@/utils/constants/urls";

export default async function AdminGroupsPage() {
  const groupData = await fetchDataNoCache(ADMIN_GROUPS_URL);
  // console.log("groupData", groupData);

  return (
    <main className="w-full py-2 flex flex-col items gap-4">
      <section className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 text-wrap">
              {PAGE_DATA["group"]}
            </h1>
          </div>
        </div>

        <Button
          variant="default"
          className="h-fit py-2 rounded-md flex flex-row gap-2"
          asChild>
          <Link href="/admin/groups/add">
            <PlusIcon className="w-6 h-6" />
            <span>{PAGE_DATA["group-add"]}</span>
          </Link>
        </Button>
      </section>

      <AdminTable
        columns={columns}
        data={groupData.groups ?? []}
        deleteUrl={ADMIN_GROUPS_URL}
      />
    </main>
  );
}
