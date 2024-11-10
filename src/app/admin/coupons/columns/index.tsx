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
import { AdminColumnFilter, AdminColumnSort } from "@/components";
import ActionCell from "./action-cell";

// import data
import { COLUMN_NAMES } from "@/data/admin";
import { formatDateTimeStr } from "@/utils/functions/format";
import { COUPON_TYPES, COUNPON_MONEY_UNITS } from "@/data/filter";

interface IAdminCoupon {
  _id: string;
  coupon_name: string;
  coupon_description: string;
  coupon_type: string;
  coupon_condition: number;
  coupon_unit: string;
  coupon_value: number;
  coupon_max_value: number;
  coupon_stock_quantity: number;
  start_time: string;
  end_time: string;
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
}: IAdminTableHandler<IAdminCoupon>) => {
  const [sortState, setSortState] = useState<string>("none");

  useEffect(() => {
    if (sortState === "none") column.clearSorting();
    else if (sortState === "asc") column.toggleSorting(false);
    else if (sortState === "desc") column.toggleSorting(true);
  }, [column, sortState]);

  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const filterValue = table.getColumn(column.id)?.getFilterValue();
  const setFilterValue = table.getColumn(column.id)?.setFilterValue;

  useEffect(() => {
    if (type == "type") setFilterOptions(COUPON_TYPES);
    else if (type == "coupon-value") setFilterOptions(COUNPON_MONEY_UNITS);
  }, [type]);

  const isSortedOrFiltered = sortState !== "none" || filterValue !== undefined;

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

  if (
    [
      "name",
      "condition",
      "coupon-max-value",
      "stock-quantity",
      "start-time",
      "end-time",
    ].includes(type)
  )
    return (
      <AdminColumnSort
        isSortedOrFiltered={isSortedOrFiltered}
        label={getHeader() as string}
        setSortState={setSortState}
        sortState={sortState}
      />
    );
  else if (["type", "coupon-value"].includes(type))
    return (
      <AdminColumnFilter
        label={getHeader() as string}
        options={filterOptions}
        filterValue={filterValue}
        isSortedOrFiltered={isSortedOrFiltered}
        setFilterValue={setFilterValue}
      />
    );
  else return getHeader();
};

const CellHandler = ({ row, type }: IAdminTableHandler<IAdminCoupon>) => {
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
              {row?.original.coupon_name}
            </div>
          </Link>
        );
      case "type":
        return (
          <div className="min-w-[80px] w-full h-full text-sm textHidden3 ">
            <Badge>{row?.original.coupon_type}</Badge>
          </div>
        );
      case "condition":
        return (
          <div className="w-full h-full text-sm textHidden3 ">
            {row?.original.coupon_condition}
          </div>
        );
      case "coupon-value":
        return (
          <div className="w-full h-full text-sm textHidden3 ">
            {`${row?.original.coupon_value}${row?.original.coupon_unit}`}
          </div>
        );
      case "coupon-max-value":
        return (
          <div className="w-full h-full text-sm textHidden3 ">
            {`${row?.original.coupon_max_value}`}
          </div>
        );
      case "stock-quantity":
        return (
          <div className="w-full h-full text-sm textHidden3 ">
            {`${row?.original.coupon_stock_quantity}`}
          </div>
        );
      case "start-time":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {`${formatDateTimeStr(row?.original.start_time ?? "")}`}
          </div>
        );
      case "end-time":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {`${formatDateTimeStr(row?.original.end_time ?? "")}`}
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

const columns: ColumnDef<IAdminCoupon>[] = [
  {
    id: "_id",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="select" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="select" />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "column-name",
    accessorKey: "coupon_name",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="name" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-type",
    accessorKey: "coupon_type",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="type" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="type" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-condition",
    accessorKey: "coupon_condition",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="condition" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="condition" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-coupon-value",
    accessorKey: "coupon_value",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="coupon-value" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="coupon-value" />
    ),
    filterFn: (row, columnId, filterValue) => {
      const moneyUnit = row.original.coupon_unit;
      return moneyUnit === filterValue;
    },
    enableGlobalFilter: true,
  },
  {
    id: "column-coupon-max-value",
    accessorKey: "coupon_max_value",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="coupon-max-value" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="coupon-max-value" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-stock-quantity",
    accessorKey: "coupon_stock_quantity",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="stock-quantity" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="stock-quantity" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-start-time",
    accessorKey: "start_time",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="start-time" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="start-time" />
    ),
    sortingFn: "datetime",
  },
  {
    id: "column-end-time",
    accessorKey: "end_time",
    header: (props: HeaderContext<IAdminCoupon, unknown>) => (
      <HeaderHandler {...props} type="end-time" />
    ),
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="end-time" />
    ),
    sortingFn: "datetime",
  },
  {
    id: "actions",
    cell: (props: CellContext<IAdminCoupon, unknown>) => (
      <CellHandler {...props} type="action" />
    ),
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export default columns;
