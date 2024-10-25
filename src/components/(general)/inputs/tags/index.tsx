"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type InputProps } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { cn } from "@/libs/utils";
import { INPUT_DATA } from "@/data/components";

type InputTagsProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");

    React.useEffect(() => {
      if (pendingDataPoint.includes(",")) {
        // console.log("valuevaluevalue1", value);
        // console.log("pendingDataPoint1", pendingDataPoint);
        const newDataPoints = new Set(
          [
            ...value,
            ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
          ].filter((item) => item != "")
        );
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }, [pendingDataPoint, onChange, value]);

    const addPendingDataPoint = () => {
      // console.log("valuevaluevalue2", value);
      // console.log("pendingDataPoint2", pendingDataPoint);
      if (pendingDataPoint) {
        // Add the pendingDataPoint after trimming it
        const trimmedDataPoint =
          pendingDataPoint[pendingDataPoint.length - 1] == ","
            ? pendingDataPoint.substring(0, pendingDataPoint.length - 1)
            : pendingDataPoint.trim();
        const newDataPoints = new Set(
          [...value, trimmedDataPoint].filter((item) => item !== "")
        );
        onChange(Array.from(newDataPoints));
        setPendingDataPoint(""); // Reset the input field
      }
    };

    return (
      <div
        className={cn(
          // caveat: :has() variant requires tailwind v3.4 or above: https://tailwindcss.com/blog/tailwindcss-v3-4#new-has-variant
          "min-h-12 flex w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950",
          className
        )}>
        {value.map((item) => (
          <Badge key={item} variant="secondary">
            #{item}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-3 w-3"
              onClick={() => {
                onChange(value.filter((i) => i !== item));
              }}>
              <XIcon className="w-3" />
            </Button>
          </Badge>
        ))}

        <input
          className="flex-1 outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 bg-transparent"
          placeholder={INPUT_DATA["tags-input-placeholder"]}
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPendingDataPoint();
            } else if (
              e.key === "Backspace" &&
              pendingDataPoint.length === 0 &&
              value.length > 0
            ) {
              e.preventDefault();
              onChange(value.slice(0, -1));
            }
          }}
          onKeyUp={(e) => {
            const inputValue = e.currentTarget.value;
            // console.log("inputValue", inputValue);

            if (inputValue.endsWith(" ") || inputValue.endsWith(",")) {
              e.preventDefault();
              addPendingDataPoint();
            }
          }}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export default InputTags;
