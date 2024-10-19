// format functions are used for format value. Ex: 1000 -> 1.000 vnd
export const normalizeVietnameseStr = (str: string) => {
  return str
    .normalize("NFD") // Chuyển về dạng chuẩn NFD (Normalization Form Decomposition)
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
    .replace(/đ/g, "d") // Chuyển đ -> d
    .replace(/Đ/g, "D") // Chuyển Đ -> D
    .replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ các ký tự đặc biệt còn lại
    .toLowerCase(); // Chuyển thành chữ thường
};
