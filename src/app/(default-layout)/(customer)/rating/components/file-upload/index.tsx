import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function FileUploader({
  label,
  accept,
  files,
  setFiles,
}: {
  label: string;
  accept: string;
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const [inputRef] = useState<React.RefObject<HTMLInputElement>>(
    React.createRef()
  );

  const maxFiles = accept.includes("image") ? 5 : 2;
  const maxFileSize = accept.includes("image")
    ? 2 * 1024 * 1024
    : 40 * 1024 * 1024; // 2MB cho ảnh, 30MB cho video

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    const validFiles = newFiles.filter((file) => {
      if (file.size > maxFileSize) {
        toast.error(
          `File "${file.name}" vượt quá giới hạn ${
            accept.includes("image") ? "2MB" : "30MB"
          }!`
        );
        return false;
      }
      return true;
    });

    if (files.length + validFiles.length > maxFiles) {
      toast.error(
        `Chỉ được tải lên tối đa ${maxFiles} ${
          accept.includes("image") ? "hình ảnh" : "video"
        }!`
      );
      return;
    }

    setFiles([...files, ...validFiles.slice(0, maxFiles - files.length)]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);

      const validFiles = newFiles.filter((file) => {
        if (file.size > maxFileSize) {
          toast.error(
            `File "${file.name}" vượt quá giới hạn ${
              accept.includes("image") ? "2MB" : "30MB"
            }!`
          );
          return false;
        }
        return true;
      });

      if (files.length + validFiles.length > maxFiles) {
        toast.error(
          `Chỉ được tải lên tối đa ${maxFiles} ${
            accept.includes("image") ? "hình ảnh" : "video"
          }!`
        );
        return;
      }

      setFiles([...files, ...validFiles.slice(0, maxFiles - files.length)]);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    toast.success("Xóa tệp thành công!");
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">{label}</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center bg-gray-100 cursor-pointer">
        <p className="text-gray-600 px-24 py-4">
          <span className="text-blue-500">Bấm </span> để chọn{" "}
          {label.toLowerCase()} cần tải lên hoặc{" "}
          <span className="text-blue-500">kéo thả</span> {label.toLowerCase()}{" "}
          vào đây
        </p>
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {files.map((file, index) => (
          <div key={index} className="relative w-24 h-24">
            {accept.includes("image") ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="preview"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-24 h-24 object-cover rounded-lg"></video>
            )}
            <button
              onClick={() => handleRemoveFile(index)}
              className="absolute -top-2 -right-2 bg-gray-600/70 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-sm">
              <X />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
