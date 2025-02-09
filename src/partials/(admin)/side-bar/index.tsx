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
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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

// import data
import { ADMIN_SIDE_BAR } from "@/data/components";

const sidebarData = [
  {
    title: "Bảng điều khiển",
    icon: LayoutDashboard,
    url: "/admin/",
  },
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
  const pathname = usePathname();

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
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{ADMIN_SIDE_BAR["label"]}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map((item) => {
                if (Array.isArray(item.items))
                  return (
                    <Collapsible
                      defaultOpen={false}
                      key={item.title}
                      className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="w-full">
                          <SidebarMenuButton>
                            <item.icon />
                            {item.title}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarGroupContent />
                        </CollapsibleContent>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem: any) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  className={`px-0  ${
                                    pathname === subItem.url
                                      ? "bg-teal-500 text-white hover:bg-teal-500 hover:text-white"
                                      : ""
                                  }`}>
                                  <Link
                                    href={subItem.url}
                                    className="w-full h-fit px-2 flex flex-row gap-2 items-start justify-between">
                                    <div className="flex flex-row gap-2">
                                      <subItem.icon className="w-4 h-4" />
                                      <span className="line-clamp-1 ">
                                        {subItem.title}
                                      </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4" />
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                else
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`px-0  ${
                          pathname === item.url
                            ? "bg-teal-500 text-white hover:bg-teal-500 hover:text-white"
                            : ""
                        }`}>
                        <Link
                          href={item.url}
                          className="w-full h-fit px-2 flex flex-row gap-2 items-start justify-between">
                          <div className="flex flex-row gap-2">
                            <item.icon className="w-4 h-4" />
                            <span className="line-clamp-1 ">{item.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
              })}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger className="w-full">
                    <SidebarMenuButton>
                      <Settings />
                      {ADMIN_SIDE_BAR["setting"]}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent />
                  </CollapsibleContent>

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
                          {ADMIN_SIDE_BAR["logout"]}
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
