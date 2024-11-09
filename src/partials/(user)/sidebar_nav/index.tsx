import { Home, LogOut, NotepadText, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function UserSidebar() {
  return (
    <Card className="flex h-[450px] w-[300px] flex-col">
      {/* Profile Section */}
      <div className="flex items-center gap-3 p-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>TT</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="font-semibold">Chào Trinh</h5>
          <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
            Chỉnh sửa tài khoản
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-base px-6 py-7"
        >
          <User className="h-6 w-6" />
          Thông tin tài khoản
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-base px-6 py-7"
        >
          <Home className="h-7 w-7" />
          Địa chỉ nhận hàng
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 bg-selected-nav text-pri-1 font-bold text-base rounded-none px-6 py-7"
        >
          <NotepadText />
          Đơn hàng của tôi
        </Button>
      </nav>

      {/* Sign Out Button */}
      <div className="border-t p-4 h-full flex items-center">
        <Button
          variant="custom"
          className="w-full justify-start gap-3 text-white flex justify-center text-base"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </Button>
      </div>
    </Card>
  )
}