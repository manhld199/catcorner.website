import { Clock, MapPin, Package, Truck } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import UserSidebar from "@/partials/(user)/sidebar_nav"

export default function OrderDetail() {
  return (

    <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem]">
    
    <UserSidebar></UserSidebar>
    {/* Main Content */}
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Chi tiết đơn hàng</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Order ID and Status */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Mã đơn hàng</div>
              <div className="font-medium">CHT-913742</div>
            </div>
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">Đang vận chuyển</Badge>
          </div>

          {/* Shipping Route */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Thủ Đức, Tp Hồ Chí Minh</span>
            <span className="text-muted-foreground">→</span>
            <span>Bình Sơn, Quảng Ngãi</span>
          </div>

          {/* Delivery Status Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <Package className="h-6 w-6" />
                <div>
                  <div className="font-medium">Kiên nhẫn 1 tí nữa nào, đơn hàng sẽ đến tay cậu nhanh thôi !</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <Truck className="h-6 w-6" />
                <div>
                  <div className="text-sm text-muted-foreground">Giao hàng dự kiến</div>
                  <div className="font-medium">28/09/25</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <Clock className="h-6 w-6" />
                <div>
                  <div className="text-sm text-muted-foreground">Giao hàng trong:</div>
                  <div className="font-medium">5 ngày</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Chi tiết</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ngày đặt:</span>
            <span>28/9/2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phương thức thanh toán:</span>
            <span>Thanh toán khi nhận hàng</span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Địa chỉ nhận hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="font-medium">Tuấn Ngọc</div>
          <div>Điện thoại: 0289183498</div>
          <div>Công sau kí túc xá khu B, đại học quốc gia, Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh</div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader>
          <CardTitle>Sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Product 1 */}
            <div className="flex items-start gap-4">
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

            <Separator />

            {/* Product 2 */}
            <div className="flex items-start gap-4">
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

            <Separator />

            {/* Total */}
            <div className="flex justify-between pt-4">
              <span className="font-medium">Thành tiền:</span>
              <span className="text-lg font-bold text-primary">đ239.000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>

  )
}