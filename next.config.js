module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "res.cloudinary.com", // Thêm hostname của Cloudinary
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
    ],
  },
};
