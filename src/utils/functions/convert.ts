// convert functions are used for convert value. Ex: 1000 -> '1k'
export const getStrOfObj = (obj: object) => {
  const arr = Object.keys(obj);
  let str = "";
  arr.forEach((item: string) => (str += JSON.stringify((obj as any)[item])));
  return str;
};

export const convertBlobUrlsToImgFiles = async (
  imageUrls: string[],
  fileName: string
): Promise<File[]> =>
  Promise.all(
    imageUrls
      .filter((url) => url.startsWith("blob"))
      .map((imageUrl, index) =>
        fetch(imageUrl)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new File([blob], `${fileName}_${index}.webp`, {
                type: "image/webp",
              })
          )
      )
  );

export const convertNumberToVND = (amount: number): string => {
  if (isNaN(amount)) {
    return "0đ";
  }

  // Làm tròn lên số tiền
  const roundedAmount = Math.ceil(amount);

  // Định dạng số tiền thành chuỗi có dấu chấm phân cách
  const formattedAmount = roundedAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm đơn vị "đ"
  return `${formattedAmount}đ`;
};
