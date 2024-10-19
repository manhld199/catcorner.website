"use client";

// Import libraries
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, ChevronDown, Pencil, X } from "lucide-react";

// Import components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DROPZONE_DATA } from "@/data/components";
import { PLACEHOLDER_DATA } from "@/data/placeholder";
import { DIALOG_DATA } from "@/data/dialog";
import { CldImage } from "next-cloudinary";

const DropZoneSingleImg = ({
  value,
  onChange,
  onDelete = (disable: any) => {},
  required = false,
}: {
  value: string;
  onChange: (...disableEvent: any[]) => void;
  onDelete?: any;
  required?: boolean;
}) => {
  const [previewImg, setPreviewImg] = useState<string>(value);
  const [imgLink, setImgLink] = useState<string>(previewImg);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteImgOpen, setDeleteImgOpen] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const previousImageUrl = previewImg;

    // Xoá hình ảnh cũ trước khi thêm hình ảnh mới
    if (previousImageUrl && previousImageUrl.startsWith("https://res.cloudinary.com")) {
      onDelete((prevState: any) => [...prevState, previousImageUrl]);
    }

    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setPreviewImg(imageUrl);
    onChange(imageUrl);
  };

  // Gọi onDelete khi xóa ảnh
  const handleDeleteImage = () => {
    onDelete((prevState: any) => [...prevState, previewImg]);
    setPreviewImg("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: false,
    onDrop: handleDrop,
  });

  return (
    <div className="flex flex-col items-end">
      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogTrigger>
          <Button
            type="button"
            variant="ghost"
            className="text-blue-400"
            onClick={() => setImgLink(previewImg)}
          >
            {DROPZONE_DATA["images-urls"]}
            <ChevronDown />
          </Button>
        </DialogTrigger>

        <DialogContent className="mxs:max-w-md mxs:max-h-[600px]">
          <DialogHeader>
            <DialogTitle>{DROPZONE_DATA["images-urls"]}</DialogTitle>
          </DialogHeader>

          <Input
            value={imgLink}
            onChange={(e) => setImgLink(e.target.value)}
            onDoubleClick={async () => setImgLink(await navigator.clipboard.readText())}
            onPaste={async () => setImgLink(await navigator.clipboard.readText())}
            onKeyDown={(e) => {
              if (e.key === "Backspace") setImgLink("");
            }}
            placeholder={PLACEHOLDER_DATA["image-link-placeholder"]}
            className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
          />

          <DialogFooter className="flex flex-row justify-between">
            <Button type="button" variant="ghost" onClick={() => setOpenPopup(false)}>
              {DIALOG_DATA["close-btn"]}
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => {
                if (imgLink && imgLink.startsWith("https://")) {
                  setPreviewImg(imgLink);
                  onChange(imgLink);
                }
                setOpenPopup(false);
                setImgLink("");
              }}
            >
              {DIALOG_DATA["images-add"]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div
        {...getRootProps({
          className:
            "relative aspect-square max-h-[50dvh] rounded-md w-full flex justify-center transition bg-zinc-200 border-2 border-dashed dark:border-zinc-700 appearance-none cursor-pointer hover:border-zinc-400 focus:outline-none dark:bg-zinc-800",
        })}
      >
        {previewImg ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {previewImg.startsWith("SEO_Images") ? (
              <CldImage
                loading="lazy"
                src={previewImg}
                alt="preview thumbnail"
                className="object-cover"
                fill={true}
              />
            ) : (
              <img
                loading="lazy"
                src={previewImg}
                alt="preview thumbnail"
                className="relative object-cover"
              />
            )}
            <div
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/90 hover:text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteImgOpen(true);
              }}
            >
              <X className="w-3 h-3" />
            </div>
            <div className="absolute rounded-full p-1 bottom-1 right-1 bg-zinc-300 dark:bg-zinc-700">
              <Pencil className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />
            </div>
          </>
        ) : (
          <span className="flex flex-col justify-center items-center gap-1">
            <CloudUpload />
            <span className="text-center font-medium text-base text-zinc-800 dark:text-zinc-200">
              {required && <span className="text-red-500"> * </span>}{" "}
              {DROPZONE_DATA["single-img-input"]}
            </span>
          </span>
        )}
        <input {...getInputProps()} />
      </div>

      <Dialog open={deleteImgOpen} onOpenChange={setDeleteImgOpen}>
        <DialogContent className="mxs:max-w-md">
          <DialogHeader>
            <DialogTitle>{DIALOG_DATA["delete-image-btn"]}</DialogTitle>
            <DialogDescription>{DIALOG_DATA["submit-content"]}</DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row !justify-between">
            <Button type="button" variant="default" onClick={() => setDeleteImgOpen(false)}>
              {DIALOG_DATA["close-btn"]}
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => {
                handleDeleteImage();
                setDeleteImgOpen(false);
              }}
            >
              {DIALOG_DATA["delete-btn"]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DropZoneSingleImg;
