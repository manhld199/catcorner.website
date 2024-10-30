"use client";

// import libs
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
import { CldImage } from "next-cloudinary";

// import components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ActionCell from "./action-cell";
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// import data
import { COLUMN_NAMES, SORT_NAMES } from "@/data/admin";

interface IAdminProduct {
  _id: string;
  product_img: string;
  product_name: string;
  category: string;
  product_variants: [{ variant_price: number; variant_name: string }];
  product_rating: {
    rating_point: number;
    rating_count: number;
  };
}

interface IAdminTableHandler<T> {
  table: Table<T>;
  column: Column<T, unknown>;
  row?: Row<T>;
  type: string;
}

// import data
// import { datacategory } from "@/data/data-place";

const HeaderHandler = ({
  table,
  column,
  type,
}: IAdminTableHandler<IAdminProduct>) => {
  const [sortState, setSortState] = useState<string>("none");
  const isSortedOrFiltered = sortState !== "none";

  useEffect(() => {
    if (sortState === "none") column.clearSorting();
    else if (sortState === "asc") column.toggleSorting(false);
    else if (sortState === "desc") column.toggleSorting(true);
  }, [column, sortState]);

  const filterValue = table.getColumn(column.id)?.getFilterValue();
  const setFilterValue = table.getColumn(column.id)?.setFilterValue;

  const renderColumnFilter = (label: string, options: any[], value: string) => (
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
          <DropdownMenuRadioGroup value={value} onValueChange={setFilterValue}>
            <DropdownMenuRadioItem value="">Không</DropdownMenuRadioItem>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const renderColumnSort = (label: string) => (
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

  if (["name", "price", "rating"].includes(type))
    return renderColumnSort(getHeader() as string);
  else return getHeader();
};

const CellHandler = ({ row, type }: IAdminTableHandler<IAdminProduct>) => {
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
            href={`/admin/products/${row?.original._id}`}
            className="w-fit h-fit aspect-square">
            <div className="relative w-20 h-20 aspect-square">
              <CldImage
                className="object-cover aspect-square"
                src={row?.original.product_img as string}
                alt={row?.original.product_name as string}
                fill
              />
            </div>
          </Link>
        );
      case "name":
        return (
          <Link
            href={`/admin/products/${row?.original._id}`}
            className="w-full min-w-40 h-full text-sm line-clamp-3">
            <div className="w-full h-full text-sm textHidden3 ">
              {row?.original.product_name}
            </div>
          </Link>
        );
      case "category":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            <Badge>{row?.original.category}</Badge>
          </div>
        );

      case "variants":
        return (
          <div className="text-sm min-w-40 flex flex-row flex-wrap gap-1">
            {row?.original.product_variants.map((variant, index) => (
              <Badge key={`variant name ${index}`}>
                {variant.variant_name}
              </Badge>
            ))}
          </div>
        );
      case "price":
        return (
          <div className="text-sm">
            {row?.original.product_variants
              .map((variant) => variant.variant_price)
              .join(", ")}
          </div>
        );
      case "rating":
        return (
          <div className="text-sm">
            {`${row?.original.product_rating.rating_point} / ${row?.original.product_rating.rating_count} lượt`}
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

const columns: ColumnDef<IAdminProduct>[] = [
  {
    id: "_id",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="select" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="select" />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "column-img",
    accessorKey: "product_img",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="img" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="img" />
    ),
    enableGlobalFilter: false,
  },
  {
    id: "column-name",
    accessorKey: "product_name",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="name" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-category",
    accessorKey: "product_category",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="category" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="category" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-variants",
    accessorKey: "product_variants",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="variants" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="variants" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-price",
    accessorKey: "product_price",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="price" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="price" />
    ),
    enableGlobalFilter: true,
    sortingFn: (rowA, rowB, columnId): number => {
      const priceA = rowA.original.product_variants
        .map((variant) => variant.variant_price)
        .join(", ");
      const priceB = rowB.original.product_variants
        .map((variant) => variant.variant_price)
        .join(", ");

      if (priceA < priceB) return -1;
      else if (priceA > priceB) return 1;
      return 0;
    },
    filterFn: (row, columnId, filterValue) => {
      const prices: number[] = (row.getValue("column-variants") as any).map(
        (variant: any) => variant.variant_price
      );
      // console.log("pricespricesprices", prices);
      const [min, max] = filterValue;

      if (min == max) return prices.some((price) => price == min);
      return prices.some(
        (price) => price >= (min || 0) && price <= (max || Infinity)
      );
    },
  },
  {
    id: "column-rating",
    accessorKey: "product_rating",
    header: (props: HeaderContext<IAdminProduct, unknown>) => (
      <HeaderHandler {...props} type="rating" />
    ),
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="rating" />
    ),
    enableGlobalFilter: true,
    sortingFn: (rowA, rowB, columnId): number => {
      // console.log("rowArowArowA: ", rowA);
      // console.log("rowBrowBrowB: ", rowB);
      // console.log("columnID: ", columnId);

      if (
        rowA.original.product_rating.rating_point *
          rowA.original.product_rating.rating_count <
        rowB.original.product_rating.rating_point *
          rowB.original.product_rating.rating_count
      )
        return -1;
      else if (
        rowA.original.product_rating.rating_point *
          rowA.original.product_rating.rating_count >
        rowB.original.product_rating.rating_point *
          rowB.original.product_rating.rating_count
      )
        return 1;
      return 0;
    },
  },
  {
    id: "actions",
    cell: (props: CellContext<IAdminProduct, unknown>) => (
      <CellHandler {...props} type="action" />
    ),
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export default columns;
