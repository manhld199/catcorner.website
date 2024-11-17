// import libs
import { NextResponse } from "next/server";
import { EResponseStatus } from "../constants/variables";
import { notFound } from "next/navigation";
import {
  IBaseResponseProps,
  INotOkResponseProps,
  IOkResponseProps,
} from "@/types/interfaces";
import { getSession, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import { refreshTokenAndSignIn } from "@/utils/auth";

const baseResponse = (props: IBaseResponseProps) => {
  const { status, ...rest } = props;
  return NextResponse.json({ ...rest }, { status });
};

// OK response
export const successResponse = (props?: IOkResponseProps) => {
  const { message = "Thành công", data } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.SUCCESS, data });
};

export const createdResponse = (props?: IOkResponseProps) => {
  const { message = "Đã tạo", data } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.CREATED, data });
};

// Not OK response
export const badRequestResponse = (props?: INotOkResponseProps) => {
  const { message = "Yêu cầu không hợp lệ", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.BAD_REQUEST, error });
};

export const unauthorizedResponse = (props?: INotOkResponseProps) => {
  const { message = "Không được ủy quyền", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.UNAUTHORIZED, error });
};

export const forbiddenResponse = (props?: INotOkResponseProps) => {
  const { message = "Không được phép", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.FORBIDDEN, error });
};

export const notFoundResponse = (props?: INotOkResponseProps) => {
  const { message = "Không tìm thấy", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.NOT_FOUND, error });
};

export const errorResponse = (props?: INotOkResponseProps) => {
  const { message = "Lỗi xử lý", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.ERROR, error });
};

export const fetchData = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return notFound();

    const json = await res.json();

    const data = json.data;

    return data;
  } catch (err) {
    console.log("Fetch data error: ", err);
    return notFound();
  }
};

export const fetchDataNoCache = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) return notFound();

    const json = await res.json();

    const data = json.data;

    return data;
  } catch (err) {
    console.log("Fetch data error: ", err);
    return notFound();
  }
};

export const fetchDataWithBodyNoCache = async (url: string, body: any) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) return notFound();

    const json = await res.json();

    const data = json.data;

    return data;
  } catch (err) {
    console.log("Fetch data error: ", err);
    return notFound();
  }
};

interface FetchOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
}

export const fetchWithAuth = async (
  url: string,
  options: FetchOptions = { method: "GET" }
) => {
  try {
    const session = await getSession();
    if (!session?.user?.accessToken) {
      throw new Error("No access token available");
    }
    const isFormData = options.body instanceof FormData;
    // Xử lý headers
    const headers = isFormData
      ? {
          Authorization: `Bearer ${session.user.accessToken}`,
          ...options.headers,
        }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
          ...options.headers,
        };

    // Tạo request config
    const requestConfig = {
      method: options.method || "GET",
      headers,
      // Xử lý body
      ...(options.body && {
        body: isFormData ? options.body : JSON.stringify(options.body),
      }),
      // Spread các options khác ngoại trừ body và headers
      ...Object.entries(options).reduce((acc, [key, value]) => {
        if (key !== "body" && key !== "headers") {
          acc[key] = value;
        }
        return acc;
      }, {} as any),
    };

    // Thực hiện request
    const response = await fetch(url, requestConfig);

    // Xử lý refresh token khi 401
    if (response.status === 401) {
      try {
        // Sử dụng hàm mới từ auth.ts
        if (!session?.user?.refreshToken) {
          throw new Error("No refresh token available");
        }
        await refreshTokenAndSignIn(session.user.refreshToken);
        // Lấy session mới sau khi refresh
        const newSession = await getSession();
        if (!newSession?.user?.accessToken) {
          throw new Error("No new access token available");
        }

        // Thử lại request với token mới
        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${newSession.user.accessToken}`,
        };

        const retryResponse = await fetch(url, {
          ...options,
          headers: newHeaders,
        });

        if (!retryResponse.ok) {
          const errorData = await retryResponse.json();
          throw new Error(
            errorData.message || "Request failed after token refresh"
          );
        }

        return retryResponse.json();
      } catch (refreshError) {
        if (
          refreshError instanceof Error &&
          (refreshError.message === "Refresh token has expired" ||
            refreshError.message.includes("Failed to sign in"))
        ) {
          await signOut({ callbackUrl: "/login" });
        }
        throw refreshError;
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
