import React from "react";

import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { SORT_NAMES } from "@/data/admin";

export default function DropdownSort({
  sortState,
  title,
  handleSort,
  sortType,
}: {
  sortState: string;
  title: string;
  handleSort: any;
  sortType?: string;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-fit m-auto gap-1 ${
            sortState != "none" ? "bg-teal-100 text-teal-600" : ""
          }`}>
          <h5 className="text-center">{title}</h5>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{SORT_NAMES["sort-label"]}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={sortState}
          onValueChange={(value) => {
            if (sortType) handleSort(sortType, value);
            else handleSort(value);
          }}>
          <DropdownMenuRadioItem className="capitalize" value="none">
            {SORT_NAMES["sort-none"]}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem className="capitalize" value="asc">
            {SORT_NAMES["sort-asc"]}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem className="capitalize" value="desc">
            {SORT_NAMES["sort-desc"]}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
