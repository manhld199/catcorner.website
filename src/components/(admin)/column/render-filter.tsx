// import libs
import { ArrowUpDown, Filter } from "lucide-react";
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

export default function RenderColumnFilter({
  label,
  options,
  filterValue,
  isSortedOrFiltered,
  setFilterValue,
}: {
  label: string;
  options: any[];
  isSortedOrFiltered: boolean;
  filterValue: any;
  setFilterValue: any;
}) {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`min-w-20 ${
              isSortedOrFiltered ? "bg-teal-100 text-teal-600" : ""
            }`}>
            {label}
            <Filter className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Lọc</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filterValue}
            onValueChange={setFilterValue}>
            <DropdownMenuRadioItem value={undefined as any}>
              Không
            </DropdownMenuRadioItem>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
