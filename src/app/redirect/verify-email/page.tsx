"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();

  const { query } = router;
  const { email, token } = query;

  useEffect(() => {
    // Địa chỉ deep link của ứng dụng
    const appLink = `catcorner://verify-email?email=${email}&token=${token}`;

    // Cố gắng mở ứng dụng
    window.location.href = appLink;
  }, [router]);

  return (
    <div>
      <p>Redirecting you to the app...</p>
    </div>
  );
};

export default RedirectPage;
