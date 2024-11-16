/**
 * Trích xuất tên cuối cùng từ họ tên đầy đủ
 * @param fullName Họ tên đầy đủ
 * @param defaultValue Giá trị mặc định nếu không có tên (mặc định là "User")
 * @returns Tên cuối cùng hoặc giá trị mặc định
 */
export const getLastName = (
  fullName: string | null | undefined,
  defaultValue: string = "User"
): string => {
  if (!fullName?.trim()) return defaultValue;
  const nameParts = fullName.trim().split(" ");
  return nameParts[nameParts.length - 1];
};

/**
 * Trích xuất họ từ họ tên đầy đủ
 * @param fullName Họ tên đầy đủ
 * @param defaultValue Giá trị mặc định nếu không có họ
 * @returns Họ hoặc giá trị mặc định
 */
export const getFirstName = (
  fullName: string | null | undefined,
  defaultValue: string = ""
): string => {
  if (!fullName?.trim()) return defaultValue;
  const nameParts = fullName.trim().split(" ");
  return nameParts[0];
};
