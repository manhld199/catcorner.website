"use client";

// import libs
import {
  ChevronDown,
  Group,
  Layers2,
  LayoutList,
  LogOut,
  Newspaper,
  Settings,
  ShoppingCart,
  TicketPercent,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// import components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ToogleThemeMode } from "@/components";
import { useSession } from "next-auth/react";

const sidebarData = [
  {
    title: "Sản phẩm",
    icon: ShoppingCart,
    items: [
      {
        icon: LayoutList,
        title: "Danh sách sản phẩm",
        url: "/admin/products",
      },
      {
        icon: Plus,
        title: "Thêm sản phẩm",
        url: "/admin/products/add",
      },
    ],
  },
  {
    title: "Danh mục",
    icon: Layers2,
    items: [
      {
        icon: LayoutList,
        title: "Danh sách danh mục",
        url: "/admin/categories",
      },
      {
        icon: Plus,
        title: "Thêm danh mục",
        url: "/admin/categories/add",
      },
    ],
  },
  {
    title: "Nhóm",
    icon: Group,
    items: [
      {
        icon: LayoutList,
        title: "Danh sách nhóm",
        url: "/admin/groups",
      },
      {
        icon: Plus,
        title: "Thêm nhóm",
        url: "/admin/groups/add",
      },
    ],
  },
  {
    title: "Phiếu giảm giá",
    icon: TicketPercent,
    items: [
      {
        icon: LayoutList,
        title: "Danh sách phiếu",
        url: "/admin/coupons",
      },
      {
        icon: Plus,
        title: "Thêm phiếu",
        url: "/admin/coupons/add",
      },
    ],
  },
  {
    title: "Bài viết",
    icon: Newspaper,
    items: [
      {
        icon: LayoutList,
        title: "Danh sách bài viết",
        url: "/admin/blogs",
      },
      {
        icon: Plus,
        title: "Thêm sản phẩm",
        url: "/admin/blogs/add",
      },
    ],
  },
];

export default function AdminSidebar() {
  const { data: session } = useSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className="relative w-1/2 aspect-square rounded-full overflow-hidden">
            <Image
              src={session?.user?.userAvt ?? "/imgs/admin/admin-default.jpg"}
              alt="admin avatar"
              fill={true}
            />
            <Badge className="absolute bottom-2 left-1/4">
              {session?.user?.role}
            </Badge>
          </div>

          <div>
            <h4 className="text-center">{session?.user?.name}</h4>
            <span className="text-sm text-gray-600">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Các trang quản lý</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map((item) => (
                <Collapsible
                  defaultOpen={false}
                  key={item.title}
                  className="group/collapsible">
                  <SidebarMenuItem>
                    <SidebarGroup>
                      <SidebarGroupLabel asChild>
                        <CollapsibleTrigger>
                          <SidebarMenuButton>
                            <item.icon />
                            {item.title}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                      <CollapsibleContent>
                        <SidebarGroupContent />
                      </CollapsibleContent>
                    </SidebarGroup>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem: any) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton>
                              <subItem.icon />
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        <SidebarMenuButton>
                          <Settings />
                          Cài đặt
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent />
                    </CollapsibleContent>
                  </SidebarGroup>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="px-0">
                          <ToogleThemeMode />
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="hover:bg-red-500 hover:text-white group/logout">
                          <LogOut className="group-hover/logout:stroke-white" />
                          Đăng xuất
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
