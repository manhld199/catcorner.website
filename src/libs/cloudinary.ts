"use client";

import { PUBLIC_CLOUDINARY_URL } from "@/utils/constants/urls";
import { extractImageLinksFromHTML } from "@/utils/functions/client";
import { convertBlobUrlsToImgFiles } from "@/utils/functions/convert";

const getCldPublicIdFromUrl = (url: string): string | undefined => {
  try {
    if (url.startsWith("SEO_Images")) {
      const splitedArr = url.split("/");
      const publicId = splitedArr[splitedArr.length - 1];
      return publicId;
    } else if (url.startsWith("https://res.cloudinary.com")) {
      const startIndex = url.indexOf("upload/") + "upload/".length;
      const str = url.slice(startIndex).split("/").slice(1).join("/");
      const endIndex = str.lastIndexOf(".");
      const publicId = str.substring(0, endIndex);
      return publicId;
    }
  } catch (error: any) {
    console.error(">> Error in getCldPublicIdFromUrl:", error.message);
    return undefined;
  }
};

const uploadFilesToCloudinary = async (
  files: File[],
  folderName: string = "upload"
): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file: File) => formData.append("file", file));
  if (folderName) formData.append("folder", folderName);

  const res = await fetch(PUBLIC_CLOUDINARY_URL, {
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
    .filter(
      (url) =>
        url.startsWith("https://res.cloudinary.com/") ||
        url.startsWith("SEO_Images")
    )
    .map((url) => getCldPublicIdFromUrl(url));

  if (cldPublicIds.length) {
    // const deleteImgsRes =
    await fetch(PUBLIC_CLOUDINARY_URL, {
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
  folderName: string = "upload"
): Promise<string> => {
  const imgSrcs = extractImageLinksFromHTML(description).filter((src) =>
    src.startsWith("blob:")
  );

  if (imgSrcs.length === 0) return description;

  // Convert blob URLs to image files
  const imgFiles = await convertBlobUrlsToImgFiles(imgSrcs, "description");

  // Upload images to Cloudinary and get URLs
  const urls = await uploadFilesToCloudinary(imgFiles, folderName);

  // Replace blob URLs with Cloudinary URLs in the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(description, "text/html");
  Array.from(doc.querySelectorAll("img"))
    .filter((img) => img.src.startsWith("blob:"))
    .forEach((img, index) => img.setAttribute("src", urls[index]));

  return (doc.querySelector("body") as any).innerHTML;
};

const removeImgsInDesFromCloudinary = async (
  defaultDes: string,
  changedDes: string
) => {
  // Get image sources from the default and changed descriptions
  const defaultSrcs = extractImageLinksFromHTML(defaultDes).filter(
    (src) =>
      src.startsWith("https://res.cloudinary.com/") ||
      src.startsWith("SEO_Images")
  );
  const changedSrcs = extractImageLinksFromHTML(changedDes).filter(
    (src) =>
      src.startsWith("https://res.cloudinary.com/") ||
      src.startsWith("SEO_Images")
  );

  // Identify images in the default description missing from the changed description
  const missingSrcs = defaultSrcs.filter((src) => !changedSrcs.includes(src));

  // Remove missing images from Cloudinary
  if (missingSrcs.length > 0) {
    await removeImgsFromCloudinary(missingSrcs);
  }
};

export {
  uploadFilesToCloudinary,
  uploadImgsInDesToCloudinary,
  removeImgsInDesFromCloudinary,
  removeImgsFromCloudinary,
};
