// import libs
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";
import Link from "next/link";

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

// import data
import { METHOD_NAMES } from "@/data/admin";
import { DIALOG_DATA } from "@/data/dialog";

// import utils
import { PUBLIC_ADMIN_BLOGS_URL } from "@/utils/constants/urls";
import { handleDelete } from "@/utils/functions/client";

interface IAdminBlog {
  _id: string;
  article_name: string;
  article_avt: string;
  article_author_name: string;
  article_published_date: string;
  article_tags: string[];
}

const ActionCell = ({ row }: { row: Row<IAdminBlog> | undefined }) => {
  const id = row?.original._id as string;
  const name = row?.original.article_name as string;
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState(
    `${DIALOG_DATA["content-general-delete-rows-1"]} '${name}' ${DIALOG_DATA["content-general-delete-confirm-3"]}`
  );
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
          <Link href={`/admin/blogs/${id}`} target="_blank">
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

                {!isDeleting && (
                  <Button
                    type="button"
                    variant="default"
                    onClick={async () => {
                      try {
                        setIsDeleting(true);
                        setDialogContent(
                          `${DIALOG_DATA["content-general-deleting"]} '${name}'`
                        );

                        const isSuccess: boolean = await handleDelete(
                          [id],
                          PUBLIC_ADMIN_BLOGS_URL
                        );

                        if (!isSuccess) {
                          setDialogContent(
                            DIALOG_DATA["content-general-delete-fail"]
                          );
                          setIsDeleting(false);
                          return;
                        }

                        // setIsDeleting(false);
                        setDialogContent(
                          `${DIALOG_DATA["content-general-delete-success-1"]} '${name}' ${DIALOG_DATA["content-general-delete-success-3"]}`
                        );
                        setTimeout(() => {
                          location.reload();
                        }, 3000);
                      } catch (err) {
                        setDialogContent(
                          `${DIALOG_DATA["content-general-delete-fail"]}: ${err}`
                        );
                        setIsDeleting(false);
                      }
                    }}>
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
