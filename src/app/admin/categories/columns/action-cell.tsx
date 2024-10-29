// import libs
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";

// import components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

// import utils
// import { IAdminCategory } from "../../../utils/type";
// import { handleDeleteOne } from "../../../utils/fetch";
import { METHOD_NAMES } from "@/data/admin";

import { DIALOG_DATA } from "@/data/dialog";

interface IAdminCategory {
  _id: string;
  category_name: string;
  category_img: string;
  category_products_count: number;
}

const ActionCell = ({ row }: { row: Row<IAdminCategory> | undefined }) => {
  const id = row?.original._id;
  const name = row?.original.category_name;
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(
    `Bạn có chắc muốn xóa ${name} hay không?`
  );
  const defaultDialogContent = `Bạn có chắc muốn xóa ${name} hay không?`;
  const deleteUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/location/delete`;
  // console.log("deleteUrl", deleteUrl);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{METHOD_NAMES["method-label"]}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/categories/${id}`} target="_blank">
            {METHOD_NAMES["edit-btn"]}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="w-full text-red-500">
                {METHOD_NAMES["delete-btn"]}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{DIALOG_DATA["delete-btn"]}</DialogTitle>
                <DialogDescription>{dialogContent}</DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setOpen(false)}>
                  {DIALOG_DATA["close-btn"]}
                </Button>

                {dialogContent === defaultDialogContent && (
                  <Button
                    type="button"
                    variant="default"
                    onClick={
                      () => {}
                      //   handleDeleteOne({ id, name, setDialogContent, setOpen, tDialog, deleteUrl })
                    }>
                    {DIALOG_DATA["delete-btn"]}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
