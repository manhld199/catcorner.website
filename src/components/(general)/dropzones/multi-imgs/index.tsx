"use client";

// import libs
import { useDropzone } from "react-dropzone";
import { CloudUpload, ChevronDown, Plus, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// import components
import {
  Dialog,
  // DialogClose,
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
import { DIALOG_DATA } from "@/data/dialog";
import { CldImage } from "next-cloudinary";

const DropZoneMultiImgs = ({
  value,
  onChange,
  onDelete,
}: {
  value: string[];
  onChange: (...disableEvent: any[]) => void;
  onDelete: any;
}) => {
  //   console.log(
  //     "vaaaaaaaa",
  //     value.filter((url) => url != "")
  //   );

  const [imagePreviews, setImagePreviews] = useState<string[]>(value.filter((url) => url != ""));
  const [imageLinks, setImageLinks] = useState<string[]>([...imagePreviews]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [deleteImgOpen, setDeleteImgOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(-1);
  const [deletedImgs, setDeletedImgs] = useState<string[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imageUrls]);
    onChange([...imagePreviews, ...imageUrls]);
  };

  const handleDeleteImage = (index: number) => {
    const newImagePreviews = [...imagePreviews];
    setDeletedImgs([...deletedImgs, ...newImagePreviews.splice(index, 1)]);
    setImagePreviews(newImagePreviews);
    onChange([...newImagePreviews]);
    setImgIndex(-1);
    setDeleteImgOpen(false);
  };

  // useEffect(() => {
  //   console.log("imageLinks", imageLinks);
  // }, [imageLinks]);

  useEffect(() => {
    onDelete([...deletedImgs]);
  }, [deletedImgs, onDelete]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: handleDrop,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-end items-center gap-2">
        <Dialog open={openPopup} onOpenChange={setOpenPopup}>
          <DialogTrigger>
            <Button
              type="button"
              variant="ghost"
              className="text-blue-400"
              onClick={() => {
                setImageLinks([...imagePreviews]);
              }}
            >
              {DROPZONE_DATA["images-urls"]}
              <ChevronDown />
            </Button>
          </DialogTrigger>

          <DialogContent className="mxs:max-w-md mxs:max-h-[600px]">
            <DialogHeader>
              <DialogTitle>{DROPZONE_DATA["images-urls"]}</DialogTitle>
            </DialogHeader>

            <div className="h-full max-h-[400px] overflow-y-scroll flex flex-col gap-2">
              {imageLinks.map((img: string, index) => (
                <Input
                  key={`image link ${index}`}
                  value={img}
                  onDoubleClick={async () => {
                    const text = await navigator.clipboard.readText();
                    // console.log("clipboard", text);
                    const imgs = [...imageLinks];
                    imgs[index] = text;
                    // console.log("clipboardclipboardclipboard", imgs);
                    setImageLinks(imgs);
                  }}
                  onPaste={async () => {
                    const text = await navigator.clipboard.readText();
                    // console.log("clipboard", text);
                    const imgs = [...imageLinks];
                    imgs[index] = text;
                    // console.log("clipboardclipboardclipboard", imgs);
                    setImageLinks(imgs);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      const imgs = [...imageLinks];
                      imgs[index] = "";
                      setImageLinks(imgs);
                    }
                  }}
                  placeholder={DROPZONE_DATA["image-placeholder"]}
                  className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
                />
              ))}

              <Button
                type="button"
                variant="default"
                className="w-fit px-0 flex flex-row gap-1 items-center font-bold text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-400"
                onClick={() => setImageLinks([...imageLinks, ""])}
              >
                <Plus className="h-5 w-5" /> {DROPZONE_DATA["image-add"]}
              </Button>
            </div>

            <DialogFooter className="flex flex-row !justify-between">
              <Button type="button" variant="ghost" onClick={() => setOpenPopup(false)}>
                {DIALOG_DATA["close-btn"]}
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setOpenPopup(false);
                  const imgs = [...imageLinks].filter(
                    (link: string) => link != "" && link.startsWith("https://")
                  );
                  setImagePreviews([...imgs]);
                  setImageLinks([]);
                }}
              >
                {DROPZONE_DATA["images-add"]}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full flex flex-col items-center justify-center mx-auto gap-2">
        <div
          {...getRootProps({
            className:
              "w-full flex justify-center h-32 transition bg-zinc-200  border-2  border-grounded-2xly-300  border-dashed dark:border-zinc-700 dark:hover:border-zinc-400 rounded-md appearance-none cursor-pointer hover:border-zinc-400 focus:outline-none dark:bg-zinc-800",
          })}
        >
          <span className="flex flex-col justify-center items-center gap-1">
            <CloudUpload />
            <span className="font-medium text-base text-zinc-800 dark:text-zinc-200">
              {DROPZONE_DATA["images-input-1"]}
            </span>
            <span className="font-medium text-base text-zinc-600 dark:text-zinc-300">
              {DROPZONE_DATA["images-input-2"]}
            </span>
          </span>
          <input {...getInputProps()} />
        </div>

        <div className="relative w-full overflow-hidden">
          {/* <> */}
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as any
            }
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper: thumbsSwiper && !(thumbsSwiper as any).destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={`relative mb-2`}
          >
            {imagePreviews.map((src, index) => (
              <SwiperSlide key={`preview img ${index}`}>
                <div className="relative">
                  <div
                    className="relative aspect-[16/9] cursor-pointer"
                    onClick={() => {
                      window.open(src, "_blank");
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {src.startsWith("SEO_Images") ? (
                      <CldImage
                        loading="lazy"
                        src={src}
                        alt={`preview ${index}`}
                        className="object-cover"
                        fill={true}
                      />
                    ) : (
                      <img
                        loading="lazy"
                        src={src}
                        alt={`preview ${index}`}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/90 hover:text-white cursor-pointer"
                    onClick={() => {
                      setDeleteImgOpen(true);
                      setImgIndex(index);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper as any}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            centeredSlides={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="relative h-fit"
          >
            {imagePreviews.map((src, index) => (
              <SwiperSlide key={`preview thumb ${index}`}>
                <div className="relative">
                  <div className="relative w-full aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {src.startsWith("SEO_Images") ? (
                      <CldImage
                        loading="lazy"
                        src={src}
                        alt={`preview thumbnails ${index}`}
                        className="object-cover"
                        fill={true}
                      />
                    ) : (
                      <img
                        loading="lazy"
                        src={src}
                        alt={`preview thumbnails ${index}`}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/50 hover:bg-red-500/90 hover:text-white cursor-pointer"
                    onClick={() => {
                      setDeleteImgOpen(true);
                      setImgIndex(index);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* </> */}
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
                  if (imgIndex != -1) handleDeleteImage(imgIndex);
                }}
              >
                {DIALOG_DATA["delete-btn"]}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DropZoneMultiImgs;
