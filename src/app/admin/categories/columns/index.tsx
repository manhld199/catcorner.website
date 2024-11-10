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
import { AdminColumnSort } from "@/components";
import ActionCell from "./action-cell";

// import data
import { COLUMN_NAMES, SORT_NAMES } from "@/data/admin";

interface IAdminCategory {
  _id: string;
  category_name: string;
  category_img: string;
  category_products_count: number;
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
}: IAdminTableHandler<IAdminCategory>) => {
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

  if (["name", "products-count"].includes(type))
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

const CellHandler = ({ row, type }: IAdminTableHandler<IAdminCategory>) => {
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
      case "img":
        return (
          <Link
            href={`/admin/categories/${row?.original._id}`}
            className="w-fit h-fit aspect-square">
            <div className="relative w-20 h-20 aspect-square">
              <CldImage
                className="object-cover aspect-square"
                src={row?.original.category_img as string}
                alt={row?.original.category_name as string}
                fill
              />
            </div>
          </Link>
        );
      case "name":
        return (
          <Link
            href={`/admin/categories/${row?.original._id}`}
            className="w-full min-w-40 h-full text-sm line-clamp-3">
            <div className="w-full h-full text-sm textHidden3 ">
              {row?.original.category_name}
            </div>
          </Link>
        );
      case "products-count":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {row?.original.category_products_count ?? 0}
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

const columns: ColumnDef<IAdminCategory>[] = [
  {
    id: "_id",
    header: (props: HeaderContext<IAdminCategory, unknown>) => (
      <HeaderHandler {...props} type="select" />
    ),
    cell: (props: CellContext<IAdminCategory, unknown>) => (
      <CellHandler {...props} type="select" />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "column-img",
    accessorKey: "category_img",
    header: (props: HeaderContext<IAdminCategory, unknown>) => (
      <HeaderHandler {...props} type="img" />
    ),
    cell: (props: CellContext<IAdminCategory, unknown>) => (
      <CellHandler {...props} type="img" />
    ),
    enableGlobalFilter: false,
  },
  {
    id: "column-name",
    accessorKey: "category_name",
    header: (props: HeaderContext<IAdminCategory, unknown>) => (
      <HeaderHandler {...props} type="name" />
    ),
    cell: (props: CellContext<IAdminCategory, unknown>) => (
      <CellHandler {...props} type="name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-products-count",
    accessorKey: "category_products_count",
    header: (props: HeaderContext<IAdminCategory, unknown>) => (
      <HeaderHandler {...props} type="products-count" />
    ),
    cell: (props: CellContext<IAdminCategory, unknown>) => (
      <CellHandler {...props} type="products-count" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "actions",
    cell: (props: CellContext<IAdminCategory, unknown>) => (
      <CellHandler {...props} type="action" />
    ),
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export default columns;
