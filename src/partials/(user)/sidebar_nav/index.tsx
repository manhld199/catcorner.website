import { Home, LogOut, NotepadText, User, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UserSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="md:hidden fixed top-4 right-4 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <Card
        className={`
        md:flex h-auto md:h-[450px] w-full md:w-[300px] flex-col
        fixed md:relative top-0 left-0 z-40
        ${isMenuOpen ? "flex" : "hidden"}
        bg-white
        md:bg-transparent
        transition-all duration-300
      `}>
        {/* Profile Section */}
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-12 md:h-16 w-12 md:w-16">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
          <div>
            <h5 className="font-semibold">Chào Trinh</h5>
            <Button
              variant="link"
              className="h-auto p-0 text-sm text-muted-foreground">
              Chỉnh sửa tài khoản
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 md:gap-3">
          <Link href="/profile">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${pathname === "/profile" ? "bg-selected-nav text-pri-1 font-bold rounded-none" : ""}
              `}>
              <User className="h-5 md:h-6 w-5 md:w-6" />
              Thông tin tài khoản
            </Button>
          </Link>

          <Link href="/address">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${pathname === "/address" ? "bg-selected-nav text-pri-1 font-bold rounded-none" : ""}
              `}>
              <Home className="h-5 md:h-7 w-5 md:w-7" />
              Địa chỉ nhận hàng
            </Button>
          </Link>

          <Link href="/order-history">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${pathname === "/order-history" ? "bg-selected-nav text-pri-1 font-bold rounded-none" : ""}
              `}>
              <NotepadText className="h-5 md:h-6 w-5 md:w-6" />
              Đơn hàng của tôi
            </Button>
          </Link>
        </nav>

        {/* Sign Out Button */}
        <div className="border-t p-4 mt-auto">
          <Button
            variant="custom"
            className="w-full justify-center gap-3 text-white text-sm md:text-base"
            onClick={handleSignOut}>
            <LogOut className="h-4 md:h-5 w-4 md:w-5" />
            Đăng xuất
          </Button>
        </div>
      </Card>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
