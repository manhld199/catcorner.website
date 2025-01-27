"use client";

// import libs
import { Fragment, useEffect, useState } from "react";
import { Eraser } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// import components
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownSort, RowCart } from "@/components";
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
import { putData, postData, getData } from "@/utils/functions/client";
import { convertNumberToVND } from "@/utils/functions/convert";

// import types
import { ICartProduct } from "@/types/interfaces";

// import data
import { PAGE_DATA } from "@/data/customer";
import { DIALOG_DATA } from "@/data/dialog";
import Image from "next/image";

export default function CartPage() {
  const { data: session } = useSession(); // Lấy thông tin session

  const [defaultCartProducts, setDefaultCartProducts] = useState<
    ICartProduct[]
  >([]);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
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
  const [sortNameState, setSortNameState] = useState<string>("none");
  const [sortQuantityState, setSortQuantityState] = useState<string>("none");
  const [sortTotalPriceState, setSortTotalPriceState] =
    useState<string>("none");

  const handleCartChangePage = async () => {
    try {
      if (!session || !cartProducts) {
        console.log("Session or cart not found");
        return;
      }

      const data = await putData(PUBLIC_CUSTOMER_CART_URL, {
        userId: session.user.id,
        cartProducts,
      });

      return data.user_cart[0];
    } catch (err) {
      console.log("error: ", err);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("sessssssssss", session);
      const localCartData = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.removeItem("cart");

      const cartData = await postData(
        `${PUBLIC_CUSTOMER_CART_URL}/${session ? session.user.id : "undefined"}`,
        localCartData
      );
      const userCart = cartData.user_cart;

      if (!userCart || userCart.length == 0) {
        setCartProducts([]);
        setDefaultCartProducts([]);
        setIsFetched(true);
        return;
      }

      // console.log("aaaaaaaaaa", PUBLIC_CUSTOMER_CART_URL, userCart);
      const data = await postData(PUBLIC_CUSTOMER_CART_URL, userCart);

      setCartProducts(data.products);
      setDefaultCartProducts(data.products);
      setIsFetched(true);
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    if (session) {
      let isProcessing = false;

      const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
        if (isProcessing) return; // Ngừng xử lý nếu đã đang thực hiện

        event.preventDefault(); // Ngăn việc chuyển trang/refresh
        event.returnValue = ""; // Hiển thị cảnh báo xác nhận (tuỳ vào trình duyệt)

        isProcessing = true;

        try {
          await handleCartChangePage(); // Xử lý thay đổi giỏ hàng
        } catch (error) {
          console.error("Error during handleCartChangePage:", error);
        }

        // Sau khi xử lý xong, cho phép chuyển trang
        isProcessing = false;
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [session, cartProducts]);

  useEffect(() => {
    if (isFetched) {
      const updatedLocalStorageCartProducts = cartProducts.map((item) => ({
        product_hashed_id: item.product_hashed_id,
        quantity: item.quantity,
        variant_id: item.variant_id,
      }));

      localStorage.removeItem("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify(updatedLocalStorageCartProducts)
      );
    }
  }, [cartProducts]);

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

  const handleSort = (key: string, sortState: string) => {
    console.log("deffffffff", defaultCartProducts);
    console.log("name state", sortNameState);
    console.log("sort state", sortState);

    let sortedData = [
      ...defaultCartProducts.filter(
        (defCartProduct) =>
          cartProducts.findIndex(
            (cartProduct) =>
              cartProduct.product_id == defCartProduct.product_id &&
              cartProduct.variant_id == defCartProduct.variant_id
          ) != -1
      ),
    ];

    if (sortState == "none") {
      setSortNameState(sortState);
      setSortQuantityState(sortState);
      setSortTotalPriceState(sortState);
      setCartProducts(sortedData);
      return;
    }

    if (key == "name") {
      setSortNameState(sortState);
      setSortQuantityState("none");
      setSortTotalPriceState("none");

      sortedData = sortedData.sort((a, b) => {
        const nameA = a.product_name.toLowerCase();
        const nameB = b.product_name.toLowerCase();

        if (nameA < nameB) return sortState === "asc" ? -1 : 1;
        if (nameA > nameB) return sortState === "asc" ? 1 : -1;
        return 0;
      });
    } else if (key == "quantity") {
      setSortQuantityState(sortState);
      setSortNameState("none");
      setSortTotalPriceState("none");

      sortedData = sortedData.sort((a, b) => {
        const quantityA = a.quantity;
        const quantityB = b.quantity;

        if (quantityA < quantityB) return sortState === "asc" ? -1 : 1;
        if (quantityA > quantityB) return sortState === "asc" ? 1 : -1;
        return 0;
      });
    } else if (key == "total-price") {
      setSortTotalPriceState(sortState);
      setSortQuantityState("none");
      setSortNameState("none");

      sortedData = sortedData.sort((a, b) => {
        const variantA = a.product_variants.find(
          (item) => item._id == a.variant_id
        );
        const totalPriceA =
          (a.quantity *
            variantA.variant_price *
            (100 - variantA.variant_discount_percent)) /
          100;

        const variantB = b.product_variants.find(
          (item) => item._id == b.variant_id
        );
        const totalPriceB =
          (b.quantity *
            variantB.variant_price *
            (100 - variantB.variant_discount_percent)) /
          100;

        if (totalPriceA < totalPriceB) return sortState === "asc" ? -1 : 1;
        if (totalPriceA > totalPriceB) return sortState === "asc" ? 1 : -1;
        return 0;
      });
    }
    console.log("sorted", sortedData);

    setCartProducts(sortedData);
  };

  return (
    <div className="relative w-full h-fit grid md:grid-cols-[7fr_3fr] gap-3">
      <div className="flex flex-col gap-2 items-end">
        {selectedCartProducts.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex flex-row items-center ml:mr-4 md:mr-0">
                <div className="cursor-pointer">
                  <Eraser className="min-w-6 w-6 min-h-6 h-6 fill-white stroke-red-800 hover:fill-red-600" />
                </div>
                <p className="mt-1">{DIALOG_DATA["quick-delete-btn"]}</p>
              </Button>
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

        <section className="w-full ml:mx-4 md:mx-0 bg-white dark:bg-black flex flex-col ml:border-2 md:border-none rounded-2xl">
          <div className="ml:p-2 lg:py-3 lg:pl-4 grid ml:grid-cols-[5%_48%_22%_22%] md:grid-cols-[5%_48%_22%_22%] lg:grid-cols-[5%_45%_23%_23%] xl:grid-cols-[5%_50%_22%_22%] items-center">
            <Checkbox
              checked={isSelectedAll}
              onCheckedChange={handleChangeCheckAll}
              className="data-[state=checked]:bg-pri-1"
            />

            <DropdownSort
              sortState={sortNameState}
              title={PAGE_DATA["cart-product"]}
              sortType="name"
              handleSort={handleSort}
            />

            <DropdownSort
              sortState={sortQuantityState}
              title={PAGE_DATA["cart-quantity"]}
              sortType="quantity"
              handleSort={handleSort}
            />

            <DropdownSort
              sortState={sortTotalPriceState}
              title={PAGE_DATA["cart-total-price"]}
              sortType="total-price"
              handleSort={handleSort}
            />
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
            <div className="my-4 flex flex-col gap-2 items-center">
              <div className="w-1/2 mx-auto aspect-square rounded-full bg-gray-100 dark:bg-gray-600 flex justify-center items-center">
                <div className="relative w-2/3 aspect-square">
                  <Image
                    src="/imgs/noti/cat-1.png"
                    alt="Giỏ hàng trống"
                    fill={true}
                  />
                </div>
              </div>
              <p className="font-semibold">
                Hiện không có sản phẩm trong Giỏ Hàng
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="sticky md:top-32 lg:top-20 right-0 p-4 bg-white dark:bg-black w-full h-fit flex flex-col gap-3 rounded-2xl">
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

        <Button variant="filled">
          <a href="#" className="w-full h-full pt-1">
            <h5>{`${PAGE_DATA["cart-submit"]} (${selectedCartProducts.length})`}</h5>
          </a>
        </Button>

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
