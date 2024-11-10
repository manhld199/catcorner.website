// import libs
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
import { SORT_NAMES } from "@/data/admin";

export default function RenderColumnSort({
  label,
  isSortedOrFiltered,
  sortState,
  setSortState,
}: {
  label: string;
  isSortedOrFiltered: boolean;
  sortState: string;
  setSortState: Dispatch<SetStateAction<string>>;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`min-w-20 ${
            isSortedOrFiltered ? "bg-teal-100 text-teal-600" : ""
          }`}>
          {label}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{SORT_NAMES["sort-label"]}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={sortState} onValueChange={setSortState}>
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
