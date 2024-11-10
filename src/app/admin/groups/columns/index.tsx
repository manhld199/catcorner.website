"use client";

// import libs
import { CldImage } from "next-cloudinary";
import { ArrowUpDown, Filter } from "lucide-react";
import {
  CellContext,
  Column,
  ColumnDef,
  HeaderContext,
  Row,
  Table,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AdminColumnSort } from "@/components";
import ActionCell from "./action-cell";

// import data
import { COLUMN_NAMES, SORT_NAMES } from "@/data/admin";

interface IAdminGroup {
  _id: string;
  group_name: string;
  group_type: string;
  group_items: string[];
}

interface IAdminTableHandler<T> {
  table: Table<T>;
  column: Column<T, unknown>;
  row?: Row<T>;
  type: string;
}

const HeaderHandler = ({
  table,
  column,
  type,
}: IAdminTableHandler<IAdminGroup>) => {
  const [sortState, setSortState] = useState<string>("none");
  const isSortedOrFiltered = sortState !== "none";

  useEffect(() => {
    if (sortState === "none") column.clearSorting();
    else if (sortState === "asc") column.toggleSorting(false);
    else if (sortState === "desc") column.toggleSorting(true);
  }, [column, sortState]);

  const filterValue = table.getColumn(column.id)?.getFilterValue();
  const setFilterValue = table.getColumn(column.id)?.setFilterValue;

  const getHeader = () => {
    switch (type) {
      case "select":
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate") ||
              false
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      default:
        return (COLUMN_NAMES as any)[column.id] ?? "";
    }
  };

  if (["name", "items-count"].includes(type))
    return (
      <AdminColumnSort
        isSortedOrFiltered={isSortedOrFiltered}
        label={getHeader() as string}
        setSortState={setSortState}
        sortState={sortState}
      />
    );
  else return getHeader();
};

const CellHandler = ({ row, type }: IAdminTableHandler<IAdminGroup>) => {
  const getCell = () => {
    switch (type) {
      case "select":
        return (
          <Checkbox
            checked={row?.getIsSelected()}
            onCheckedChange={(value) => row?.toggleSelected(!!value)}
            aria-label="Select row"
          />
        );
      case "name":
        return (
          <Link
            href={`/admin/groups/${row?.original._id}`}
            className="w-full min-w-40 h-full text-sm line-clamp-3">
            <div className="w-full h-full text-sm textHidden3 ">
              {row?.original.group_name}
            </div>
          </Link>
        );
      case "type":
        return (
          <div className="w-full h-full text-sm textHidden3 ">
            <Badge>{row?.original.group_type}</Badge>
          </div>
        );
      case "items-count":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {row?.original.group_items.length ?? 0}
          </div>
        );
      case "action":
        return <ActionCell row={row} />;
      default:
        return "";
    }
  };

  return getCell();
};

const columns: ColumnDef<IAdminGroup>[] = [
  {
    id: "_id",
    header: (props: HeaderContext<IAdminGroup, unknown>) => (
      <HeaderHandler {...props} type="select" />
    ),
    cell: (props: CellContext<IAdminGroup, unknown>) => (
      <CellHandler {...props} type="select" />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "column-name",
    accessorKey: "group_name",
    header: (props: HeaderContext<IAdminGroup, unknown>) => (
      <HeaderHandler {...props} type="name" />
    ),
    cell: (props: CellContext<IAdminGroup, unknown>) => (
      <CellHandler {...props} type="name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-type",
    accessorKey: "group_type",
    header: (props: HeaderContext<IAdminGroup, unknown>) => (
      <HeaderHandler {...props} type="type" />
    ),
    cell: (props: CellContext<IAdminGroup, unknown>) => (
      <CellHandler {...props} type="type" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-items-count",
    accessorKey: "group_items",
    header: (props: HeaderContext<IAdminGroup, unknown>) => (
      <HeaderHandler {...props} type="items-count" />
    ),
    cell: (props: CellContext<IAdminGroup, unknown>) => (
      <CellHandler {...props} type="items-count" />
    ),
    sortingFn: (rowA, rowB, columnId): number => {
      if (rowA.original.group_items.length < rowB.original.group_items.length)
        return -1;
      else if (
        rowA.original.group_items.length > rowB.original.group_items.length
      )
        return 1;
      return 0;
    },
    enableGlobalFilter: true,
  },
  {
    id: "actions",
    cell: (props: CellContext<IAdminGroup, unknown>) => (
      <CellHandler {...props} type="action" />
    ),
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export default columns;
