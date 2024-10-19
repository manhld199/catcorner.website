"use client";

// import libs
import * as React from "react";
import { ChevronDown, ListFilter, Trash2 } from "lucide-react";

// import components
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  // DropdownMenuRadioGroup,
  // DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import {
//   LocationSelect,
//   SelectDialog,
//   // VNLocationSelector
// } from "@/components";

// import { Range } from "react-range";
import { Input } from "@/components/ui/input";
import {
  ColumnFiltersState,
  RowSelectionState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
import { COLUMN_NAMES, FILTER_NAMES, FILTER_PRICES } from "@/data/admin";
import { DIALOG_DATA } from "@/data/dialog";
import { normalizeVietnameseStr } from "@/utils/functions/format";

// import data
// import { dataCategories as locaionCategories } from "@/data/data-place";
// import { CATEGORIES_EVENT_DATA as eventCategories } from "@/data/data-event";
// import { CATEGORIES_NEWS_DATA as newsCategories } from "@/data/data-news";

// import utils
// import { IAdminTableHeader } from "../../utils/type";
// import { handleDeleteMul } from "../../utils/fetch";
// import { filterPrices } from "../../utils/const";

interface IAdminTableHeader<TData> {
  table: Table<TData>;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  deleteUrl: string;
  pageName: string;
}

function DataTableHeader<T>({
  table,
  rowSelection,
  setRowSelection,
  columnFilters,
  setColumnFilters,
  columnVisibility,
  // setColumnVisibility,
  deleteUrl,
  pageName,
}: IAdminTableHeader<T>) {
  const [rowSelectCount, setRowSelectCount] = React.useState(0);
  React.useEffect(() => {
    // console.log("Object.keys(rowSelection).length", Object.keys(rowSelection).length);
    setRowSelectCount(Object.keys(rowSelection).length);
  }, [rowSelection]);

  // filter
  const [filterState, setFilterState] = React.useState({
    address: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    priceRange: [undefined, undefined] as any,
    categories: [""],
  });

  const handleFilter = React.useCallback(() => {
    const newColumnFilters = [...columnFilters];

    // filter address
    if (filterState.address.province !== "") {
      const addressFilter = { id: "column-address", value: filterState.address };
      const existingAddressFilterIndex = newColumnFilters.findIndex(
        (filter) => filter.id === "column-address"
      );

      if (existingAddressFilterIndex !== -1)
        newColumnFilters[existingAddressFilterIndex] = addressFilter;
      else newColumnFilters.push(addressFilter);
    }

    // filter price
    if (filterState.priceRange[0] != undefined && filterState.priceRange[1] != undefined) {
      const priceFilter = { id: "column-price", value: filterState.priceRange };
      const existingPriceFilterIndex = newColumnFilters.findIndex(
        (filter) => filter.id === "column-price"
      );
      if (existingPriceFilterIndex !== -1) newColumnFilters[existingPriceFilterIndex] = priceFilter;
      else newColumnFilters.push(priceFilter);
    }

    // filter category
    if (filterState.categories[0] != "") {
      const categoriesFilter = { id: "column-categories", value: filterState.categories };
      const existingCategoriesFilterIndex = newColumnFilters.findIndex(
        (filter) => filter.id === "column-categories"
      );

      if (existingCategoriesFilterIndex !== -1)
        newColumnFilters[existingCategoriesFilterIndex] = categoriesFilter;
      else newColumnFilters.push(categoriesFilter);
    }

    // Only update if the filters have changed
    if (JSON.stringify(columnFilters) !== JSON.stringify(newColumnFilters))
      setColumnFilters(newColumnFilters);
  }, [filterState, columnFilters, setColumnFilters]);

  const handleResetFilter = () => {
    // Reset filter state to initial values
    setFilterState({
      address: {
        province: "",
        district: "",
        ward: "",
        street: "",
      },
      priceRange: [undefined, undefined],
      categories: [""],
    });

    // Clear all filters
    setColumnFilters([]);
  };

  // delete
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [deleteDialogContent, setDeleteDialogContent] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  return (
    <>
      <div className="flex mm:flex-row mxs:flex-col mxs:gap-2 justify-between items-center">
        {/* search */}
        <Input
          placeholder="Tìm gì đó..."
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="md:max-w-xs ml:max-w-[30%] mm:max-w-[40%] dark:bg-zinc-700"
        />

        <div className="flex flex-row gap-2 mxs:w-full mxs:justify-end">
          {/* delete btn */}
          {deleteUrl != "" && rowSelectCount != 0 && (
            <Dialog open={openDeletePopup} onOpenChange={setOpenDeletePopup}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className={
                    !rowSelection
                      ? "hidden"
                      : Object.keys(rowSelection)?.length == 0
                      ? "hidden"
                      : "mxs:hidden ml:flex"
                  }
                >
                  <Trash2 className="h-4 w-4" /> {DIALOG_DATA["delete-btn"]} ({rowSelectCount})
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{DIALOG_DATA["title-general-delete"]}</DialogTitle>
                  <DialogDescription>
                    {deleteDialogContent == ""
                      ? DIALOG_DATA["content-general-delete-rows-1"] +
                        " " +
                        rowSelectCount +
                        " " +
                        DIALOG_DATA["content-general-delete-confirm-2"]
                      : deleteDialogContent}
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-row !justify-between">
                  <Button type="button" variant="default" onClick={() => setOpenDeletePopup(false)}>
                    {DIALOG_DATA["close-btn"]}
                  </Button>

                  {isDeleting == false && (
                    <Button
                      type="button"
                      onClick={
                        () => {}
                        // handleDeleteMul({
                        //   rowSelectCount,
                        //   rowSelection,
                        //   setDialogContent,
                        //   setIsDeleting,
                        //   setOpen,
                        //   setRowSelection,
                        //   table,
                        //   tDialog,
                        //   deleteUrl,
                        // })
                      }
                    >
                      {DIALOG_DATA["delete-btn"]}
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {/* filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="dark:bg-zinc-700">
                {FILTER_NAMES["filter-btn"]}
                <ListFilter className="ml-2 h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-2/3 overflow-auto p-4 flex flex-col gap-4">
              <SheetHeader>
                <SheetTitle>{FILTER_NAMES["filter-btn"]}</SheetTitle>
              </SheetHeader>
              <SheetDescription>{FILTER_NAMES["filter-description"]}</SheetDescription>

              {pageName != "news" && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h5>{FILTER_NAMES["filter-price"]}</h5>

                    <span className="text-center text-pri-red-1 font-bold text-sm">
                      {filterState.priceRange.filter((price: any) => price != undefined).length
                        ? `${filterState.priceRange[0]} - ${filterState.priceRange[1]}`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="w-full flex flex-row gap-2">
                    <Input
                      value={filterState.priceRange[0]}
                      type="number"
                      min={0}
                      max={filterState.priceRange[1] ?? undefined}
                      placeholder={FILTER_NAMES["filter-price-min"]}
                      onChange={(event: any) => {
                        // console.log("aaaaaaaaaaaaaaaaaaaaaaa", event.target.value);
                        setFilterState({
                          ...filterState,
                          priceRange: [
                            event.target.value == "" ? undefined : Number(event.target.value),
                            filterState.priceRange[1],
                          ],
                        });
                      }}
                    />

                    <Input
                      value={filterState.priceRange[1]}
                      type="number"
                      min={filterState.priceRange[0] ?? 0}
                      placeholder={FILTER_NAMES["filter-price-max"]}
                      onChange={(event: any) => {
                        // console.log("aaaaaaaaaaaaaaaaaaaaaaa", event.target.value);
                        setFilterState({
                          ...filterState,
                          priceRange: [
                            filterState.priceRange[0],
                            event.target.value == "" ? undefined : Number(event.target.value),
                          ],
                        });
                      }}
                    />
                  </div>

                  <div className="w-full grid ml:grid-cols-2 md:grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-md flex justify-center cursor-pointer bg-zinc-300 dark:bg-zinc-700"
                      onClick={() => setFilterState({ ...filterState, priceRange: [0, 0] })}
                    >
                      {FILTER_NAMES["filter-price-free"]}
                    </Button>

                    {FILTER_PRICES.map((price, index: number) => (
                      <Button
                        key={`filter price ${index}`}
                        type="button"
                        variant="outline"
                        className="rounded-md flex justify-center cursor-pointer bg-zinc-300 dark:bg-zinc-700"
                        onClick={() =>
                          setFilterState({
                            ...filterState,
                            priceRange: [price[0] * 1000, price[1] * 1000],
                          })
                        }
                      >
                        {`${price[0]}k - ${price[1]}k`}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* <div className="flex flex-col gap-2">
                <h5>{FILTER_NAMES["filter-category"]}</h5>

                <SelectDialog
                  translate={categories.name}
                  type={2}
                  search={true}
                  metadataSelect={categories as any}
                  selectedValue={filterState.categories}
                  setSelectedValue={(value: string[]) =>
                    setFilterState({
                      ...filterState,
                      categories: Array.isArray(value)
                        ? value.filter((item) => item != "")
                        : [value],
                    })
                  }
                />
              </div> */}

              <SheetFooter>
                <SheetClose asChild>
                  <div className="w-full flex fle-row gap-2 items-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleResetFilter}
                    >
                      {FILTER_NAMES["filter-reset-btn"]}
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      className="w-full"
                      onClick={handleFilter}
                    >
                      {FILTER_NAMES["filter-save-btn"]}
                    </Button>
                  </div>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* change display */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="dark:bg-zinc-700">
                Hiển thị (
                {table.getAllColumns().filter((column) => column.getCanHide())?.length -
                  Object.keys(columnVisibility).filter(
                    (column) => columnVisibility[column] == false
                  )?.length}
                )
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  // console.log("aaaaaaaaaa", column);
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {(COLUMN_NAMES as any)[column.id]}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default DataTableHeader;
