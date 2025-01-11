"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenLine, Trash2, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import UserSidebar from "@/partials/(user)/sidebar_nav";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
}

const addresses: Address[] = [
  {
    id: "1",
    name: "Nguyễn Trâm",
    phone: "0389183498",
    address:
      "Honda Đức Dũng - Ngã tư Đồng Ruộn, Xã Bình Thuận, Huyện Bình Sơn, Quảng Ngãi",
    isDefault: true,
  },
  {
    id: "2",
    name: "Nguyễn Thị Thùy Trinh",
    phone: "0345421574",
    address: "gffffffff, Phường An Phú, Quận 2, Hồ Chí Minh",
  },
  {
    id: "3",
    name: "Nguyễn Thị Thùy Trinh",
    phone: "0389183498",
    address:
      "Cổng chính Ký túc xá khu A, đại học quốc gia Tp Hồ Chí Minh, Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh",
  },
];

export default function DeliveryAddress() {
  const router = useRouter();

  const handleAddNewAddress = () => {
    router.push("/address/add");
  };
  return (
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
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}>
              <Card
                className={`relative ${address.isDefault ? "border-primary border-dashed" : ""} transition-all duration-300 ease-in-out hover:shadow-md`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{address.name}</span>
                        <span className="text-muted-foreground">
                          - {address.phone}
                        </span>
                        {address.isDefault && (
                          <Badge
                            variant="default"
                            className="bg-primary text-primary-foreground">
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {address.address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/90 transition-colors duration-200">
                        <PenLine className="h-4 w-4 mr-1" />
                        Chỉnh sửa
                      </Button>
                      {!address.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
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
  );
}
