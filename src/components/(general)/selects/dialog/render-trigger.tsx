import React from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RenderTrigger: React.FC<{
  type: string;
  value: string | string[];
  placeholder: string;
  options: any[];
  setIsDialogOpen: (open: boolean) => void;
  disabled?: boolean;
}> = ({
  type,
  value,
  placeholder,
  options,
  setIsDialogOpen,
  disabled = false,
}) => {
  // console.log("options", options);
  // console.log("value", value);
  // console.log("disabled", disabled);

  switch (type) {
    case "badge":
      return (
        <div
          className="p-2 flex items-center justify-between border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md cursor-pointer"
          onClick={() => setIsDialogOpen(true)} // mở dialog khi click
        >
          {!value ? (
            <p className="text-sm text-zinc-500">{placeholder}</p>
          ) : Array.isArray(value) ? (
            <div className="flex flex-row gap-2">
              {value.map((item, index) => (
                <Badge key={`selected item ${index}`} variant="pri-2">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <Badge variant="pri-2">{value}</Badge>
          )}
          <ChevronRight />
        </div>
      );
    case "admin-categories":
      return (
        <div
          className={`p-2 flex items-center justify-between border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => setIsDialogOpen(true)} // mở dialog khi click
        >
          {Array.isArray(value) ? (
            value.length > 0 ? (
              <div className="flex flex-row gap-2 flex-wrap">
                {value.map((item, index) => (
                  <Badge variant="pri-2" key={`select value ${item} ${index}`}>
                    {options.find((option) => option._id === item)?.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">{placeholder}</p>
            )
          ) : !value ? (
            <p className="text-sm text-zinc-500">{placeholder}</p>
          ) : (
            <Badge variant="pri-2">
              {options.find((option) => option._id === value)?.name}
            </Badge>
          )}
          <ChevronRight className="min-w-5 min-h-5 w-5 h-5" />
        </div>
      );
    default:
      return (
        <div
          className="px-2 py-4 flex items-center justify-between border-b-[1px] border-zinc-300 cursor-pointer"
          onClick={() => setIsDialogOpen(true)} // mở dialog khi click
        >
          <p>
            {Array.isArray(value) ? value.join(", ") : value || placeholder}
          </p>
          <ChevronRight />
        </div>
      );
  }
};

export default RenderTrigger;
