"use client";
import Link from "next/link";
import { CustomerHeaderLogo } from "@/partials/(customer)/header/components";
import { Button } from "@/components/ui/button";

interface AuthHeaderProps {
  currentPage: "login" | "register" | "other";
}

export default function AuthHeader({ currentPage }: AuthHeaderProps) {
  return (
    <header className="bg-white dark:bg-black shadow-sm mx-auto bg-white flex justify-center">
      <div className="flex justify-between items-center py-2 w-[80%]">
        <div className="phone:px-4 phone:py-1 phone:bg-pri-1 dark:bg-teal-700 dark:laptop:bg-transparent laptop:bg-transparent phone:flex phone:justify-between laptop:px-0 tablet:px-9">
          <CustomerHeaderLogo></CustomerHeaderLogo>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button
              variant={currentPage === "login" ? "filled" : "filled_outlined"}>
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant={
                currentPage === "register" ? "filled" : "filled_outlined"
              }>
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
