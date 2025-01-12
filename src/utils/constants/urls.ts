export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AUTH_URL = API_BASE_URL + "/auth";
export const ORDER_URL = API_BASE_URL + "/orders";
export const USER_URL = API_BASE_URL + "/user";
export const PRODUCT_URL = API_BASE_URL + "/guest/product";
export const PRODUCT_LIST_URL = API_BASE_URL + "/guest/productList";
export const LOCATION_URL = API_BASE_URL + "/locations";

export const ADMIN_USERS_URL = `${process.env.BACKEND_URL}/admin/users`;
export const PUBLIC_ADMIN_USERS_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`;

export const ADMIN_GROUPS_URL = `${process.env.BACKEND_URL}/admin/groups`;
export const PUBLIC_ADMIN_GROUPS_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/groups`;

export const ADMIN_COUPONS_URL = `${process.env.BACKEND_URL}/admin/coupons`;
export const PUBLIC_ADMIN_COUPONS_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/coupons`;

export const ADMIN_PRODUCTS_URL = `${process.env.BACKEND_URL}/admin/products`;
export const PUBLIC_ADMIN_PRODUCTS_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/products`;

export const ADMIN_CATEGORIES_URL = `${process.env.BACKEND_URL}/admin/categories`;
export const PUBLIC_ADMIN_CATEGORIES_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/categories`;

export const ADMIN_BLOGS_URL = `${process.env.BACKEND_URL}/admin/articles`;
export const PUBLIC_ADMIN_BLOGS_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/articles`;

export const ADMIN_PRODUCTS = "/admin/products";
export const ADMIN_BLOGS = "/admin/blogs";
export const ADMIN_CATEGORIES = "/admin/categories";
export const ADMIN_GROUPS = "/admin/groups";
export const ADMIN_COUPONS = "/admin/coupons";

export const PUBLIC_CLOUDINARY_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloudinary`;

export const CUSTOMER_PRODUCT_LIST_URL = `${process.env.BACKEND_URL}/guest/productList`;
export const PUBLIC_CUSTOMER_PRODUCT_LIST_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/guest/productList`;

export const CUSTOMER_CART_URL = `${process.env.BACKEND_URL}/customer/cart`;
export const PUBLIC_CUSTOMER_CART_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/cart`;

export const GUEST_CART_URL = `${process.env.BACKEND_URL}/guest/cart`;
export const PUBLIC_GUEST_CART_URL = `${process.env.BACKEND_URL}/guest/cart`;

export const GUEST_BLOG_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/guest/article`;
export const GUEST_DETAIL_BLOG_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/guest/article`;
