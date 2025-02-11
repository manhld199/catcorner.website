"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BreadCrumb({
  breadcrumbs,
}: {
  breadcrumbs: { label: string; href?: string }[];
}) {
  const MAX_VISIBLE_BREADCRUMBS = 3;

  const shouldTruncate = breadcrumbs.length > MAX_VISIBLE_BREADCRUMBS;

  // Tách breadcrumb thành phần đầu, liền kề cuối và cuối cùng
  const firstBreadcrumb = breadcrumbs[0];
  const secondToLastBreadcrumb =
    shouldTruncate && breadcrumbs[breadcrumbs.length - 2];
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];

  // Breadcrumbs cần hiển thị trong menu toggle (nếu có)
  const hiddenBreadcrumbs =
    shouldTruncate && breadcrumbs.slice(1, breadcrumbs.length - 2);

  return (
    <div className="flex mt-24 w-4/5 mx-auto">
      <Breadcrumb className="ml-4">
        <BreadcrumbList>
          {/* Hiển thị breadcrumb đầu tiên */}
          <BreadcrumbItem>
            <BreadcrumbLink
              href={firstBreadcrumb.href}
              className="text-gray-500 hover:text-teal-600 dark:text-gray-200 dark:hover:text-teal-200">
              {firstBreadcrumb.label}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Dấu "..." nếu cần ẩn */}
          {shouldTruncate && hiddenBreadcrumbs && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4 cursor-pointer" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {hiddenBreadcrumbs.map((crumb, index) => (
                      <DropdownMenuItem key={index}>
                        <BreadcrumbLink
                          href={crumb.href}
                          className="text-gray-500 hover:text-teal-600 dark:text-gray-300">
                          {crumb.label}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}

          {/* Hiển thị breadcrumb liền kề cuối (nếu có) */}
          {shouldTruncate && secondToLastBreadcrumb && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={secondToLastBreadcrumb.href}
                  className="text-gray-500 hover:text-teal-600 dark:text-gray-300">
                  {secondToLastBreadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {/* Hiển thị breadcrumb cuối cùng */}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black font-semibold dark:text-gray-400">
              {lastBreadcrumb.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
