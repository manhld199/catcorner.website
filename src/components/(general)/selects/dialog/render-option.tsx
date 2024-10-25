// components/SelectDialog/RenderOption.tsx
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

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
              )}
            >
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
      case "admin-categories":
        return (
          <>
            <div className="flex flex-row gap-2">
              {renderSelectionIndicator()}
              {option.name}
            </div>
            {option.img && (
              <div className="relative w-full aspect-square">
                {option.img.startsWith("SEO_Images") ? (
                  <CldImage alt={option.name ?? ""} src={option.img} fill={true} />
                ) : (
                  <img alt={option.name} src={option.img} />
                )}
              </div>
            )}
          </>
        );

      default:
        return (
          <>
            {renderSelectionIndicator()}
            {option.value}
          </>
        );
    }
  };

  return (
    <div
      className={cn(
        "cursor-pointer transition-all",
        type === "admin-categories"
          ? "p-2 rounded-md bg-pri-2/40 hover:bg-pri-2/60 dark:bg-pri-2/10 dark:hover:bg-pri-2/60 flex flex-col gap-2"
          : "group flex gap-1 items-center py-1 px-2 rounded-full",
        isSelected
          ? "bg-pri-7 text-white"
          : "text-zinc-700 dark:text-white bg-pri-2/20 dark:bg-zinc-700 dark:hover:text-zinc-800 hover:bg-pri-2/60 dark:hover:bg-pri-2"
      )}
      onClick={() => handleToggle(option)}
    >
      {renderOptionContent()}
    </div>
  );
};

export default RenderOption;
