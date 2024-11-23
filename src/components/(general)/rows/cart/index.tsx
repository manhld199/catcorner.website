"use client";

// import libs
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { Eraser } from "lucide-react";

// import components
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputGroupQuantity } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// import types
import { ICartProduct, IProductVariant } from "@/types/interfaces";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";
import { DIALOG_DATA } from "@/data/dialog";

export default function RowCart({
  cartIndex,
  cartProducts,
  setCartProducts,
  selectedCartProducts,
  setSelectedCartProducts,
  setIsSelectedAll,
  setDeletedCartProducts,
}: {
  cartIndex: number;
  cartProducts: ICartProduct[];
  setCartProducts: Dispatch<SetStateAction<ICartProduct[]>>;
  selectedCartProducts: ICartProduct[];
  setSelectedCartProducts: Dispatch<SetStateAction<ICartProduct[]>>;
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>;
  setDeletedCartProducts: Dispatch<SetStateAction<ICartProduct[]>>;
}) {
  const [variant, setVariant] = useState<IProductVariant>(
    cartProducts[cartIndex].product_variants.find(
      (item) => item._id == cartProducts[cartIndex].variant_id
    )
  );

  const [quantity, setQuantity] = useState<number>(
    cartProducts[cartIndex].quantity <= variant.variant_stock_quantity
      ? cartProducts[cartIndex].quantity
      : variant.variant_stock_quantity
  );

  const [isSelected, setIsSelected] = useState<boolean>(
    selectedCartProducts.findIndex(
      (item) =>
        item.product_id == cartProducts[cartIndex].product_id &&
        item.variant_id == cartProducts[cartIndex].variant_id
    ) != -1
  );

  useEffect(() => {
    // console.log("carrrrrrrrrrrr", cartProducts);

    // Ensure you're getting the correct variant based on cartIndex
    const updatedVariant = cartProducts[cartIndex]?.product_variants.find(
      (item) => item._id == cartProducts[cartIndex]?.variant_id
    );

    setVariant(updatedVariant);

    // Ensure quantity is properly set based on variant stock and the cart's quantity
    setQuantity(
      cartProducts[cartIndex]?.quantity <=
        updatedVariant?.variant_stock_quantity
        ? cartProducts[cartIndex]?.quantity
        : updatedVariant?.variant_stock_quantity
    );

    // Check if the product is selected in the selectedCartProducts array
    setIsSelected(
      selectedCartProducts.findIndex(
        (item) =>
          item.product_id == cartProducts[cartIndex]?.product_id &&
          item.variant_id == cartProducts[cartIndex]?.variant_id
      ) != -1
    );
  }, [
    cartProducts[cartIndex]?.variant_id,
    cartProducts[cartIndex]?.quantity,
    selectedCartProducts,
  ]);

  const handleChangeVariant = (value: string) => {
    setCartProducts((prev: ICartProduct[]) => {
      const updatedCartProducts = prev.map((item, index) =>
        index == cartIndex ? { ...item, variant_id: value } : item
      );

      return updatedCartProducts;
    });
    setSelectedCartProducts((prev: ICartProduct[]) => {
      const changeCartProductIndex = prev.findIndex(
        (item) =>
          item.product_id == cartProducts[cartIndex].product_id &&
          item.variant_id == cartProducts[cartIndex].variant_id
      );

      if (changeCartProductIndex == -1) return prev;

      const updatedCartProducts = prev.map((item, index) =>
        index == changeCartProductIndex ? { ...item, variant_id: value } : item
      );

      return updatedCartProducts;
    });
  };

  const handleChangeQuantity = (value: number) => {
    // console.log("quannnnnnnn", value);

    setCartProducts((prev: ICartProduct[]) => {
      const updatedCartProducts = prev.map((item, index) =>
        index == cartIndex ? { ...item, quantity: value } : item
      );

      return updatedCartProducts;
    });
    setSelectedCartProducts((prev: ICartProduct[]) => {
      const changeCartProductIndex = prev.findIndex(
        (item) =>
          item.product_id == cartProducts[cartIndex].product_id &&
          item.variant_id == cartProducts[cartIndex].variant_id
      );

      if (
        changeCartProductIndex == -1 ||
        prev[changeCartProductIndex].quantity == value
      )
        return prev;

      const updatedCartProducts = prev.map((item, index) =>
        index == changeCartProductIndex ? { ...item, quantity: value } : item
      );

      return updatedCartProducts;
    });
  };

  const handleChangeChecked = (value: boolean) => {
    setSelectedCartProducts((prev) => {
      const productToChange = cartProducts[cartIndex];
      const existingIndex = prev.findIndex(
        (item) =>
          item.product_id === productToChange.product_id &&
          item.variant_id === productToChange.variant_id
      );

      // If value is true and product isn't already selected, add it
      if (value && existingIndex === -1) {
        const newCartProducts = [...prev, productToChange];

        if (newCartProducts.length == cartProducts.length)
          setIsSelectedAll(true);

        return newCartProducts;
      }

      // If value is false and product is selected, remove it
      if (!value && existingIndex !== -1) {
        setIsSelectedAll(false);

        return prev.filter((_, index) => index !== existingIndex);
      }

      // Otherwise, return the previous state unchanged
      return prev;
    });
  };

  const handleDeleteCartProduct = () => {
    const handleSetState = (prev: ICartProduct[]) => {
      const undeletedCartProducts = [
        ...prev.filter(
          (item) =>
            !(
              item.product_id == cartProducts[cartIndex].product_id &&
              item.variant_id == cartProducts[cartIndex].variant_id
            )
        ),
      ];
      return undeletedCartProducts;
    };

    setDeletedCartProducts((prev) => [...prev, { ...cartProducts[cartIndex] }]);

    setCartProducts(handleSetState);
    setSelectedCartProducts(handleSetState);
  };

  return (
    <div
      className={`hover:bg-teal-100/50 ml:p-2 lg:py-3 lg:pl-4 grid ml:grid-cols-[5%_48%_22%_22%] md:grid-cols-[5%_48%_22%_22%] lg:grid-cols-[5%_45%_23%_23%] xl:grid-cols-[5%_50%_22%_22%] gap-1 items-center ${isSelected ? "bg-teal-100" : ""}`}>
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleChangeChecked}
        className="data-[state=checked]:bg-pri-1"
      />

      <div className="grid ml:grid-cols-[60px_1fr] md:grid-cols-[72px_1fr] lg:grid-cols-[100px_1fr] md:gap-1 lg:gap-2 items-center">
        {variant && variant.variant_img.startsWith("SEO") ? (
          <div className="relative ml:w-[60px] md:w-[72px] lg:w-[100px] aspect-square">
            <CldImage
              src={variant.variant_img}
              alt={variant.variant_name}
              fill={true}
            />
          </div>
        ) : (
          <div className="relative ml:w-[60px] md:w-[72px] lg:w-[100px] aspect-square">
            <Image
              src={variant.variant_img}
              alt={variant.variant_name}
              fill={true}
            />
          </div>
        )}

        <div className="w-full flex flex-col md:gap-1 lg:gap-2">
          <h6 className={`line-clamp-2 ${isSelected ? "dark:text-black" : ""}`}>
            {cartProducts[cartIndex].product_name}
          </h6>
          <Select
            onValueChange={handleChangeVariant}
            value={cartProducts[cartIndex].variant_id}>
            <SelectTrigger className="w-fit bg-pri-2 text-stone-700 font-medium border-none hover:bg-pri-7 hover:text-white">
              <SelectValue placeholder={variant.variant_name} />
            </SelectTrigger>
            <SelectContent>
              {cartProducts[cartIndex].product_variants.map((item, index) => (
                <SelectItem
                  key={`${cartProducts[cartIndex].product_name} ${item.variant_name} ${index}`}
                  value={item._id}
                  disabled={
                    item._id == cartProducts[cartIndex].variant_id ||
                    cartProducts
                      .filter(
                        (cartProduct, itemIndex) =>
                          itemIndex != cartIndex &&
                          cartProduct.product_id ==
                            cartProducts[cartIndex].product_id
                      )
                      .findIndex(
                        (cartProduct) => cartProduct.variant_id == item._id
                      ) != -1
                  }>
                  {item.variant_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-row gap-1">
            {variant.variant_discount_percent > 0 && (
              <p className="text-slate-600 line-through">
                {convertNumberToVND(variant.variant_price)}
              </p>
            )}
            <p className={`${isSelected ? "dark:text-black" : ""}`}>
              {convertNumberToVND(
                (variant.variant_price *
                  (100 - variant.variant_discount_percent)) /
                  100
              )}
            </p>
          </div>
        </div>
      </div>

      <InputGroupQuantity
        initValue={{
          defaultValue: quantity,
          minValue: 1,
          maxValue: 100,
        }}
        takeQuantity={handleChangeQuantity}
      />

      <div className="relative w-full h-full flex flex-col justify-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute top-0 right-0 p-2 hover:bg-white group cursor-pointer rounded-full shadow-sm">
              <Eraser
                className={`w-5 h-5 group-hover:fill-red-500 group-hover:stroke-red-800 ${isSelected ? "dark:text-black" : ""}`}
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{DIALOG_DATA["title-delete-cart"]}</DialogTitle>
              <DialogDescription>
                {`${DIALOG_DATA["content-general-delete-rows-1"]} '${cartProducts[cartIndex].product_name} - ${cartProducts[cartIndex].product_variants.find((item) => item._id == cartProducts[cartIndex].variant_id).variant_name}' ${DIALOG_DATA["content-delete-cart-3"]} ${DIALOG_DATA["content-general-delete-confirm-3"]}`}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex !justify-between">
              <DialogClose>
                <Button type="button" variant="outline">
                  {DIALOG_DATA["close-btn"]}
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteCartProduct}>
                  {DIALOG_DATA["delete-btn"]}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {variant.variant_discount_percent > 0 && (
          <p className="text-center text-slate-600 line-through">
            {convertNumberToVND(quantity * variant.variant_price)}
          </p>
        )}
        <p className={`text-center ${isSelected ? "dark:text-black" : ""}`}>
          {convertNumberToVND(
            (quantity *
              (variant.variant_price *
                (100 - variant.variant_discount_percent))) /
              100
          )}
        </p>
      </div>
    </div>
  );
}
