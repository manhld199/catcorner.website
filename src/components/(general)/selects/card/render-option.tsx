import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/libs/utils";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const RenderOption: React.FC<{
  option: { value?: string; _id?: string; name?: string; img?: string };
  isSelected: boolean;
  handleToggle: (value: string | any) => void;
  type: string;
}> = ({ option, isSelected, handleToggle, type }) => {
  const renderSelectionIndicator = () => {
    switch (isSelected) {
      case true:
        return (
          <div className="relative w-5 min-w-5 h-5 min-h-5">
            <div
              className={cn(
                "w-full h-full rounded-full border-2 flex justify-center items-center transition-all",
                "bg-pri-1 dark:border-zinc-200"
              )}>
              <div className="w-3 h-3 text-white">
                <Check className="w-full h-full" />
              </div>
            </div>
          </div>
        );
      case false:
        return (
          <div className="relative w-5 h-5">
            <div
              className={cn(
                "w-full h-full rounded-full border-2 flex justify-center items-center transition-all",
                "border-zinc-500"
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderOptionContent = () => {
    switch (type) {
      default:
        return (
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              {renderSelectionIndicator()}
              {option.value}
            </div>

            {option.img && (
              <div className="relative w-4/5 m-auto aspect-square">
                <Image src={option.img} alt={option.value ?? ""} fill={true} />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "cursor-pointer transition-all p-2 rounded-lg",
        isSelected
          ? "bg-pri-7 text-white"
          : "text-zinc-700 dark:text-white bg-pri-2/20 dark:bg-zinc-700 dark:hover:text-zinc-800 hover:bg-pri-2/60 dark:hover:bg-pri-2"
      )}
      onClick={() => handleToggle(option)}>
      {renderOptionContent()}
    </div>
  );
};

export default RenderOption;
