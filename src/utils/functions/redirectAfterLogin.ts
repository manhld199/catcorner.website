"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function useRedirectAfterLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectAfterLogin = () => {
    // Lấy 'callbackUrl' nếu có, nếu không thì lấy 'from', nếu không có nữa thì redirect về '/'
    const redirectUrl =
      searchParams.get("callbackUrl") || searchParams.get("from") || "/";
    router.push(redirectUrl);
  };

  return { redirectAfterLogin };
}
