// import libs
import { NextResponse } from "next/server";
import { EResponseStatus } from "../constants/variables";

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
