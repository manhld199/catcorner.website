"use client";

import { PUBLIC_GET_CLOUDINARY_URL } from "@/utils/constants/urls";
import { convertBlobUrlsToImgFiles } from "@/utils/functions/convert";

function getCldPublicIdFromUrl(url: string): string | undefined {
  try {
    const startIndex = url.indexOf("upload/") + "upload/".length;
    const str = url.slice(startIndex).split("/").slice(1).join("/");
    const endIndex = str.lastIndexOf(".");
    const publicId = str.substring(0, endIndex);
    return publicId;
  } catch (error: any) {
    console.error(">> Error in getCldPublicIdFromUrl:", error.message);
    return undefined;
  }
}

const uploadFilesToCloudinary = async (
  files: File[],
  folderName?: string
): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file: File) => formData.append("file", file));
  if (folderName) formData.append("folder", folderName);

  const res = await fetch(PUBLIC_GET_CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return [];

  const data = await res.json();

  const urls = data.data.urls;

  return urls;
};

const removeImgsFromCloudinary = async (imgs: string[]): Promise<void> => {
  const cldPublicIds = imgs
    .filter((url) => url.startsWith("https://res.cloudinary.com/"))
    .map((url) => getCldPublicIdFromUrl(url));

  if (cldPublicIds.length) {
    // const deleteImgsRes =
    await fetch(PUBLIC_GET_CLOUDINARY_URL, {
      method: "DELETE",
      body: JSON.stringify({ cldPublicIds }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const uploadImgsInDesToCloudinary = async (
  description: string,
  folderName: string
): Promise<string> => {
  // console.log("descriptiondescription", description);

  const parser = new DOMParser();

  const doc = parser.parseFromString(description, "text/html");
  // console.log("docdocdocdocdocdocdoc", doc);

  const docImgs = Array.from(doc.querySelectorAll("img"));
  // console.log("docImgsdocImgsdocImgs", docImgs);

  if (!docImgs.length) return description;

  const imgSrcs = docImgs
    .filter((img) => img.src.startsWith("blob:"))
    .map((img) => img.src);
  if (imgSrcs.length > 0) {
    // console.log("imgSrcsimgSrcsimgSrcs", imgSrcs);

    const imgFiles = await convertBlobUrlsToImgFiles(imgSrcs, "description");
    // console.log("imgFilesimgFilesimgFiles", imgFiles);

    const urls = await uploadFilesToCloudinary(imgFiles, folderName);
    // console.log("urlsurlsurlsurlsurlsurls", urls);

    docImgs
      .filter((img: any) => img.getAttribute("src").startsWith("blob:"))
      .forEach((img, index) => img.setAttribute("src", urls[index]));
  }
  // console.log("docImgsdocImgsdocImgs", docImgs);

  // console.log("doc.querySelectordoc.querySelector", doc.querySelector("body").innerHTML);

  return (doc.querySelector("body") as any).innerHTML;
};

const removeImgsInDesFromCloudinary = async (
  deafultDes: string,
  changedDes: string
): Promise<void> => {
  const parser = new DOMParser();

  const defaultDoc = parser.parseFromString(deafultDes, "text/html");
  const changedDoc = parser.parseFromString(changedDes, "text/html");

  const defaultImgs = Array.from(defaultDoc.querySelectorAll("img"));
  const changedImgs = Array.from(changedDoc.querySelectorAll("img"));

  const defaultSrcs = defaultImgs
    .filter((img) => img.src.startsWith("https://res.cloudinary.com/"))
    .map((img) => img.src);
  const changedtSrcs = changedImgs
    .filter((img) => img.src.startsWith("https://res.cloudinary.com/"))
    .map((img) => img.src);

  const missingSrcs = defaultSrcs.filter((src) => !changedtSrcs.includes(src));

  await removeImgsFromCloudinary(missingSrcs);
};

export {
  uploadFilesToCloudinary,
  uploadImgsInDesToCloudinary,
  removeImgsInDesFromCloudinary,
  removeImgsFromCloudinary,
};
