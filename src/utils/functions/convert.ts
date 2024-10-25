// convert functions are used for convert value. Ex: 1000 -> '1k'
export const getStrOfObj = (obj: object) => {
  const arr = Object.keys(obj);
  let str = "";
  arr.forEach((item: string) => (str += JSON.stringify((obj as any)[item])));
  return str;
};
