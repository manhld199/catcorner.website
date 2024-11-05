import { Search } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import UserSidebar from "@/partials/(user)/sidebar_nav"

export default function HistoryOrder() {
  return (
    <>
    <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
    
      <UserSidebar></UserSidebar>
      {/* Main Content */}
      <Card className="w-[100%]">
        <CardHeader>
          <h2 className="font-bold">Đơn hàng của tôi</h2>
        </CardHeader>
        <CardContent>
          {/* Order Status Tabs */}
          <Tabs defaultValue="all" className="mb-6">
              <TabsList className="grid w-full grid-cols-5 rounded-[50px] p-2 h-[50px]">
              <TabsTrigger value="all"
                           className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]"

              >
                Tất cả <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full px-2 text-sm text-primary-foreground bg-pri-1">4</span>
              </TabsTrigger>
              <TabsTrigger value="pending" 
                           className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]"

              >Chờ xác nhận</TabsTrigger>
              <TabsTrigger value="shipping"
                           className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]">Vận chuyển</TabsTrigger>
              <TabsTrigger value="completed"
                          className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]"

              >Thành công</TabsTrigger>
              <TabsTrigger value="cancelled"
                          className="data-[state=active]:text-pri-1 data-[state=active]:font-bold text-base rounded-[50px]"

              >Đã hủy</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Input
                  placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              </div>

              {/* Order Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                  
                      <span className="text-pri-1 text-2xl">Mã đơn hàng: CHT-913742</span>
                      <span className="rounded-[32px] bg-blue-100 px-2 py-1 text-xs text-blue-600">Đang vận chuyển</span>
                   
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <span>Thủ Đức, Tp Hồ Chí Minh</span>
                      <span>•</span>
                      <span>Giao hàng dự kiến: 28/09/25</span>
                    </div>
                    <span>Bình Sơn, Quảng Ngãi</span>
                  </div>
                  <div className="text-right text-pri-1 underline font-semibold">
                  <Link href="order-history/details">Xem chi tiết</Link>
                  </div>
                  {/* Product Items */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 border-t pt-4">
                      <Image
                        src="/placeholder.svg"
                        alt="Cat Litter Box"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">Nhà vệ sinh cho mèo PAW Fat Meow Cat Litter Boxes chất lượng cao</h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <span>x1</span>
                          <span className="mx-2">•</span>
                          <span>Size M</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="line-through text-muted-foreground">đ200.000</span>
                        <div className="font-medium">đ189.000</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 border-t pt-4">
                      <Image
                        src="/placeholder.svg"
                        alt="Pet Toy"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">Đồ chơi lật đật ăn hạt tự động cho mèo DORRIKEY vui nhộn</h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <span>x1</span>
                          <span className="mx-2">•</span>
                          <span>Màu hồng</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="line-through text-muted-foreground">đ100.000</span>
                        <div className="font-medium">đ50.000</div>
                      </div>
                    </div>
                  </div>

                  {/* Total */}

                  <div className="mt-4 border-t pt-4 text-right">
                    <span className="font-medium">Thành tiền: </span>
                    <span className="text-lg font-bold text-primary">đ239.000</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
   
    </>
  )
}