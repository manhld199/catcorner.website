"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const RedirectPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    // Địa chỉ deep link của ứng dụng
    const appLink = `${process.env.NEXT_PUBLIC_APP_NAME}://verify-email?email=${email}&token=${token}`;

    // Cố gắng mở ứng dụng
    window.location.href = appLink;
  }, []);

  return (
    <div>
      <p>Redirecting you to the app...</p>
    </div>
  );
};

export default RedirectPage;
