"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenLine, Trash2, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { USER_URL } from "@/utils/constants/urls";
import { Address } from "@/types/address";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast, ToastContainer } from "react-toastify";

const MySwal = withReactContent(Swal);

export default function DeliveryAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState<Address[]>([]);
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Địa chỉ đã được thêm thành công!");
      router.replace("/address");
    }
  }, [searchParams, router]);

  const fetchAddresses = async () => {
    if (!session?.user?.accessToken) return;
    try {
      const response = await fetch(
        `${USER_URL}/${session?.user?.id}/addresses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setAddresses(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);
  const handleAddNewAddress = () => {
    router.push("/address/add");
  };

  const handleUpdateAddress = (id: string) => {
    router.push(`/address/update/${id}`);
  };

  const onDelete = async (id: string) => {
    try {
      if (!session?.user?.accessToken) return;
      const response = await fetch(`${USER_URL}/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        console.log("oki");
        throw new Error("Failed to delete the address");
      }

      MySwal.fire("Deleted!", "Your record has been deleted.", "success");
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      MySwal.fire("Error", "There was an issue deleting the address.", "error");
    }
  };

  const handleDelete = (address: Address) => {
    MySwal.fire({
      title: "Bạn có chắc chắn muốn xóa địa chỉ này không ?",
      text: `${address.full_name}, ${address.phone}, ${address.province.name}, ${address.district.name}, ${address.ward.name}, ${address.detail_address}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onDelete(address._id); // Call the delete function if confirmed
      }
    });
  };

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground shadow w-[100%] dark:bg-black dark:border-gray-700">
        <div className="w-full l p-4 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold dark:text-white">Địa chỉ nhận hàng</h2>
            <Button
              onClick={handleAddNewAddress}
              variant="filled"
              className="relative">
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm địa chỉ mới
            </Button>
          </div>
          <div className="space-y-4 mx-auto w-full">
            {addresses.map((address, index) => (
              <motion.div
                key={address._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
                <Card
                  className={`relative ${address.is_default ? "border-2 border-pri-7 border-dashed" : ""} transition-all duration-300 ease-in-out hover:shadow-md`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {address.full_name}
                          </span>
                          <span className="text-muted-foreground">
                            - {address.phone}
                          </span>
                          {address.is_default && (
                            <Badge
                              variant="default"
                              className="bg-pri-7 text-primary-foreground">
                              Mặc định
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.province.name}, {address.district.name},{" "}
                          {address.ward.name}, {address.detail_address}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateAddress(address._id)}
                          className="text-primary hover:text-primary/90 transition-colors duration-200">
                          <PenLine className="h-4 w-4 mr-1" />
                          Chỉnh sửa
                        </Button>
                        {!address.is_default && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(address)}
                            className="text-destructive hover:text-destructive/90 transition-colors duration-200">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
