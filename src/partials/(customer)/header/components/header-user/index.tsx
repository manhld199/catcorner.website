import React from "react";
import { UserRound } from "lucide-react";

export default function CustomerHeaderUser() {
  return (
    <>
      {/* Sign In */}
      <a
        href="#"
        className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300"
      >
        <UserRound />
        <span className="ml-1 font-semibold laptop:block desktop:block ">
          Sign in
        </span>
      </a>
    </>
  );
}
