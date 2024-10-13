"use client";

import { useEffect, useState } from "react";
import { NodeSimpleInputProps } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function NumberInput({
  node,
  value,
  updateValue,
  input,
}: NodeSimpleInputProps) {
  const [inputV, setInputV] = useState(value);
  const warn = input[0].required && (!value || value.length < 1);

  const updateNum = (v: number) => {
    if (input[2].type !== "number") return;

    if (typeof input[2].min === "number") {
      if (v < input[2].min) {
        updateValue(input[2].min + "");
        return;
      }
    }

    if (typeof input[2].max === "number") {
      if (v > input[2].max) {
        updateValue(input[2].max + "");
        return;
      }
    }

    updateValue(v + "");
  };

  return (
    <div
      className={`w-full h-7 flex items-center gap-2 bg-gray-900/20 border rounded-md px-2 transition-all ${
        warn ? "border-orange-300/40" : "hover:border-white/20"
      }`}
    >
      <input
        className={`min-w-0 w-full text-xs h-7 bg-transparent outline-none`}
        placeholder={input[2].placeholder}
        value={inputV?.length || 0 > 0 ? Number(inputV) : ""}
        type="number"
        onInput={(e) => {
          setInputV(e.currentTarget.value);

          if (e.currentTarget.value.length < 1) {
            return updateValue("");
          }

          updateNum(Number(e.currentTarget.value));
        }}
      />
      {warn && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IconAlertTriangleFilled className="w-3 h-3 text-orange-400" />
            </TooltipTrigger>
            <TooltipContent>This value is required</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
