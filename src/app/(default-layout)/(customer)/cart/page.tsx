"use client";

// import libs
import { Fragment, useEffect, useState } from "react";
import { Eraser } from "lucide-react";
import Link from "next/link";

// import components
import { Checkbox } from "@/components/ui/checkbox";
import { RowCart } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import utils
import { PUBLIC_CUSTOMER_CART_URL } from "@/utils/constants/urls";
import { fetchDataClientWithBodyNoCache } from "@/utils/functions/client";
import { convertNumberToVND } from "@/utils/functions/convert";

// import types
import { ICartProduct } from "@/types/interfaces";

// import data
import { PAGE_DATA } from "@/data/customer";
import { DIALOG_DATA } from "@/data/dialog";

const cartData: ICartProduct[] = [
  {
    product_id: "660d58878be4c0f5e0b5c37e",
    variant_id: "67069a7d2d723e958da39590",
    quantity: 100,
  },
  {
    product_id: "660d58878be4c0f5e0b5c3ec",
    variant_id: "67069a7d2d723e958da395a1",
    quantity: 192,
  },
  {
    product_id: "6617f0ede1d3208ee924ec1a",
    variant_id: "67069a7d2d723e958da395d4",
    quantity: 28,
  },
  {
    product_id: "660d58878be4c0f5e0b5c37e",
    variant_id: "67069a7d2d723e958da39592",
    quantity: 18,
  },
  {
    product_id: "6617f0ede1d3208ee924ec72",
    variant_id: "67069a7d2d723e958da395e4",
    quantity: 57,
  },
];

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [originalTotalPrice, setOriginalTotalPrice] = useState<number>(0);
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedCartProducts, setSelectedCartProducts] = useState<
    ICartProduct[]
  >([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const [deletedCartProducts, setDeletedCartProducts] = useState<
    ICartProduct[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataClientWithBodyNoCache(
        PUBLIC_CUSTOMER_CART_URL,
        cartData
      );

      setCartProducts(data.products);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOriginalTotalPrice(
      selectedCartProducts.reduce((acc, curr) => {
        const currentVariant = curr.product_variants.filter(
          (item) => item._id == curr.variant_id
        )[0];
        return acc + curr.quantity * currentVariant.variant_price;
      }, 0)
    );

    setDiscountedTotalPrice(
      selectedCartProducts.reduce((acc, curr) => {
        const currentVariant = curr.product_variants.filter(
          (item) => item._id == curr.variant_id
        )[0];
        return (
          acc +
          (curr.quantity *
            currentVariant.variant_price *
            currentVariant.variant_discount_percent) /
            100
        );
      }, 0)
    );

    setTotalPrice(
      selectedCartProducts.reduce((acc, curr) => {
        const currentVariant = curr.product_variants.filter(
          (item) => item._id == curr.variant_id
        )[0];
        return (
          acc +
          (curr.quantity *
            currentVariant.variant_price *
            (100 - currentVariant.variant_discount_percent)) /
            100
        );
      }, 0)
    );
    // console.log("selectedCartProducts", selectedCartProducts);
  }, [selectedCartProducts]);

  const handleChangeCheckAll = (value: boolean) => {
    setIsSelectedAll(value);
    setSelectedCartProducts(value ? [...cartProducts] : []);
  };

  const handleDeleteCartProducts = () => {
    setDeletedCartProducts((prev) => [...prev, ...selectedCartProducts]);

    if (isSelectedAll) setCartProducts([]);
    else
      setCartProducts((prev: ICartProduct[]) => {
        const deletedCartProducts = [
          ...prev.filter(
            (item) =>
              !(
                selectedCartProducts.findIndex(
                  (find) =>
                    find.product_id == item.product_id &&
                    find.variant_id == item.variant_id
                ) != -1
              )
          ),
        ];
        return deletedCartProducts;
      });

    setIsSelectedAll(false);
    setSelectedCartProducts([]);
  };

  return (
    <div className="relative w-full h-fit grid grid-cols-[7fr_3fr] gap-3">
      <section className="bg-white w-full flex flex-col rounded-2xl">
        <div className="py-3 px-4 grid grid-cols-[4%_52%_16%_19%_4%] gap-2 items-center">
          <Checkbox
            checked={isSelectedAll}
            onCheckedChange={handleChangeCheckAll}
          />
          <h4 className="text-center">{PAGE_DATA["cart-product"]}</h4>
          <h4 className="text-center">{PAGE_DATA["cart-quantity"]}</h4>
          <h4 className="text-center">{PAGE_DATA["cart-total-price"]}</h4>
          {selectedCartProducts.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Eraser className="w-6 h-6 fill-red-500 stroke-red-800 hover:fill-red-600" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{DIALOG_DATA["title-delete-cart"]}</DialogTitle>
                  <DialogDescription>
                    {`${DIALOG_DATA["content-general-delete-rows-1"]} ${selectedCartProducts.length} ${DIALOG_DATA["content-delete-cart-2"]} ${DIALOG_DATA["content-general-delete-confirm-3"]}`}
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
                      onClick={handleDeleteCartProducts}>
                      {DIALOG_DATA["delete-btn"]}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="border-[1px]"></div>

        {cartProducts && cartProducts.length > 0 ? (
          cartProducts.map((cartProduct, index) => (
            <Fragment key={`cart product ${index}`}>
              <RowCart
                cartIndex={index}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                selectedCartProducts={selectedCartProducts}
                setSelectedCartProducts={setSelectedCartProducts}
                setIsSelectedAll={setIsSelectedAll}
                setDeletedCartProducts={setDeletedCartProducts}
              />
              {index != cartProducts.length - 1 && (
                <div className="border-[1px]"></div>
              )}
            </Fragment>
          ))
        ) : (
          <>khoong cs data</>
        )}
      </section>

      <section className="sticky top-20 right-0 p-4 bg-white w-full h-fit flex flex-col gap-3 rounded-2xl">
        <div className="flex flex-row justify-between">
          <p className="text-gray-600">{PAGE_DATA["cart-price"]}</p>
          <p>{convertNumberToVND(originalTotalPrice)}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-600">{PAGE_DATA["cart-discount"]}</p>
          <p>{convertNumberToVND(discountedTotalPrice)}</p>
        </div>

        <div className="border-[1px]"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-600">{PAGE_DATA["cart-total-price"]}</p>
          <h4 className="text-pri-6">{convertNumberToVND(totalPrice)}</h4>
        </div>

        <Button variant="filled">{`${PAGE_DATA["cart-submit"]} (${selectedCartProducts.length})`}</Button>

        <p className="text-center text-sm">
          <span className="text-center">{PAGE_DATA["cart-term-1"]}</span>
          <Link
            href="/term-of-service"
            className="ml-1 text-blue-500 underline">
            {PAGE_DATA["cart-term-2"]}
          </Link>
          <span className="ml-1">{PAGE_DATA["cart-term-3"]}</span>
          <Link
            href="/security-policies"
            className="ml-1 text-blue-500 underline">
            {PAGE_DATA["cart-term-4"]}
          </Link>
          <span className="ml-1">{PAGE_DATA["cart-term-5"]}</span>
        </p>
      </section>
    </div>
  );
}
